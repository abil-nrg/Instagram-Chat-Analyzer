from collections import Counter
import re
from datetime import datetime, timedelta

def get_word_frequency(messages):
    words = []
    for msg in messages:
        clean_msg = re.sub(r'[^\w\s]', '', msg['text']).lower()
        words.extend(clean_msg.split())
    return [{"word": w, "count": c} for w, c in Counter(words).most_common()]