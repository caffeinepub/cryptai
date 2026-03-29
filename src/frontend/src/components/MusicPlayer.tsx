import {
  ChevronDown,
  ChevronUp,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { GENRES } from "../config/playlist.config";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { useTheme } from "../contexts/ThemeContext";

export function MusicPlayer() {
  const {
    isOpen,
    isPlaying,
    currentGenre,
    volume,
    currentTrackName,
    playlist,
    toggleOpen,
    togglePlay,
    next,
    prev,
    setVolume,
    setGenre,
  } = useMusicPlayer();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  if (!isOpen) return null;

  const bg = isDark
    ? "bg-zinc-900 border-zinc-700"
    : "bg-white border-zinc-200";
  const text = isDark ? "text-white" : "text-zinc-900";
  const muted = isDark ? "text-zinc-400" : "text-zinc-500";
  const btnHover = isDark ? "hover:bg-zinc-700" : "hover:bg-zinc-100";
  const genreActive = isDark
    ? "bg-zinc-700 text-white"
    : "bg-zinc-200 text-zinc-900";
  const genreInactive = isDark
    ? "text-zinc-400 hover:bg-zinc-800"
    : "text-zinc-500 hover:bg-zinc-100";

  return (
    <div
      className={`w-full border-b ${bg} ${text} px-4 py-3 transition-all duration-300`}
      style={{ zIndex: 29 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Music size={14} className={muted} />
          <span className="text-xs font-bold tracking-wide uppercase opacity-60">
            Creamy Vibes
          </span>
        </div>
        <button
          type="button"
          onClick={toggleOpen}
          className={`p-1 rounded ${btnHover} ${muted} transition-colors`}
          aria-label="Collapse player"
        >
          <ChevronUp size={16} />
        </button>
      </div>

      {/* Genre selector */}
      <div className="flex items-center gap-1 mb-3 flex-wrap">
        <span className={`text-xs ${muted} mr-1`}>Genre:</span>
        {GENRES.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
              currentGenre === g ? genreActive : genreInactive
            }`}
          >
            {g === "Standart" ? "Default" : g}
          </button>
        ))}
      </div>

      {/* Track name + controls */}
      <div className="flex items-center gap-3">
        {/* Prev */}
        <button
          type="button"
          onClick={prev}
          disabled={playlist.length === 0}
          className={`p-1.5 rounded-full ${btnHover} transition-colors disabled:opacity-30`}
          aria-label="Previous"
        >
          <SkipBack size={16} />
        </button>

        {/* Play/Pause */}
        <button
          type="button"
          onClick={togglePlay}
          disabled={playlist.length === 0}
          className={`p-2 rounded-full ${
            isDark
              ? "bg-zinc-700 hover:bg-zinc-600"
              : "bg-zinc-200 hover:bg-zinc-300"
          } transition-colors disabled:opacity-30`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={next}
          disabled={playlist.length === 0}
          className={`p-1.5 rounded-full ${btnHover} transition-colors disabled:opacity-30`}
          aria-label="Next"
        >
          <SkipForward size={16} />
        </button>

        {/* Song name */}
        <div className="flex-1 min-w-0">
          {playlist.length === 0 ? (
            <span className={`text-xs ${muted} italic`}>
              No tracks in this genre
            </span>
          ) : (
            <span className="text-sm font-medium truncate block">
              {currentTrackName || "Unknown Track"}
            </span>
          )}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Volume2 size={13} className={muted} />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
            className="w-20 accent-current cursor-pointer"
            aria-label="Volume"
          />
          <span className={`text-xs ${muted} w-7 text-right`}>
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

// A small collapsed bar to re-open the player
export function MusicPlayerCollapsedBar() {
  const { isOpen, toggleOpen, isPlaying, currentTrackName } = useMusicPlayer();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isOpen) return null;

  const bg = isDark
    ? "bg-zinc-900 border-zinc-700"
    : "bg-white border-zinc-200";
  const muted = isDark ? "text-zinc-400" : "text-zinc-500";

  return (
    <button
      type="button"
      className={`w-full border-b ${bg} px-4 py-1.5 flex items-center gap-2 cursor-pointer text-left`}
      onClick={toggleOpen}
      aria-label="Open Creamy Vibes player"
    >
      <Music size={12} className={muted} />
      <span className={`text-xs ${muted}`}>
        {isPlaying && currentTrackName
          ? `♪ ${currentTrackName}`
          : "Creamy Vibes"}
      </span>
      <ChevronDown size={12} className={muted} />
    </button>
  );
}
