// In-memory match data. Swap this for a real cricket data provider
// (e.g. CricAPI, Cricbuzz, SportRadar) by replacing getMatches()/getMatchById()
// with real fetch calls — the route layer doesn't need to change.

const matches = [
  {
    id: "live1",
    status: "live",
    tournament: "IPL 2026 · Qualifier",
    teamA: { name: "Sunrisers Hyderabad", short: "SRH", runs: 178, wickets: 4, overs: 16.3, color: "#D97757" },
    teamB: { name: "Chennai Super Kings", short: "CSK", runs: 0, wickets: 0, overs: 0, color: "#FBBF24" },
    battingTeam: "teamA",
    target: null,
    venue: "Rajiv Gandhi Intl. Stadium, Hyderabad",
    crr: 10.8,
    lastBall: "4, 1, W, 6, 2, 1",
    batsmen: [
      { name: "H. Klaasen", runs: 62, balls: 34, sr: 182.4, onStrike: true },
      { name: "N. Pooran", runs: 18, balls: 12, sr: 150.0, onStrike: false },
    ],
    bowler: { name: "M. Theekshana", overs: "3.3", runs: 38, wickets: 1 },
  },
  {
    id: "live2",
    status: "live",
    tournament: "IPL 2026 · Eliminator",
    teamA: { name: "Mumbai Indians", short: "MI", runs: 201, wickets: 6, overs: 20, color: "#3B82F6" },
    teamB: { name: "Royal Challengers Bengaluru", short: "RCB", runs: 142, wickets: 5, overs: 15.2, color: "#DC2626" },
    battingTeam: "teamB",
    target: 202,
    venue: "Wankhede Stadium, Mumbai",
    crr: 9.3,
    lastBall: "1, 4, 0, 1, 6, 1",
    batsmen: [
      { name: "V. Kohli", runs: 71, balls: 44, sr: 161.4, onStrike: true },
      { name: "R. Jurel", runs: 22, balls: 15, sr: 146.7, onStrike: false },
    ],
    bowler: { name: "J. Bumrah", overs: "3.2", runs: 21, wickets: 2 },
  },
  {
    id: "upcoming1",
    status: "upcoming",
    tournament: "IPL 2026 · Final",
    teamA: { name: "Sunrisers Hyderabad", short: "SRH", color: "#D97757" },
    teamB: { name: "Mumbai Indians", short: "MI", color: "#3B82F6" },
    venue: "Narendra Modi Stadium, Ahmedabad",
    startsIn: "Sun, 21:30 IST",
  },
  {
    id: "done1",
    status: "completed",
    tournament: "IPL 2026 · Group stage",
    teamA: { name: "Chennai Super Kings", short: "CSK", runs: 189, wickets: 7, overs: 20, color: "#FBBF24" },
    teamB: { name: "Royal Challengers Bengaluru", short: "RCB", runs: 176, wickets: 9, overs: 20, color: "#DC2626" },
    venue: "M. A. Chidambaram Stadium, Chennai",
    result: "CSK won by 13 runs",
  },
];

export function getMatches() {
  return matches;
}

export function getMatchById(id) {
  return matches.find((m) => m.id === id);
}
