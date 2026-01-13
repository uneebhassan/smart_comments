import requests

API_URL = "https://moderateapi.com/api/v1/moderate"
API_KEY = "mk_bYYSAm67H2c6MlgAvg8IM0u1BMm426JwVFSsR37eKa4RF2LLUzsrG8dgaaKbmHtR"

def classify_comment(text: str) -> str:
    """
    Classifies a comment as "safe" or "needs_review" using the moderation API.
    Returns:
        - "safe" if the API does not flag the content
        - "needs_review" if the API flags the content
    """
    try:
        response = requests.post(
            API_URL,
            headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
            json={"text": text},
            timeout=5
        )
        response.raise_for_status()
        data = response.json()

        # Assuming API returns something like {"flagged": true/false} or {"result":"needs_review"/"safe"}
        # Adjust based on actual API response structure
        print(data)
        if data.get("flagged") is True or data.get("result") == "needs_review":
            return "needs_review"
        return "safe"

    except requests.RequestException as e:
        # On error, consider text safe (or optionally flag it for manual review)
        print(f"Moderation API error: {e}")
        return "needs_review"
