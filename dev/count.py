import pandas as pd
import numpy as np

def get_daily_counts(df : pd.DataFrame, field : str) -> pd.Series:
    """
    Daily messages in a df
    """
    #get rid of all content rows which are empty to null
    df = df[df[field].notna() & (df[field].str.strip() != "")].copy()
    #define date
    df["date"] = pd.to_datetime(df["timestamp_ms"], unit="ms").dt.date
    result = (
        df.groupby("date")
          .size()
          .reset_index(name=f"{field}_count")
          .set_index("date")
    ) 
    return result

def count_msgs_io(msgs : pd.DataFrame):
    """
    Count the amount of:
    -messages
    -shared links
    -audio files
    -photos
    -videos
    Made by a person, both on the recieving end 
    and outgoing end
    """
    fields = ["content", "audio_files", "share",
              "photos", "videos"]
    s_arr = []
    for f in fields:
        s = get_daily_counts(msgs, f)
        s_arr.append(s)
    
    df = (pd.concat(s_arr, axis = 1)
          .fillna(0)
          .astype(int)
          .sort_index()
        )
    
    if not df.empty:
        full_range = pd.date_range(df.index.min(), df.index.max(), freq="D")
        df = df.reindex(full_range, fill_value=0)
        df.index.name = "date"
    
    df['total'] = df.filter(like="_count").sum(axis=1)
    
    df = df.reset_index()

    return df

def total_msgs_sent(msgs : pd.DataFrame, username : str):
    """
    Count the amount of messages sent out
    """
    msgs_sent = msgs[msgs['sender_name'] == username]
    df = count_msgs_io(msgs_sent)

    s = df.sum(numeric_only=True).to_frame().T

    return s.to_dict(orient="records")

def total_msgs_recieved(msgs : pd.DataFrame, username : str):
    """
    Count the amount of messages received by a user
    """
    msgs_rec = msgs[msgs['sender_name'] != username]
    df = count_msgs_io(msgs_rec)

    s = df.sum(numeric_only=True).to_frame().T

    return s.to_dict(orient="records")
