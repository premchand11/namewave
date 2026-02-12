"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { fetchVoices, generatePronunciation } from "@/lib/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Waveform } from "./waveform";



export function PronunciationForm() {
  const [voices, setVoices] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [voice, setVoice] = useState("");
  const [pitch, setPitch] = useState("normal");
  const [speed, setSpeed] = useState("normal");
  const [loading, setLoading] = useState(false);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  


  useEffect(() => {
    fetchVoices().then(setVoices);
  }, []);

  async function handleGenerate() {
    if (!name || !voice) return;

    setLoading(true);
    setAudioUrl(null);

    try {
      const blob = await generatePronunciation({
        name,
        voice,
        pitch,
        speed,
      });

      const url = window.URL.createObjectURL(blob);
      setAudioUrl(url);
      toast.success("Audio generated successfully!");
    } catch (error) {
      console.error("Error generating audio:", error);
      toast.error("Failed to generate audio. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!audioUrl) return;

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `${name}-pronunciation.mp3`;
    a.click();

     toast("Download started");
  }

  return (
    <section id="generator" className="py-12 sm:py-18">
      <Card className="max-w-xl mx-auto p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-center">
          Generate Pronunciation
        </h3>

        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select onValueChange={setVoice}>
          <SelectTrigger>
            <SelectValue placeholder="Select Voice" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((v) => (
              <SelectItem key={v.key} value={v.key}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-4">
          <Select onValueChange={setPitch} defaultValue="normal">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSpeed} defaultValue="normal">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={loading || !name || !voice}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>

        {audioUrl && (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="space-y-4 pt-4"
  >
    <audio
  controls
  className="w-full"
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
  onEnded={() => setIsPlaying(false)}
>
  <source src={audioUrl} type="audio/mpeg" />
</audio>

    <Waveform isPlaying={isPlaying} />


    <Button className="w-full" onClick={handleDownload}>
      Download MP3
    </Button>
  </motion.div>
)}


      </Card>
    </section>
  );
}
