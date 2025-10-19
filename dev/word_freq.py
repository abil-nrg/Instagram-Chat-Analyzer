import json
import codecs
import unicodedata
import re
import pandas as pd
from collections import Counter
import string
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

def top_word_per_user(conversation: dict, user: str, top_n: int = 10):
    # Check if user exists
    if user not in conversation:
        print(f"User '{user}' not found.")
        return {}
    stopwords = {
        "i", "to", "be", "you", "and", "are", "the", "a", "in", "of", "it", 
        "that", "is", "on", "for", "with", "me", "my", "your", "we", "they",
        "this", "at", "was", "so", "but", "have", "do", "not", "just"
    }

    messages = conversation[user]
    words = []

    for msg in messages:
        if not isinstance(msg, str) or not msg.strip():
            continue

        lower_msg = msg.lower()

        for w in lower_msg.split():
            clean_word = w.strip(string.punctuation)
            if clean_word and clean_word not in stopwords:
                words.append(clean_word)

    counter = Counter(words)
    return dict(counter.most_common(top_n))


