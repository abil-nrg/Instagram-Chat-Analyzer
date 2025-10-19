import json
import codecs
import unicodedata
import re
import pandas as pd
from collections import Counter
import string

def update_conversation_counts(messages: pd.DataFrame, participants: pd.DataFrame, totalConversation: dict):
    if len(participants) != 2:
        return totalConversation

    p1 = participants["name"].iloc[0]

    if p1 not in totalConversation:
        totalConversation[p1] = {"sent": 0, "received": 0}

    for _, row in messages.iterrows():
        sender = row.get("sender_name")
        content = row.get("content")
        if content is None:
            continue    

        if sender == p1:
            totalConversation[p1]["sent"] += 1
        else:
            totalConversation[p1]["received"] += 1

    return totalConversation