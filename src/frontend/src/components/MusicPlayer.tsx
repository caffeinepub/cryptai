import {
  ChevronDown,
  ChevronUp,
  Download,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GENRES, getTrackUrl } from "../config/playlist.config";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useMembership } from "../contexts/MembershipContext";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { useTheme } from "../contexts/ThemeContext";

const GOLD = "#D4AF37";
const FREE_MONTHLY_LIMIT = 3;
const DOWNLOAD_COUNT_KEY = "cryptai-download-count";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function getDownloadCount(username: string): number {
  try {
    const raw = localStorage.getItem(`${DOWNLOAD_COUNT_KEY}-${username}`);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    if (data.month !== getMonthKey()) return 0;
    return data.count || 0;
  } catch {
    return 0;
  }
}

function incrementDownloadCount(username: string): number {
  const count = getDownloadCount(username) + 1;
  localStorage.setItem(
    `${DOWNLOAD_COUNT_KEY}-${username}`,
    JSON.stringify({ month: getMonthKey(), count }),
  );
  return count;
}

export function MusicPlayer() {
  const {
    isOpen,
    isPlaying,
    currentGenre,
    volume,
    currentTime,
    duration,
    currentTrackName,
    playlist,
    currentIndex,
    toggleOpen,
    togglePlay,
    next,
    prev,
    setVolume,
    setGenre,
    seek,
  } = useMusicPlayer();
  const { theme } = useTheme();
  const { canAccess } = useMembership();
  const { currentUser, isLoggedIn } = useAuth();
  const { t } = useLanguage();

  const [downloadCountState, setDownloadCountState] = useState(0);
  const isDraggingRef = useRef(false);
  const [dragValue, setDragValue] = useState(0);

  useEffect(() => {
    if (currentUser) {
      setDownloadCountState(getDownloadCount(currentUser.username));
    } else {
      setDownloadCountState(0);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isDraggingRef.current) {
      setDragValue(currentTime);
    }
  }, [currentTime]);

  const isDark = theme === "dark";
  if (!isOpen) return null;

  const bg = isDark
    ? "bg-zinc-900 border border-zinc-700"
    : "bg-white border border-zinc-200";
  const text = isDark ? "text-white" : "text-zinc-900";
  const muted = isDark ? "text-zinc-400" : "text-zinc-500";
  const btnHover = isDark ? "hover:bg-zinc-700" : "hover:bg-zinc-100";
  const genreActive = isDark
    ? "bg-zinc-700 text-white"
    : "bg-zinc-200 text-zinc-900";
  const genreInactive = isDark
    ? "text-zinc-400 hover:bg-zinc-700"
    : "text-zinc-500 hover:bg-zinc-200";

  const seekPercent = duration > 0 ? (dragValue / duration) * 100 : 0;
  const currentFilename = playlist[currentIndex] ?? "";
  const currentTrackUrl = currentFilename
    ? getTrackUrl(currentGenre, currentFilename)
    : "";

  const isPaidPlan = canAccess("creamed");
  const canDownloadNow =
    isPaidPlan || (isLoggedIn && downloadCountState < FREE_MONTHLY_LIMIT);

  let downloadHint: string | null = null;
  if (!isLoggedIn) {
    downloadHint = t("download_register");
  } else if (!isPaidPlan && downloadCountState >= FREE_MONTHLY_LIMIT) {
    downloadHint = t("download_limit_reached");
  }

  const handleDownload = () => {
    if (!canDownloadNow || !currentTrackUrl || !currentTrackName) return;
    const a = document.createElement("a");
    a.href = currentTrackUrl;
    a.download = currentTrackName;
    a.click();
    if (!isPaidPlan && currentUser) {
      const newCount = incrementDownloadCount(currentUser.username);
      setDownloadCountState(newCount);
    }
  };

  const handleSeekMouseDown = () => {
    isDraggingRef.current = true;
  };
  const handleSeekTouchStart = () => {
    isDraggingRef.current = true;
  };
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDragValue(Number.parseFloat(e.target.value));
  };
  const handleSeekCommit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const val = Number.parseFloat((e.target as HTMLInputElement).value);
    seek(val);
    isDraggingRef.current = false;
  };

  return (
    <div
      className="w-full flex justify-center py-2 px-3"
      style={{ zIndex: 29 }}
    >
      <div
        className={`${bg} ${text} rounded-2xl px-4 py-3 shadow-xl`}
        style={{ width: "100%", maxWidth: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Music size={12} style={{ color: GOLD }} />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: GOLD }}
            >
              Creamy Vibes
            </span>
          </div>
          <button
            type="button"
            onClick={toggleOpen}
            className={`p-0.5 rounded-full ${btnHover} ${muted} transition-colors`}
            aria-label="Collapse player"
          >
            <ChevronUp size={14} />
          </button>
        </div>

        {/* Genre selector */}
        <div
          className="flex items-center gap-1 mb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenre(g)}
              className={`text-xs px-2 py-0.5 rounded-full transition-colors flex-shrink-0 whitespace-nowrap ${currentGenre === g ? genreActive : genreInactive}`}
            >
              {g === "Standart" ? "All" : g}
            </button>
          ))}
        </div>

        {/* Song name */}
        <div className="mb-2 min-w-0">
          {playlist.length === 0 ? (
            <span className={`text-xs ${muted} italic`}>
              No tracks in this genre
            </span>
          ) : (
            <span
              className="text-xs font-medium truncate block"
              style={{ color: GOLD }}
            >
              ♪ {currentTrackName || "Unknown Track"}
            </span>
          )}
        </div>

        {/* Seek bar */}
        <div className="mb-2">
          <input
            type="range"
            min={0}
            max={duration > 0 ? duration : 100}
            step={0.1}
            value={dragValue}
            onMouseDown={handleSeekMouseDown}
            onTouchStart={handleSeekTouchStart}
            onChange={handleSeekChange}
            onMouseUp={handleSeekCommit}
            onTouchEnd={handleSeekCommit}
            disabled={playlist.length === 0 || duration === 0}
            className="w-full cursor-pointer disabled:opacity-30"
            aria-label="Seek"
            style={{
              accentColor: GOLD,
              background: `linear-gradient(to right, ${GOLD} ${seekPercent}%, ${isDark ? "#52525b" : "#d4d4d8"} ${seekPercent}%)`,
              height: "3px",
              borderRadius: "2px",
              outline: "none",
              appearance: "none",
              WebkitAppearance: "none",
            }}
          />
          <div
            className={`flex justify-between ${muted} mt-0.5`}
            style={{ fontSize: "10px" }}
          >
            <span>{formatTime(dragValue)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls + Volume + Download */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={prev}
              disabled={playlist.length === 0}
              className={`p-1 rounded-full ${btnHover} transition-colors disabled:opacity-30 flex-shrink-0`}
              aria-label="Previous"
            >
              <SkipBack size={15} />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              disabled={playlist.length === 0}
              className="p-2 rounded-full transition-colors disabled:opacity-30 flex-shrink-0"
              style={{ background: GOLD, color: "#000" }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              type="button"
              onClick={next}
              disabled={playlist.length === 0}
              className={`p-1 rounded-full ${btnHover} transition-colors disabled:opacity-30 flex-shrink-0`}
              aria-label="Next"
            >
              <SkipForward size={15} />
            </button>

            {/* Download arrow always visible + hint */}
            <div className="flex items-center gap-1 min-w-0">
              <button
                type="button"
                onClick={canDownloadNow ? handleDownload : undefined}
                disabled={!currentTrackUrl}
                className={`p-1 rounded-full transition-colors flex-shrink-0 ${canDownloadNow && currentTrackUrl ? `${btnHover} cursor-pointer` : "cursor-default"}`}
                aria-label="Download track"
                title="Download"
              >
                <Download
                  size={14}
                  style={{ color: GOLD, opacity: currentTrackUrl ? 1 : 0.4 }}
                />
              </button>
              {downloadHint && (
                <span
                  style={{
                    color: GOLD,
                    fontSize: "10px",
                    opacity: 0.85,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "160px",
                  }}
                >
                  {downloadHint}
                </span>
              )}
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Volume2 size={12} className={muted} />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
              className="cursor-pointer"
              style={{ width: "55px", accentColor: GOLD }}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MusicPlayerCollapsedBar() {
  const { isOpen, toggleOpen, isPlaying, currentTrackName } = useMusicPlayer();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  if (isOpen) return null;
  const muted = isDark ? "text-zinc-400" : "text-zinc-500";
  return (
    <div className="w-full flex justify-center py-1 px-3">
      <button
        type="button"
        className={`flex items-center gap-1.5 cursor-pointer px-3 py-1 rounded-full border ${isDark ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"}`}
        onClick={toggleOpen}
        aria-label="Open Creamy Vibes player"
      >
        <Music size={11} style={{ color: GOLD }} />
        <span className={`text-xs ${muted} truncate max-w-[160px]`}>
          {isPlaying && currentTrackName
            ? `♪ ${currentTrackName}`
            : "Creamy Vibes"}
        </span>
        <ChevronDown size={11} className={`${muted} flex-shrink-0`} />
      </button>
    </div>
  );
}
