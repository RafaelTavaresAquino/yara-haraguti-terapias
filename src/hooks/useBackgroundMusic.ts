import { useState, useRef, useCallback, useEffect } from "react";

const MUSIC_STORAGE_KEY = "yara-bg-music-playing";

// Procedural ambient music using Web Audio API - no external API needed
const createAmbientAudio = (audioContext: AudioContext) => {
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.3;
  masterGain.connect(audioContext.destination);

  const nodes: AudioNode[] = [];

  // Reverb via convolver
  const convolver = audioContext.createConvolver();
  const reverbLen = audioContext.sampleRate * 3;
  const reverbBuf = audioContext.createBuffer(2, reverbLen, audioContext.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = reverbBuf.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.5);
    }
  }
  convolver.buffer = reverbBuf;
  const reverbGain = audioContext.createGain();
  reverbGain.gain.value = 0.6;
  convolver.connect(reverbGain);
  reverbGain.connect(masterGain);
  nodes.push(convolver, reverbGain);

  // Deep breathing drone — very slow, expansive
  const createBreathingDrone = (freq: number, gain: number, period: number) => {
    const osc = audioContext.createOscillator();
    const g = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.value = freq;
    filter.type = "lowpass";
    filter.frequency.value = 500;
    filter.Q.value = 0.5;
    g.gain.value = 0;
    osc.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    g.connect(convolver);
    osc.start();
    nodes.push(osc, g, filter);

    // Breathe in/out
    const breathe = () => {
      const now = audioContext.currentTime;
      g.gain.setTargetAtTime(gain, now, period * 0.3);
      g.gain.setTargetAtTime(gain * 0.2, now + period * 0.5, period * 0.3);
      setTimeout(breathe, period * 1000);
    };
    breathe();
  };

  // Singing bowl / bell tones — sparse, meditative
  const createBell = (freq: number, maxGain: number, interval: number) => {
    const ring = () => {
      const osc = audioContext.createOscillator();
      const g = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq + (Math.random() - 0.5) * 2;
      g.gain.value = maxGain;
      osc.connect(g);
      g.connect(masterGain);
      g.connect(convolver);
      osc.start();
      // Decay naturally over 6-10s
      const decay = 6 + Math.random() * 4;
      g.gain.setTargetAtTime(0, audioContext.currentTime, decay / 4);
      setTimeout(() => {
        osc.stop();
        osc.disconnect();
        g.disconnect();
      }, decay * 1000 + 500);

      setTimeout(ring, (interval + Math.random() * interval) * 1000);
    };
    setTimeout(ring, Math.random() * interval * 1000);
  };

  // Deep drones — root and fifth, breathing slowly
  createBreathingDrone(65.41, 0.12, 10);   // C2 — very deep foundation
  createBreathingDrone(98.0, 0.09, 13);    // G2 — fifth
  createBreathingDrone(130.81, 0.07, 16);  // C3 — octave
  createBreathingDrone(196.0, 0.04, 18);   // G3 — upper fifth

  // Singing bowls — sparse, peaceful
  createBell(528, 0.05, 8);    // C5 — "healing frequency"
  createBell(396, 0.04, 12);   // G4
  createBell(639, 0.03, 15);   // Eb5 — warm minor touch
  createBell(741, 0.02, 20);   // F#5 — ethereal

  // Soft white noise — like distant wind
  const bufferSize = audioContext.sampleRate * 2;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.005;
  }
  const noise = audioContext.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = audioContext.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 300;
  const noiseGain = audioContext.createGain();
  noiseGain.gain.value = 0.4;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start();
  nodes.push(noise, noiseFilter, noiseGain);

  return { masterGain, nodes };
};

export const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<{ masterGain: GainNode; nodes: AudioNode[] } | null>(null);
  const autoStartedRef = useRef(false);

  const startMusic = useCallback(async () => {
    if (audioContextRef.current && isPlaying) return;
    try {
      if (!audioContextRef.current) {
        const ctx = new AudioContext();
        audioContextRef.current = ctx;
        audioNodesRef.current = createAmbientAudio(ctx);
      } else {
        await audioContextRef.current.resume();
        if (audioNodesRef.current) {
          audioNodesRef.current.masterGain.gain.setTargetAtTime(
            0.3,
            audioContextRef.current.currentTime,
            0.5
          );
        }
      }
      setIsPlaying(true);
      sessionStorage.setItem(MUSIC_STORAGE_KEY, "true");
    } catch (error) {
      console.error("Failed to play ambient music:", error);
    }
  }, [isPlaying]);

  // Auto-start on first user interaction
  useEffect(() => {
    if (autoStartedRef.current) return;
    // If user previously muted, don't auto-start
    if (sessionStorage.getItem(MUSIC_STORAGE_KEY) === "false") return;

    const handleInteraction = () => {
      if (autoStartedRef.current) return;
      autoStartedRef.current = true;
      startMusic();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction, { once: false });
    document.addEventListener("scroll", handleInteraction, { once: false });
    document.addEventListener("keydown", handleInteraction, { once: false });
    document.addEventListener("touchstart", handleInteraction, { once: false });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [startMusic]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      if (audioContextRef.current && audioNodesRef.current) {
        const { masterGain } = audioNodesRef.current;
        masterGain.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
        setTimeout(() => {
          audioContextRef.current?.suspend();
        }, 1500);
      }
      setIsPlaying(false);
      sessionStorage.setItem(MUSIC_STORAGE_KEY, "false");
    } else {
      await startMusic();
    }
  }, [isPlaying, startMusic]);

  return { isPlaying, isLoading: false, toggle };
};
