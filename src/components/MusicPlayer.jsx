import React, { useRef, useState } from "react";
import song from '../assets/song.mp3'
import icon from '../assets/icon-music.svg'
import pause from '../assets/icon-pause.svg'

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full">
      <audio ref={audioRef} src={song} preload="auto"></audio>
      <button onClick={togglePlayPause}>
      
        {isPlaying ? <img src={pause} alt="" className="text-center size-20 ml-3 sm:ml-10 mt-9 animate-custom-bounce bg-black rounded-full p-4 fixed bg-opacity-40 z-50"/> : <img src={icon} alt="" className="text-center size-20 ml-3 sm:ml-10 mt-9 animate-custom-bounce bg-black rounded-full p-4 fixed bg-opacity-40 z-50"/>}
      </button>
    </div>
  );
};

export default MusicPlayer;