from fastapi import APIRouter, HTTPException, BackgroundTasks, Request
from fastapi.responses import FileResponse
from app.schemas.pronunciation_schema import PronunciationRequest
from app.services.voice_registry import VOICE_REGISTRY
from app.services.tts_engine import TTSEngine
from app.services.file_service import delete_file, delete_all_files
from app.database import SessionLocal
from app.models import PronunciationLog
from app.limiter import limiter
from app.schemas.log_schema import LogResponse
from sqlalchemy import desc
from fastapi import Header, Depends
from app.core.config import ADMIN_TOKEN


def verify_admin(x_admin_token: str = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Not authorized")


router = APIRouter()
tts_engine = TTSEngine()

PITCH_MAP = {
    "low": "-8Hz",
    "normal": "+0Hz",
    "high": "+8Hz"
}

SPEED_MAP = {
    "slow": "-20%",
    "normal": "+0%",
    "fast": "+20%"
}


@router.post("/generate")
@limiter.limit("5/minute")
async def generate_pronunciation(
    request: Request,
    body: PronunciationRequest,
    background_tasks: BackgroundTasks,
):
    if body.voice not in VOICE_REGISTRY:
        raise HTTPException(status_code=400, detail="Invalid voice")

    voice_name = VOICE_REGISTRY[body.voice]["voice"]

    pitch_value = PITCH_MAP.get(body.pitch, "+0Hz")
    speed_value = SPEED_MAP.get(body.speed, "+0%")

    file_path = await tts_engine.generate_audio(
        text=f"{body.name}",
        voice=voice_name,
        rate=speed_value,
        pitch=pitch_value
    )

    db = SessionLocal()
    try:
        log = PronunciationLog(
            name=body.name,
            voice=body.voice,
            pitch=body.pitch,
            speed=body.speed,
            ip_address=request.client.host
        )
        db.add(log)
        db.commit()
    finally:
        db.close()

    background_tasks.add_task(delete_file, file_path)

    return FileResponse(
        path=file_path,
        media_type="audio/mpeg",
        filename="pronunciation.mp3"
    )


@router.get("/voices")
def list_voices():
    return [
        {
            "key": key,
            "label": value["label"]
        }
        for key, value in VOICE_REGISTRY.items()
    ]


@router.get("/logs", response_model=list[LogResponse], dependencies=[Depends(verify_admin)])
def get_logs(limit: int = 50, offset: int = 0):
    db = SessionLocal()
    try:
        logs = (
            db.query(PronunciationLog)
            .order_by(desc(PronunciationLog.created_at))
            .offset(offset)
            .limit(limit)
            .all()
        )
        return logs
    finally:
        db.close()


@router.delete("/audio/{filename}", dependencies=[Depends(verify_admin)])
def remove_file(filename: str):
    success = delete_file(filename)

    if not success:
        raise HTTPException(status_code=404, detail="File not found")

    return {"message": f"{filename} deleted successfully"}


@router.delete("/audio", dependencies=[Depends(verify_admin)])
def remove_all_files():
    count = delete_all_files()
    return {"message": f"{count} files deleted"}
