import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { z } from "zod";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email.").max(200),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(2000, "Message is too long."),
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,                 // 5 messages per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ success: false, message: "Too many messages. Please try again later." });
  },
});

router.post("/", limiter, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
  }
  const { name, email, message } = parsed.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `Portfolio <${process.env.CONTACT_FROM}>`,
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `New portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) throw new Error(error.message);

    res.json({ success: true, message: "Message sent. I'll get back to you soon." });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false, message: "Couldn't send your message. Please try again." });
  }
});

export default router;