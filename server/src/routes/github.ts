import { Router } from "express";
import { getContributions } from "../lib/github";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME!;
    const data = await getContributions(username);
    res.json(data);
  } catch (err) {
    console.error("GitHub error:", err);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

export default router;