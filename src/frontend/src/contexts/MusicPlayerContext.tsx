import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type Genre,
  PLAYLIST,
  getTrackName,
  getTrackUrl,
} from "../config/playlist.config";

export const PLAYER_TOGGLE_EVENT = "cryptai:togglePlayer";

interface MusicPlayerState {
  isOpen: boolean;
  isPlaying: boolean;
  currentGenre: Genre;
  currentIndex: number;
  volume: number;
  currentTime: number;
  duration: number;
  currentTrackName: string;
  playlist: string[];
  toggleOpen: () => void;
  openPlayer: () => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  setGenre: (g: Genre) => void;
  seek: (time: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerState | null>(null);

export function MusicPlayerProvider({
  children,
}: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentGenreRef = useRef<Genre>("Standart");
  const isPlayingRef = useRef(false);
  const volumeRef = useRef(0.1);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGenre, setCurrentGenre] = useState<Genre>("Standart");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playlist = PLAYLIST[currentGenre];
  const currentFilename = playlist[currentIndex] ?? "";
  const currentTrackName = currentFilename ? getTrackName(currentFilename) : "";

  // Init audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.1;
    audio.preload = "metadata";
    audioRef.current = audio;

    const onEnded = () => {
      setCurrentIndex((prev) => {
        const list = PLAYLIST[currentGenreRef.current];
        if (list.length === 0) return 0;
        return (prev + 1) % list.length;
      });
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Keep refs in sync
  useEffect(() => {
    currentGenreRef.current = currentGenre;
  }, [currentGenre]);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Update src when track identity changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentFilename) {
      audio.pause();
      audio.src = "";
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      return;
    }
    const url = getTrackUrl(currentGenre, currentFilename);
    audio.src = url;
    audio.volume = volumeRef.current;
    setCurrentTime(0);
    if (isPlayingRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentFilename, currentGenre]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentFilename) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [currentFilename]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist]);

  const prev = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setGenre = useCallback((g: Genre) => {
    setCurrentGenre(g);
    setCurrentIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    const newList = PLAYLIST[g];
    if (newList.length > 0) {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.src = getTrackUrl(g, newList[0]);
      audio.volume = volumeRef.current;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, []);

  const toggleOpen = useCallback(() => setIsOpen((v) => !v), []);

  const openPlayer = useCallback(() => {
    setIsOpen(true);
    if (isPlayingRef.current) return; // already playing, just show player
    const list = PLAYLIST.Standart;
    if (list.length === 0) return;
    const audio = audioRef.current;
    if (!audio) return;
    // Set state first
    setCurrentGenre("Standart");
    currentGenreRef.current = "Standart";
    setCurrentIndex(0);
    setVolumeState(0.1);
    // Set src and play
    const url = getTrackUrl("Standart", list[0]);
    audio.pause();
    audio.src = url;
    audio.volume = 0.1;
    // Use a small delay to let the src assignment settle
    setTimeout(() => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        })
        .catch(() => {});
    }, 50);
  }, []);

  useEffect(() => {
    const handler = () => openPlayer();
    window.addEventListener(PLAYER_TOGGLE_EVENT, handler);
    return () => window.removeEventListener(PLAYER_TOGGLE_EVENT, handler);
  }, [openPlayer]);

  return (
    <MusicPlayerContext.Provider
      value={{
        isOpen,
        isPlaying,
        currentGenre,
        currentIndex,
        volume,
        currentTime,
        duration,
        currentTrackName,
        playlist,
        toggleOpen,
        openPlayer,
        play,
        pause,
        togglePlay,
        next,
        prev,
        setVolume,
        setGenre,
        seek,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx)
    throw new Error("useMusicPlayer must be used inside MusicPlayerProvider");
  return ctx;
}

export function triggerPlayerOpen() {
  window.dispatchEvent(new CustomEvent(PLAYER_TOGGLE_EVENT));
}
