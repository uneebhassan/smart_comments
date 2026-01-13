# posts/classifier.py

from typing import Literal

def classify_comment(text: str) -> Literal["safe", "needs_review"]:
    """
    Simple rule-based comment classifier.
    Returns 'needs_review' if banned keywords are detected, otherwise 'safe'.
    """
    banned_keywords = {"spam", "hate", "offensive", "abuse", "violence"}
    text_lower = text.lower()

    if any(word in text_lower for word in banned_keywords):
        return "needs_review"
    
    return "safe"
