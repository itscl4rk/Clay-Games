import { useEffect, useRef, useState } from "react";
import songs from "../data/lofisongs.json";

const LofiBeats = ({
  isUnlocked,
  startLofi,
}: {
  isUnlocked: boolean;
  startLofi: (fn: () => void) => void;
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // To keep track of the current song
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isUnlocked) {
      // Register play function from the parent
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

  // Function to handle the song change when the current song finishes
  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.songs.length); // Loop to the first song after the last one
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.songs.length);
  };

  const playPrevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.songs.length) % songs.songs.length
    ); // Fix negative index
  };

  if (!isUnlocked) return null;

  return (
    <>
      {/* Audio Player */}

      <audio
        ref={audioRef}
        src={songs.songs[currentSongIndex].audioUrl}
        onEnded={handleSongEnd} // Listen for the 'ended' event to change to the next song
        className="mt-4 z-10 relative"
      />
      <div className="group">
        {/* Image of Lofi Beats */}
        <img
          className="absolute bottom-0 right-80 w-50 h-50 z-10 pointer-events-none"
          src="/lofibeats.png"
          alt="LofiBeats"
        />
      </div>
    </>
  );
};

export default LofiBeats;
