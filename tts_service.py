"""
AarogyaConnect 360 - Text To Speech Audio Generator
Converts voice assistant responses into cached MP3 files using gTTS.
"""

import os
import hashlib
from gtts import gTTS

AUDIO_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "audio")

# Map language codes to gTTS codes
LANG_MAP = {
    "en": "en",
    "hi": "hi",
    "bn": "bn",
    "te": "te",
    "ta": "ta",
    "mr": "mr",
    "gu": "gu"
}

def generate_speech_audio(text: str, lang: str = "en") -> str:
    """
    Synthesizes speech audio and returns the web-accessible URL path.
    """
    os.makedirs(AUDIO_DIR, exist_ok=True)
    gtts_lang = LANG_MAP.get(lang, "en")
    
    # Hash text + lang for cache key
    cache_key = hashlib.md5(f"{gtts_lang}_{text}".encode("utf-8")).hexdigest()
    filename = f"voice_{cache_key}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    if not os.path.exists(filepath):
        try:
            tts = gTTS(text=text, lang=gtts_lang, slow=False)
            tts.save(filepath)
        except Exception as e:
            print(f"gTTS error: {e}")
            return ""

    return f"/static/audio/{filename}"
