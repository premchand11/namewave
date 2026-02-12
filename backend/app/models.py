from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class PronunciationLog(Base):
    __tablename__ = "pronunciation_logs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    voice = Column(String)
    pitch = Column(String)
    speed = Column(String)
    ip_address = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
