import React, { useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { ambientMusic } from "../utils/audio";

export const AudioPlayerButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const newState = ambientMusic.toggle();
    setIsPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 cursor-pointer ${
        isPlaying
          ? "bg-[#273d32]/95 border-[#dfba73] text-[#fcf9f2] ring-2 ring-[#dfba73]/40"
          : "bg-[#18241e]/90 border-slate-700/80 text-slate-300 hover:border-[#dfba73]/50"
      }`}
      title={isPlaying ? "Pausar Música Ambiente" : "Tocar Música Ambiente"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className="w-1 bg-[#ecd38c] rounded-full animate-bounce h-full" />
            <span
              className="w-1 bg-[#ecd38c] rounded-full animate-bounce h-2"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1 bg-[#ecd38c] rounded-full animate-bounce h-3"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <span className="text-xs font-medium text-[#ecd38c]">Música</span>
          <Volume2 className="w-3.5 h-3.5 text-[#ecd38c]" />
        </>
      ) : (
        <>
          <Music className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-medium">Música</span>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        </>
      )}
    </button>
  );
};
