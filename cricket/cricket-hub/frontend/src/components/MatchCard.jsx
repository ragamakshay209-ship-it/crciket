import { Radio, Clock, CheckCircle2 } from "lucide-react";

export default function MatchCard({ match, active, onClick }) {
  const statusIcon = {
    live: <Radio size={13} />,
    upcoming: <Clock size={13} />,
    completed: <CheckCircle2 size={13} />,
  }[match.status];

  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-3.5 min-w-[220px] shrink-0 transition-all"
      style={{
        backgroundColor: active ? "#0F2E1D" : "#F3EFE3",
        border: active ? "1px solid #C9A567" : "1px solid #ded7c4",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <span style={{ color: match.status === "live" ? "#A32638" : "#8a8571" }}>{statusIcon}</span>
        <span
          className="text-[10px] uppercase tracking-wider font-semibold"
          style={{ color: active ? "#C9A567" : "#8a8571" }}
        >
          {match.status === "live" ? "Live" : match.status === "upcoming" ? "Upcoming" : "Result"}
        </span>
      </div>
      <p className="text-sm font-semibold" style={{ color: active ? "#F3EFE3" : "#16211A" }}>
        {match.teamA.short} vs {match.teamB.short}
      </p>
      {match.status === "live" && (
        <p className="text-xs font-mono mt-1" style={{ color: active ? "#C9A567" : "#6b6653" }}>
          {match[match.battingTeam].runs}/{match[match.battingTeam].wickets} ({match[match.battingTeam].overs})
        </p>
      )}
      {match.status === "upcoming" && (
        <p className="text-xs mt-1" style={{ color: active ? "#C9A567" : "#6b6653" }}>
          {match.startsIn}
        </p>
      )}
      {match.status === "completed" && (
        <p className="text-xs mt-1" style={{ color: active ? "#C9A567" : "#6b6653" }}>
          {match.result}
        </p>
      )}
    </button>
  );
}
