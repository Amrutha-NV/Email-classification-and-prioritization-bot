// routes/phishing.js
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("✅ /phishing GET route reached");
  // Render the EJS view (using ejs-mate layout system)
  return res.render("phishing");
});

// POST /phishing/check
router.post("/check", (req, res) => {
  const { subject = "", body = "" } = req.body || {};
  const text = `${subject} ${body}`.toLowerCase();

  // keywords and weights (you can tune these)
  const keywords = [
    { k: "urgent", w: 0.08 },
    { k: "verify your account", w: 0.12 },
    { k: "bank", w: 0.06 },
    { k: "password", w: 0.07 },
    { k: "click here", w: 0.10 },
    { k: "security alert", w: 0.10 },
    { k: "credit card", w: 0.08 },
    { k: "reset your account", w: 0.12 },
    { k: "confirm your identity", w: 0.12 },
    { k: "update your info", w: 0.08 },
    { k: "you have won", w: 0.12 },
    { k: "lottery", w: 0.10 },
    { k: "claim reward", w: 0.10 },
  ];

  // find matches and compute a raw score (0..sum(weights))
  let rawScore = 0;
  const matches = [];
  for (const { k, w } of keywords) {
    if (text.includes(k)) {
      rawScore += w;
      matches.push(k);
    }
  }

  // Normalize score to 0..1 (max possible = sum of weights)
  const maxPossible = keywords.reduce((s, x) => s + x.w, 0);
  const score = Math.min(1, rawScore / maxPossible); // 0..1

  // heuristic verdict threshold
  const verdict = score >= 0.35 ? "phish" : "safe"; // tune threshold as desired
  const reason = matches.length
    ? `Detected suspicious keywords: ${matches.join(", ")}.`
    : "No suspicious keywords detected.";

  // Return JSON matching the frontend expectation:
  // { verdict: "phish"|"safe", score: number, reason: string }
  return res.json({
    verdict,
    score: Number(score.toFixed(2)),
    reason
  });
});

module.exports = router;
