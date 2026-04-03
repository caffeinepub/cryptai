import { useEffect, useRef } from "react";

export function StarryNightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      alphaSpeed: number;
      alphaDir: number;
      glowRadius: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      alpha: number;
      active: boolean;
      timer: number;
    }

    const NUM_STARS = 180;
    const NUM_SHOOTING = 4;

    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.4,
      alphaSpeed: Math.random() * 0.008 + 0.002,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      glowRadius: Math.random() * 7 + 2,
    }));

    const shootingStars: ShootingStar[] = Array.from(
      { length: NUM_SHOOTING },
      (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        vx: -(Math.random() * 8 + 5),
        vy: Math.random() * 4 + 2,
        length: Math.random() * 120 + 80,
        alpha: 0,
        active: false,
        timer: i * 140 + Math.random() * 220,
      }),
    );

    function resetShootingStar(s: ShootingStar) {
      s.x = Math.random() * width + 200;
      s.y = Math.random() * height * 0.4;
      const angle = Math.PI / 6 + (Math.random() * Math.PI) / 8;
      const speed = Math.random() * 10 + 8;
      s.vx = -Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.length = Math.random() * 140 + 80;
      s.alpha = 1;
      s.active = true;
      s.timer = Math.random() * 400 + 200;
    }

    function draw() {
      // Deep dark night sky
      ctx.fillStyle = "#00000e";
      ctx.fillRect(0, 0, width, height);

      // Draw stars with golden twinkle
      for (const star of stars) {
        star.alpha += star.alphaSpeed * star.alphaDir;
        if (star.alpha > star.baseAlpha + 0.3) star.alphaDir = -1;
        if (star.alpha < star.baseAlpha - 0.3) star.alphaDir = 1;
        star.alpha = Math.max(0.05, Math.min(1, star.alpha));

        // Soft golden glow
        const grad = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.glowRadius,
        );
        grad.addColorStop(0, `rgba(212, 175, 55, ${star.alpha})`);
        grad.addColorStop(0.4, `rgba(212, 175, 55, ${star.alpha * 0.35})`);
        grad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 242, 190, ${star.alpha})`;
        ctx.fill();
      }

      // Draw shooting stars
      for (const s of shootingStars) {
        if (!s.active) {
          s.timer--;
          if (s.timer <= 0) resetShootingStar(s);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.018;

        if (s.alpha <= 0 || s.x < -200 || s.y > height + 100) {
          s.active = false;
          s.timer = Math.random() * 380 + 160;
          continue;
        }

        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        const tailX = s.x - (s.vx / speed) * s.length;
        const tailY = s.y - (s.vy / speed) * s.length;

        const tailGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        tailGrad.addColorStop(0, "rgba(212, 175, 55, 0)");
        tailGrad.addColorStop(0.55, `rgba(255, 210, 80, ${s.alpha * 0.45})`);
        tailGrad.addColorStop(1, `rgba(255, 255, 220, ${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glowing head
        const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 10);
        headGrad.addColorStop(0, `rgba(255, 255, 240, ${s.alpha})`);
        headGrad.addColorStop(0.5, `rgba(212, 175, 55, ${s.alpha * 0.6})`);
        headGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.beginPath();
        ctx.arc(s.x, s.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      for (const star of stars) {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
