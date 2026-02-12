from pydantic import BaseModel


class PronunciationRequest(BaseModel):
    name: str
    voice: str
    pitch: str = "normal"   # low, normal, high
    speed: str = "normal"   # slow, normal, fast
