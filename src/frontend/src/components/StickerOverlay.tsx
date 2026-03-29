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
  const visibleRef = useRef(false);

  const handleTrigger = useCallback(() => {
    const clearAll = () => {
      for (const t of timeoutsRef.current) clearTimeout(t);
      timeoutsRef.current = [];
    };

    if (visibleRef.current) {
      clearAll();
      visibleRef.current = false;
      setVisible(false);
    } else {
      clearAll();
      visibleRef.current = true;
      setFrame(0);
      setVisible(true);
      // Bild 1: 0ms–200ms, Bild 2: 200ms–400ms, Bild 3: 400ms–1400ms (1 Sekunde)
      const t1 = setTimeout(() => setFrame(1), 200);
      const t2 = setTimeout(() => setFrame(2), 400);
      const t3 = setTimeout(() => {
        visibleRef.current = false;
        setVisible(false);
      }, 1400);
      timeoutsRef.current = [t1, t2, t3];
    }
  }, []);

  useEffect(() => {
    window.addEventListener(STICKER_EVENT, handleTrigger);
    return () => window.removeEventListener(STICKER_EVENT, handleTrigger);
  }, [handleTrigger]);

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
            display: frame === i ? "block" : "none",
          }}
        />
      ))}
    </div>
  );
}

export function triggerSticker() {
  window.dispatchEvent(new CustomEvent(STICKER_EVENT));
}
