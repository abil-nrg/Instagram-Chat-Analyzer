from flask import Blueprint, jsonify
import re
from collections import Counter

words_frequency_bp = Blueprint('words_frequency', __name__)

messages = [
    "do you have money?",
    "i'm on the bus",
    "can i borrow $50?"
]

def get_word_frequency(messages):
    words = []
    for msg in messages:
        cleaned_msg = re.sub(r'[^\w\s]', '', msg).lower()
        words.extend(cleaned_msg.split())
    return Counter(words)

@words_frequency_bp.route('/')
def words_frequency():
    freq = get_word_frequency(messages)
    freq_list = [{"word": w, "count": c} for w, c in freq.most_common()]
    return jsonify('word_freq')