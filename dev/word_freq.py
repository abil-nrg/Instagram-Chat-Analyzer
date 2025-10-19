import json
import codecs
import unicodedata
import re
import pandas as pd

def word_frequency(conversations: dict, targetWord: str):
    targetWord = targetWord.lower().strip()
    word_count = {}

    for sender, messages in conversations.items():  # ← FIXED
        count = 0
        for msg in messages:
            # Skip invalid values
            if not isinstance(msg, str) or not msg.strip():
                continue

            lower_msg = msg.lower()

            # Count if target word appears
            if targetWord in lower_msg:
                count += 1

        # Always include user even if count = 0
        word_count[sender] = count

    return word_count