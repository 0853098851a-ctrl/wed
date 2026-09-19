const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "change-me";
const STALE_AFTER_MS = 30 * 1000; // ไม่มีข้อมูลใหม่เกิน 30 วินาที = ถือว่าออกจากเกมแล้ว

// เก็บในหน่วยความจำ: userId -> { name, items, updatedAt }
const players = new Map();

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

// Roblox ส่งข้อมูลมาที่นี่
app.post("/api/inventory", (req, res) => {
  if (req.get("x-api-key") !== API_KEY) {
    return res.status(401).json({ error: "รหัส x-api-key ไม่ถูกต้อง" });
  }

  const { userId, name, items } = req.body || {};
  if (typeof userId !== "number" || typeof name !== "string" || typeof items !== "object" || items === null) {
    return res.status(400).json({ error: "ข้อมูลไม่ครบ ต้องมี userId, name, items" });
  }

  // รับเฉพาะ ชื่อของ -> จำนวน (ตัวเลข) กันข้อมูลแปลกปลอม
  const clean = {};
  for (const [key, value] of Object.entries(items)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      clean[String(key).slice(0, 60)] = value;
    }
  }

  players.set(userId, { name: name.slice(0, 50), items: clean, updatedAt: Date.now() });
  res.json({ ok: true });
});

// หน้าเว็บดึงข้อมูลจากที่นี่
app.get("/api/inventory", (req, res) => {
  const cutoff = Date.now() - STALE_AFTER_MS;
  for (const [id, p] of players) {
    if (p.updatedAt < cutoff) players.delete(id);
  }
  const list = [...players.entries()].map(([userId, p]) => ({ userId, ...p }));
  res.json(list);
});

app.listen(PORT, () => console.log(`เปิดเว็บที่พอร์ต ${PORT}`));
