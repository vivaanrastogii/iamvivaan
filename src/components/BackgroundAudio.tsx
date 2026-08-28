import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // Function to start playback
    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.log("Autoplay waiting for user gesture:", err);
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    };

    attemptPlay();

    // Auto-start on any first user interaction (click, tap, scroll, key press)
    const handleGesture = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }).catch(() => {});
      }
      removeListeners();
    };

    const addListeners = () => {
      window.addEventListener('click', handleGesture);
      window.addEventListener('touchstart', handleGesture);
      window.addEventListener('scroll', handleGesture, { passive: true });
      window.addEventListener('keydown', handleGesture);
    };

    const removeListeners = () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false;
      setIsMuted(false);
      audio.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }).catch((e) => console.error("Play error:", e));
    } else {
      if (isMuted) {
        audio.muted = false;
        setIsMuted(false);
      } else {
        audio.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/bg_music.mp3" type="audio/mpeg" />
        <source src="/bg_music.wav" type="audio/wav" />
      </audio>

      {/* Sleek, small, non-overlapping Mute/Unmute/Play button at bottom-right next to easter egg */}
      <button
        onClick={toggleSound}
        aria-label={isMuted || !isPlaying ? "Enable background music" : "Mute background music"}
        title={isMuted || !isPlaying ? "Click to play music" : "Click to mute music"}
        className={`fixed bottom-6 right-20 z-40 flex items-center gap-2 h-11 px-3.5 rounded-full border transition-all duration-300 shadow-xl select-none backdrop-blur-md text-xs font-mono cursor-pointer ${
          isPlaying && !isMuted
            ? "bg-[#1A1A1A]/90 hover:bg-black border-[#00E5C0]/50 text-white shadow-[#00E5C0]/10 hover:scale-105"
            : "bg-[#1A1A1A]/90 hover:bg-black border-[#FF4FA3]/60 text-white animate-pulse shadow-[#FF4FA3]/20 hover:scale-105"
        }`}
      >
        {isPlaying && !isMuted ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#00E5C0] shrink-0" />
            
            {/* Equalizer animation */}
            <span className="flex items-end gap-[2px] h-3 shrink-0">
              <span className="w-[2px] bg-[#00E5C0] rounded-full animate-[bounce_0.8s_infinite_100ms] h-2"></span>
              <span className="w-[2px] bg-[#00E5C0] rounded-full animate-[bounce_0.8s_infinite_300ms] h-3"></span>
              <span className="w-[2px] bg-[#00E5C0] rounded-full animate-[bounce_0.8s_infinite_200ms] h-1.5"></span>
            </span>

            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-gray-200 font-semibold whitespace-nowrap">Music</span>
          </>
        ) : (
          <>
            {autoplayBlocked ? (
              <Music className="w-3.5 h-3.5 text-[#FF4FA3] animate-spin shrink-0" style={{ animationDuration: '3s' }} />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            )}
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#FF4FA3] font-semibold whitespace-nowrap">
              {autoplayBlocked ? "Play Music 🎵" : "Muted"}
            </span>
          </>
        )}
      </button>
    </>
  );
}

