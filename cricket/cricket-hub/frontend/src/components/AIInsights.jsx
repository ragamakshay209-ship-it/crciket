import { useState } from "react";
import { Sparkles, Target, Users, Flame } from "lucide-react";

export default function AIInsights({ match }) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setInsight(null);
    try {
      const res = await fetch(`/api/matches/${match.id}/insights`, { method: "POST" });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      setInsight(data);
    } catch (e) {
      setError("Couldn't generate insights right now. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "#F3EFE3", border: "1px solid #ded7c4" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} style={{ color: "#A32638" }} />
          <h3
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: "#16211A", fontFamily: "'Oswald', sans-serif" }}
          >
            AI match insights
          </h3>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          style={{ backgroundColor: "#A32638", color: "#F3EFE3", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Analyzing…" : insight ? "Regenerate" : "Generate"}
        </button>
      </div>

      {error && (
        <p className="text-sm" style={{ color: "#A32638" }}>
          {error}
        </p>
      )}

      {!insight && !loading && !error && (
        <p className="text-sm" style={{ color: "#6b6653" }}>
          Get an AI read on win probability, the key battle, and who to watch.
        </p>
      )}

      {loading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 rounded" style={{ backgroundColor: "#ded7c4", width: "80%" }} />
          <div className="h-3 rounded" style={{ backgroundColor: "#ded7c4", width: "60%" }} />
          <div className="h-3 rounded" style={{ backgroundColor: "#ded7c4", width: "70%" }} />
        </div>
      )}

      {insight && !loading && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono" style={{ color: "#6b6653" }}>
              <span>
                {match.teamA.short} {insight.winProbA}%
              </span>
              <span>
                {match.teamB.short} {insight.winProbB}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden flex" style={{ backgroundColor: "#ded7c4" }}>
              <div style={{ width: `${insight.winProbA}%`, backgroundColor: match.teamA.color }} />
              <div style={{ width: `${insight.winProbB}%`, backgroundColor: match.teamB.color }} />
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <Target size={15} className="mt-0.5 shrink-0" style={{ color: "#A32638" }} />
            <p className="text-sm" style={{ color: "#16211A" }}>
              {insight.keyMoment}
            </p>
          </div>

          <div className="flex gap-2 items-start">
            <Users size={15} className="mt-0.5 shrink-0" style={{ color: "#A32638" }} />
            <p className="text-sm" style={{ color: "#16211A" }}>
              <span className="font-semibold">{insight.playerToWatch}</span> — {insight.playerReason}
            </p>
          </div>

          <div className="rounded-lg p-3 flex gap-2 items-start" style={{ backgroundColor: "#16211A" }}>
            <Flame size={15} className="mt-0.5 shrink-0" style={{ color: "#E8B923" }} />
            <p className="text-sm italic" style={{ color: "#F3EFE3", fontFamily: "'Oswald', sans-serif" }}>
              {insight.hotTake}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
