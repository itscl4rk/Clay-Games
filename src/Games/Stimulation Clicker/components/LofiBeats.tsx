import { useEffect, useRef, useState } from "react";
import songs from "../data/lofisongs.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LofiBeats = ({
  isUnlocked,
  startLofi,
}: {
  isUnlocked: boolean;
  startLofi: (fn: () => void) => void;
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isUnlocked) {
      startLofi(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch((err) => {
            console.warn("Playback failed:", err);
          });
        }
      });
    }
  }, [isUnlocked, startLofi]);

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.songs.length);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.songs.length);
  };

  const playPrevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.songs.length) % songs.songs.length
    );
  };

  if (!isUnlocked) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={songs.songs[currentSongIndex].audioUrl}
        onEnded={handleSongEnd}
        className="mt-4 z-10 relative"
      />
      <div className="group relative w-[300px] h-[300px]">
        <img
          className="w-full h-full object-contain pointer-events-none"
          src="/upgrades/lofibeats.png"
          alt="LofiBeats"
        />
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 h-12 w-11/12 bg-white shadow-xl text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4 rounded-lg">
          <button onClick={playPrevSong}>
            <ChevronLeft className="cursor-pointer w-6 h-6" />
          </button>
          <span className="text-sm text-center px-2 truncate">
            {songs.songs[currentSongIndex].name}
          </span>
          <button onClick={playNextSong}>
            <ChevronRight className="cursor-pointer w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default LofiBeats;
