import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FREE_TIMER_MINUTES } from "../config/app.config";
import { useAuth } from "./AuthContext";

// Timer-Dauer aus zentraler Konfiguration
const TIMER_DURATION = FREE_TIMER_MINUTES * 60; // in Sekunden
const TIMER_KEY = "cryptai-reading-start";

interface ReadingTimerContextValue {
  timeExpired: boolean;
  secondsLeft: number;
  resetTimer: () => void;
}

const ReadingTimerContext = createContext<ReadingTimerContextValue>({
  timeExpired: false,
  secondsLeft: TIMER_DURATION,
  resetTimer: () => {},
});

export function ReadingTimerProvider({
  children,
}: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getSecondsElapsed = useCallback((): number => {
    const startStr = sessionStorage.getItem(TIMER_KEY);
    if (!startStr) return 0;
    const start = Number.parseInt(startStr, 10);
    return Math.floor((Date.now() - start) / 1000);
  }, []);

  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (isLoggedIn) return TIMER_DURATION;
    const elapsed = getSecondsElapsed();
    return Math.max(0, TIMER_DURATION - elapsed);
  });

  // Startet den Timer neu (Entwickler-Funktion)
  const resetTimer = useCallback(() => {
    sessionStorage.setItem(TIMER_KEY, Date.now().toString());
    setSecondsLeft(TIMER_DURATION);
  }, []);

  // Starte den Session-Timer beim ersten Laden (wenn nicht eingeloggt)
  useEffect(() => {
    if (isLoggedIn) return;
    if (!sessionStorage.getItem(TIMER_KEY)) {
      sessionStorage.setItem(TIMER_KEY, Date.now().toString());
    }
  }, [isLoggedIn]);

  // Countdown-Tick
  useEffect(() => {
    if (isLoggedIn) {
      setSecondsLeft(TIMER_DURATION);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const elapsed = getSecondsElapsed();
      const left = Math.max(0, TIMER_DURATION - elapsed);
      setSecondsLeft(left);
      if (left === 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoggedIn, getSecondsElapsed]);

  return (
    <ReadingTimerContext.Provider
      value={{ timeExpired: secondsLeft === 0, secondsLeft, resetTimer }}
    >
      {children}
    </ReadingTimerContext.Provider>
  );
}

export function useReadingTimer() {
  return useContext(ReadingTimerContext);
}
