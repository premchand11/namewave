from pathlib import Path

AUDIO_FOLDER = Path("audio")


def delete_file(filename: str):
    file_path = AUDIO_FOLDER / filename

    if not file_path.exists():
        return False

    file_path.unlink()
    return True


def delete_all_files():
    deleted_count = 0

    for file in AUDIO_FOLDER.glob("*.mp3"):
        file.unlink()
        deleted_count += 1

    return deleted_count
