import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchesRouter from "./routes/matches.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/matches", matchesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`CreaseHub backend running on http://localhost:${PORT}`);
});
