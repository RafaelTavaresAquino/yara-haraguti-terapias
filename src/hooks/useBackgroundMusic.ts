import { useState, useRef, useEffect, useCallback } from "react";

const MUSIC_STORAGE_KEY = "yara-bg-music-playing";
const MUSIC_CACHE_KEY = "yara-bg-music-url";

export const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicUrlRef = useRef<string | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;

    // Check if we have a cached music URL
    const cachedUrl = sessionStorage.getItem(MUSIC_CACHE_KEY);
    if (cachedUrl) {
      audio.src = cachedUrl;
      musicUrlRef.current = cachedUrl;
      setIsLoaded(true);
    }

    return () => {
      audio.pause();
      audio.src = "";
      if (musicUrlRef.current) {
        URL.revokeObjectURL(musicUrlRef.current);
      }
    };
  }, []);

  const generateMusic = useCallback(async () => {
    if (musicUrlRef.current) return musicUrlRef.current;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ambient-music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt: "Soft ambient meditation music with gentle piano, subtle crystal singing bowls, and warm ethereal pads. Peaceful, spiritual, calming atmosphere. No vocals. Smooth and loopable.",
            duration: 60,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to generate music: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      musicUrlRef.current = audioUrl;
      sessionStorage.setItem(MUSIC_CACHE_KEY, audioUrl);
      setIsLoaded(true);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
      }

      return audioUrl;
    } catch (error) {
      console.error("Failed to generate ambient music:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggle = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      sessionStorage.setItem(MUSIC_STORAGE_KEY, "false");
    } else {
      try {
        if (!musicUrlRef.current) {
          await generateMusic();
        }
        await audioRef.current.play();
        setIsPlaying(true);
        sessionStorage.setItem(MUSIC_STORAGE_KEY, "true");
      } catch (error) {
        console.error("Failed to play music:", error);
      }
    }
  }, [isPlaying, generateMusic]);

  return { isPlaying, isLoading, isLoaded, toggle };
};
