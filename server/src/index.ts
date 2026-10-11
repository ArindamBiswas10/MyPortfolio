import "dotenv/config";
import express from "express";
import helmet from "helmet";
import spotifyRouter from "./routes/spotify";
import githubRouter from "./routes/github";
import contactRouter from "./routes/contact";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1); // we'll sit behind Nginx / a load balancer
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});
app.use("/api/spotify", spotifyRouter);
app.use("/api/github", githubRouter);
app.use("/api/contact", contactRouter);

const clientDist = path.resolve(process.cwd(), "../client/dist");
app.use(express.static(clientDist));
app.use((_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});