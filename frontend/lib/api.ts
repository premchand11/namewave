export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchVoices() {
  const res = await fetch(`${API_BASE}/voices`);

  if (!res.ok) {
    throw new Error("Failed to fetch voices");
  }

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

  if (!res.ok) {
    throw new Error("Failed to generate pronunciation");
  }

  return await res.blob();
}
