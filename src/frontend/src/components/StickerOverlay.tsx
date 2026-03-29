import { useCallback, useEffect, useRef, useState } from "react";

export const STICKER_EVENT = "cryptai:triggerSticker";

const STICKER_IMAGES = [
  "/assets/uploads/1-019d366d-7418-7455-982c-e633c411f20a-2.png",
  "/assets/uploads/2-019d366d-738f-7602-8dcc-205902b00588-1.png",
  "/assets/uploads/3-019d366d-8522-7219-94e9-40025bdbb008-3.png",
];

export function StickerOverlay() {
  const [visible, setVisible] = useState(false);
  const [frame, setFrame] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = useCallback(() => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
  }, []);

  // Always restart the animation on trigger -- never cancel mid-run
  const handleTrigger = useCallback(() => {
    clearAll();

    setFrame(0);
    setVisible(true);

    // Sticker 1: 0–150ms, Sticker 2: 150–300ms, Sticker 3: 300–1300ms, then hide
    const t1 = setTimeout(() => setFrame(1), 150);
    const t2 = setTimeout(() => setFrame(2), 300);
    const t3 = setTimeout(() => {
      setVisible(false);
    }, 1300);

    timeoutsRef.current = [t1, t2, t3];
  }, [clearAll]);

  useEffect(() => {
    window.addEventListener(STICKER_EVENT, handleTrigger);
    return () => window.removeEventListener(STICKER_EVENT, handleTrigger);
  }, [handleTrigger]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAll();
  }, [clearAll]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {STICKER_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`sticker-${i + 1}`}
          className="absolute w-[70vmin] h-[70vmin] object-contain"
          style={{
            opacity: frame === i ? 1 : 0,
            transition: "opacity 0.08s ease",
          }}
        />
      ))}
    </div>
  );
}

export function triggerSticker() {
  window.dispatchEvent(new CustomEvent(STICKER_EVENT));
}
