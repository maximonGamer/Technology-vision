import { useEffect, useRef, useState } from "react";

type Slide = { src: string; caption: string };

export function TeamSlide({
  name,
  role,
  description,
  slides,
  interval = 4200,
}: {
  name: string;
  role: string;
  description: string;
  slides: [Slide, Slide];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [interval, slides.length]);

  function handleMove(e: React.MouseEvent) {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 12, y: px * 14 });
  }

  return (
    <article className="perspective group">
      <div
        ref={frame}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="tilt-3d glass-card relative overflow-hidden rounded-3xl"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          boxShadow: tilt.x || tilt.y ? "var(--shadow-glow)" : "var(--shadow-card)",
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {slides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={`${name} — ${s.caption}`}
              width={900}
              height={1100}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "scale(1)" : "scale(1.08)",
              }}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, oklch(0.16 0.06 300 / 0.85) 100%)",
            }}
          />
          <figcaption className="absolute bottom-4 left-5 right-5 text-sm text-muted-foreground">
            {slides[active]?.caption}
          </figcaption>
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Ver slide ${i + 1} de ${name}`}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 34 : 14,
                  backgroundImage:
                    i === active ? "var(--gradient-brand)" : "none",
                  backgroundColor:
                    i === active ? undefined : "var(--color-border)",
                }}
              />
            ))}
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{name}</h3>
          <p className="text-gradient text-sm font-semibold uppercase tracking-[0.18em]">
            {role}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
