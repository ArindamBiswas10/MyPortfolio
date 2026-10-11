import { Router } from "express";
import { getLastPlayedTrack } from "../lib/spotify";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const track = await getLastPlayedTrack();
    res.json(track);
  } catch (err) {
    console.error("Spotify error:", err);
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
});

export default router;