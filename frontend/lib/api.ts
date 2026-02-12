export const API_BASE = "http://localhost:8000";

export async function fetchVoices() {
  const res = await fetch(`${API_BASE}/voices`);
  return res.json();
}

export async function generatePronunciation(data: {
  name: string;
  voice: string;
  pitch: string;
  speed: string;
}) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to generate");

  const blob = await res.blob();
  return blob;
}
