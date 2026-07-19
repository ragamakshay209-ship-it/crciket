import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import MatchCard from "./components/MatchCard.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import AIInsights from "./components/AIInsights.jsx";

export default function App() {
  const [matches, setMatches] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((data) => {
        setMatches(data);
        setActiveId(data[0]?.id ?? null);
      })
      .catch(() => setError("Couldn't load matches. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const active = matches.find((m) => m.id === activeId);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#EDEBE1" }}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Oswald', sans-serif", color: "#16211A" }}>
              Crease<span style={{ color: "#A32638" }}>Hub</span>
            </h1>
            <p className="text-xs" style={{ color: "#6b6653" }}>
              Live scores, scorecards and AI match reads
            </p>
          </div>
          <TrendingUp size={22} style={{ color: "#A32638" }} />
        </header>

        {loading && (
          <p className="text-sm" style={{ color: "#6b6653" }}>
            Loading matches…
          </p>
        )}

        {error && (
          <p className="text-sm" style={{ color: "#A32638" }}>
            {error}
          </p>
        )}

        {!loading && !error && active && (
          <>
            <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
              {matches.map((m) => (
                <MatchCard key={m.id} match={m} active={m.id === activeId} onClick={() => setActiveId(m.id)} />
              ))}
            </div>

            {active.status === "live" && (
              <div className="mb-6">
                <Scoreboard match={active} />
              </div>
            )}

            {active.status === "upcoming" && (
              <div className="rounded-2xl p-6 mb-6 text-center" style={{ backgroundColor: "#0F2E1D" }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#E8B923" }}>
                  {active.tournament}
                </p>
                <p className="text-xl font-bold" style={{ fontFamily: "'Oswald', sans-serif", color: "#F3EFE3" }}>
                  {active.teamA.short} vs {active.teamB.short}
                </p>
                <p className="text-sm mt-2" style={{ color: "#C9A567" }}>
                  {active.venue}
                </p>
                <p className="text-sm mt-1" style={{ color: "#C9A567" }}>
                  Starts {active.startsIn}
                </p>
              </div>
            )}

            {active.status === "completed" && (
              <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#0F2E1D" }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#E8B923" }}>
                  {active.tournament} · Full time
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold" style={{ color: "#F3EFE3" }}>
                      {active.teamA.short}
                    </p>
                    <p className="font-mono text-lg" style={{ color: "#F3EFE3" }}>
                      {active.teamA.runs}/{active.teamA.wickets}
                    </p>
                  </div>
                  <span className="text-sm" style={{ color: "#C9A567" }}>
                    vs
                  </span>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: "#F3EFE3" }}>
                      {active.teamB.short}
                    </p>
                    <p className="font-mono text-lg" style={{ color: "#F3EFE3" }}>
                      {active.teamB.runs}/{active.teamB.wickets}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-3 text-center" style={{ color: "#C9A567" }}>
                  {active.result}
                </p>
              </div>
            )}

            <AIInsights match={active} />
          </>
        )}
      </div>
    </div>
  );
}
