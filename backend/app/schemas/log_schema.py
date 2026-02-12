from pydantic import BaseModel
from datetime import datetime


class LogResponse(BaseModel):
    id: int
    name: str
    voice: str
    pitch: str
    speed: str
    ip_address: str
    created_at: datetime

    class Config:
        from_attributes = True
