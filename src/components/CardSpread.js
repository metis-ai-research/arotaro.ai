import { useState, useMemo, useCallback } from "react";
import "./css/CardSpread.scss";

// Symmetric horizontal positions for an arbitrary card count.
// Width per card slot scales gently to keep the spread under ~600px wide.
function computePositions(count) {
  if (count <= 1) return [{ x: 0, r: 0 }];
  const half = (count - 1) / 2;
  const xStep = 180; // px between card centers
  const rotStep = 14 / half; // outermost cards reach ±14°
  return Array.from({ length: count }, (_, i) => {
    const offset = i - half;
    return { x: offset * xStep, r: offset * rotStep };
  });
}

// `people` is an array: [{ name, tarot, roman, topic, desc, meta, img, accent }]
export default function CardSpread({ people }) {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(() => people.map(() => true));

  const positions = useMemo(() => computePositions(people.length), [people.length]);
  const cur = people[active];

  const toggleReveal = useCallback((i) => {
    setRevealed((prev) => prev.map((v, j) => (j === i ? !v : v)));
  }, []);

  const onKey = useCallback(
    (e, i) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => (a - 1 + people.length) % people.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => (a + 1) % people.length);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleReveal(i);
      }
    },
    [people.length, toggleReveal]
  );

  return (
    <div className="ar-spread">
      <div key={active} className="ar-spread__active" style={{ "--accent": cur.accent }}>
        <div className="ar-spread__topic">{cur.topic}</div>
        <div className="ar-spread__title">
          {cur.tarot}
          <span className="ar-spread__roman">{cur.roman}</span>
        </div>
        <div className="ar-spread__desc">{cur.desc}</div>
      </div>

      <div className="ar-spread__deck">
        {people.map((p, i) => {
          const isActive = active === i;
          const isReveal = revealed[i];
          const pos = positions[i];
          return (
            <button
              key={p.name}
              type="button"
              className={`ar-spread__card${isActive ? " is-active" : ""}`}
              style={{
                "--x": `${pos.x}px`,
                "--r": `${pos.r}deg`,
                "--accent": p.accent,
              }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => toggleReveal(i)}
              onKeyDown={(e) => onKey(e, i)}
              aria-label={`${p.tarot} ${p.roman} — ${p.name}. Click to flip.`}
              aria-pressed={!isReveal}
            >
              <div className={`ar-spread__inner${isReveal ? "" : " is-flipped"}`}>
                {/* Front: cream tarot card with photo */}
                <div className="ar-spread__face ar-spread__face--front">
                  <div className="ar-spread__face-inner">
                    <div className="ar-spread__face-corners">
                      <span className="ar-spread__corner-roman">{p.roman}</span>
                      <span className="ar-spread__corner-roman ar-spread__corner-roman--bottom">
                        {p.roman}
                      </span>
                    </div>
                    <div className="ar-spread__photo">
                      <div className="ar-spread__photo-frame" />
                      <div className="ar-spread__photo-img">
                        <img src={p.img} alt={p.name} />
                      </div>
                    </div>
                    <div className="ar-spread__caption">
                      <div className="ar-spread__caption-tarot">{p.tarot}</div>
                      <div className="ar-spread__caption-meta">{p.meta}</div>
                    </div>
                  </div>
                </div>

                {/* Back: deep navy with diagonal stripes + monogram */}
                <div className="ar-spread__face ar-spread__face--back">
                  <div className="ar-spread__back-inner">
                    <div className="ar-spread__monogram">A</div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="ar-spread__hint">Hover to focus · Click to flip</div>
    </div>
  );
}
