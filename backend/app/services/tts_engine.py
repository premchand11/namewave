import edge_tts
import uuid
import os

AUDIO_FOLDER = "audio"

os.makedirs(AUDIO_FOLDER, exist_ok=True)


class TTSEngine:

    async def generate_audio(self, text: str, voice: str, rate: str, pitch: str):
        filename = f"{uuid.uuid4()}.mp3"
        file_path = os.path.join(AUDIO_FOLDER, filename)

        communicate = edge_tts.Communicate(
            text=text,
            voice=voice,
            rate=rate,
            pitch=pitch
        )

        await communicate.save(file_path)

        return file_path
