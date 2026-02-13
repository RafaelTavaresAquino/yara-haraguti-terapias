import { useState, useRef, useCallback } from "react";

const MUSIC_STORAGE_KEY = "yara-bg-music-playing";

// Procedural ambient music using Web Audio API - no external API needed
const createAmbientAudio = (audioContext: AudioContext) => {
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.3;
  masterGain.connect(audioContext.destination);

  const nodes: AudioNode[] = [];

  // Warm pad drone (low)
  const createPad = (freq: number, gain: number) => {
    const osc = audioContext.createOscillator();
    const g = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.value = freq;
    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 1;
    g.gain.value = gain;
    osc.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    osc.start();
    nodes.push(osc, g, filter);

    // Gentle frequency drift
    const drift = () => {
      const target = freq + (Math.random() - 0.5) * 4;
      osc.frequency.setTargetAtTime(target, audioContext.currentTime, 3);
      setTimeout(drift, 3000 + Math.random() * 4000);
    };
    drift();
    return { osc, gain: g };
  };

  // Ethereal shimmer (high harmonics)
  const createShimmer = (freq: number, gain: number) => {
    const osc = audioContext.createOscillator();
    const g = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.value = freq;
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = 5;
    g.gain.value = 0;
    osc.connect(filter);
    filter.connect(g);
    g.connect(masterGain);
    osc.start();
    nodes.push(osc, g, filter);

    // Swell in and out
    const swell = () => {
      const now = audioContext.currentTime;
      const duration = 4 + Math.random() * 6;
      g.gain.setTargetAtTime(gain, now, duration / 3);
      g.gain.setTargetAtTime(0, now + duration, duration / 3);
      setTimeout(swell, (duration * 2 + Math.random() * 5) * 1000);
    };
    setTimeout(swell, Math.random() * 5000);
    return { osc, gain: g };
  };

  // Create layered pads (C major / Am pentatonic feel)
  createPad(130.81, 0.15);  // C3
  createPad(196.0, 0.1);    // G3
  createPad(261.63, 0.08);  // C4
  createPad(329.63, 0.06);  // E4

  // Shimmering overtones
  createShimmer(523.25, 0.04);  // C5
  createShimmer(659.25, 0.03);  // E5
  createShimmer(783.99, 0.02);  // G5
  createShimmer(1046.5, 0.015); // C6

  // Gentle noise layer for texture
  const bufferSize = audioContext.sampleRate * 2;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.01;
  }
  const noise = audioContext.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const noiseFilter = audioContext.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 400;
  const noiseGain = audioContext.createGain();
  noiseGain.gain.value = 0.3;
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

  const toggle = useCallback(async () => {
    if (isPlaying) {
      // Fade out and suspend
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
    }
  }, [isPlaying]);

  return { isPlaying, isLoading: false, toggle };
};
