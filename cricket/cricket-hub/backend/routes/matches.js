import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { getMatches, getMatchById } from "../data/matches.js";

const router = Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// GET /api/matches - list all matches
router.get("/", (req, res) => {
  res.json(getMatches());
});

// GET /api/matches/:id - single match detail
router.get("/:id", (req, res) => {
  const match = getMatchById(req.params.id);
  if (!match) return res.status(404).json({ error: "Match not found" });
  res.json(match);
});

// POST /api/matches/:id/insights - AI-generated analysis for a match
router.post("/:id/insights", async (req, res) => {
  const match = getMatchById(req.params.id);
  if (!match) return res.status(404).json({ error: "Match not found" });

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY" });
  }

  const context = buildMatchContext(match);
  const prompt = `You are a sharp cricket analyst. Given this match state, respond ONLY with valid JSON (no markdown fences, no preamble) matching exactly this shape:
{"winProbA": <int 0-100>, "winProbB": <int 0-100>, "keyMoment": "<one sentence on the pivotal passage of play or matchup>", "playerToWatch": "<player name>", "playerReason": "<one short clause why>", "hotTake": "<one punchy, opinionated one-liner about the match>"}
Team A is ${match.teamA.short}, Team B is ${match.teamB.short}. Base win probabilities on the actual match state described. If it's a completed match, winProb should reflect the actual result and hotTake should reflect on the match.
Match state: ${context}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((c) => c.type === "text");
    const clean = textBlock.text.replace(/```json|```/g, "").trim();
    const insight = JSON.parse(clean);
    res.json(insight);
  } catch (err) {
    console.error("AI insight generation failed:", err.message);
    res.status(502).json({ error: "Could not generate AI insights right now" });
  }
});

function buildMatchContext(match) {
  if (match.status === "live") {
    return `Live match: ${match.teamA.name} vs ${match.teamB.name}. ${match.teamA.short}: ${match.teamA.runs}/${match.teamA.wickets} in ${match.teamA.overs} overs. ${match.teamB.short}: ${match.teamB.runs}/${match.teamB.wickets} in ${match.teamB.overs} overs. ${match.target ? `Target: ${match.target}.` : ""} Current run rate: ${match.crr}. At crease: ${match.batsmen.map((b) => `${b.name} ${b.runs}(${b.balls})`).join(", ")}. Bowler: ${match.bowler.name} (${match.bowler.wickets}/${match.bowler.runs} in ${match.bowler.overs} overs). Venue: ${match.venue}.`;
  }
  if (match.status === "upcoming") {
    return `Upcoming match: ${match.teamA.name} vs ${match.teamB.name} at ${match.venue}, starts ${match.startsIn}.`;
  }
  return `Completed match: ${match.teamA.name} ${match.teamA.runs}/${match.teamA.wickets} vs ${match.teamB.name} ${match.teamB.runs}/${match.teamB.wickets}. Result: ${match.result}.`;
}

export default router;
