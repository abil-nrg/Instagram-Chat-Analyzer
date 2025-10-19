import json
import pandas as pd

def clean_text(text):
    """
    Ensures double encoding and removes
    emoji artifacts
    """
    if not isinstance(text, str):
        return text
    try:
        text = text.encode("latin1").decode("utf-8")
    except Exception:
        pass
    text = text.replace("\u200d", "")   # remove zero-width joiner
    return text

def parse_json(json_str: str):
    """
    Parse a json string into a dataframe
    """

    raw_data = json.load(json_str)
    
    messages = pd.DataFrame(raw_data["messages"])
    participants = pd.DataFrame(raw_data["participants"])
    
    messages["content"] = messages["content"].apply(clean_text)
    messages["sender_name"] = messages["sender_name"].apply(clean_text)
    participants["name"] = participants["name"].apply(clean_text)
    
    return messages, participants 