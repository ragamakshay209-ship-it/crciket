import { useEffect, useRef, useState } from "react";

function useFlipDigits(value) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 180);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);
  return { display, flipping };
}

function FlipUnit({ value, label }) {
  const { display, flipping } = useFlipDigits(value);
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden rounded-md px-3 py-2 min-w-[64px] text-center"
        style={{ backgroundColor: "#16211A", border: "1px solid #3a4a3d" }}
      >
        <span
          className="font-mono text-3xl md:text-4xl font-bold tabular-nums transition-all duration-150"
          style={{
            color: "#F3EFE3",
            display: "inline-block",
            transform: flipping ? "translateY(-6px) scale(0.9)" : "translateY(0) scale(1)",
            opacity: flipping ? 0.3 : 1,
          }}
        >
          {display}
        </span>
      </div>
      <span className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "#C9A567" }}>
        {label}
      </span>
    </div>
  );
}

export default function Scoreboard({ match }) {
  if (!match || match.status !== "live") return null;
  const bat = match[match.battingTeam];
  const bowl = match.battingTeam === "teamA" ? match.teamB : match.teamA;

  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: "#0F2E1D" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: "#A32638" }}
            ></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#A32638" }}></span>
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E8B923" }}>
            Live
          </span>
          <span className="text-xs" style={{ color: "#C9A567" }}>
            · {match.tournament}
          </span>
        </div>
        <span className="text-xs" style={{ color: "#C9A567" }}>
          {match.venue}
        </span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-lg font-bold" style={{ fontFamily: "'Oswald', sans-serif", color: "#F3EFE3" }}>
            {bat.short}
          </p>
          <p className="text-xs" style={{ color: "#C9A567" }}>
            {bat.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm" style={{ color: "#C9A567" }}>
            bowling: {bowl.short}
          </p>
          {match.target && (
            <p className="text-xs mt-0.5" style={{ color: "#E8B923" }}>
              target {match.target}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-end gap-3 flex-wrap">
        <FlipUnit value={bat.runs} label="Runs" />
        <span className="text-3xl font-bold pb-3" style={{ color: "#C9A567" }}>
          /
        </span>
        <FlipUnit value={bat.wickets} label="Wkts" />
        <FlipUnit value={bat.overs} label="Overs" />
        <FlipUnit value={match.crr} label="CRR" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5 pt-4" style={{ borderTop: "1px solid #24382b" }}>
        <div className="rounded-lg p-3" style={{ backgroundColor: "#16211A" }}>
          <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#C9A567" }}>
            At the crease
          </p>
          {match.batsmen.map((b) => (
            <div key={b.name} className="flex justify-between text-sm py-0.5">
              <span style={{ color: "#F3EFE3" }}>
                {b.onStrike ? "● " : ""}
                {b.name}
              </span>
              <span className="font-mono" style={{ color: "#F3EFE3" }}>
                {b.runs}({b.balls})
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: "#16211A" }}>
          <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "#C9A567" }}>
            Bowling
          </p>
          <div className="flex justify-between text-sm py-0.5">
            <span style={{ color: "#F3EFE3" }}>{match.bowler.name}</span>
            <span className="font-mono" style={{ color: "#F3EFE3" }}>
              {match.bowler.wickets}/{match.bowler.runs}
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: "#C9A567" }}>
            {match.bowler.overs} overs
          </p>
          <p className="text-xs mt-2 font-mono tracking-wide" style={{ color: "#C9A567" }}>
            last 6: {match.lastBall}
          </p>
        </div>
      </div>
    </div>
  );
}
