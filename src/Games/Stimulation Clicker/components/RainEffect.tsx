import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import audio from "../sounds/rain.mp3";

interface RainEffectProps {
  isUnlocked: boolean;
}

const RainEffect = ({ isUnlocked }: RainEffectProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [drops, setDrops] = useState<
    { id: number; left: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    if (!isUnlocked) return;

    const newDrops = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 1 + Math.random() * 1.5,
    }));
    setDrops(newDrops);
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked) return;

    const tryPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Playback failed:", err);
        });
      }
      window.removeEventListener("click", tryPlay);
    };

    window.addEventListener("click", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
    };
  }, [isUnlocked]);

  if (!isUnlocked) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <audio ref={audioRef} src={audio} loop />
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: "-10vh", opacity: 0.5 }}
          animate={{ y: "110vh", opacity: 0 }}
          transition={{
            delay: drop.delay,
            duration: drop.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[2px] h-10 bg-blue-400 opacity-50 rounded-full"
          style={{ left: `${drop.left}%` }}
        />
      ))}
    </div>
  );
};

export default RainEffect;
