import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("STATIONS");
});

router.post("/", (req, res) => {
  res.send("STATIONS");
});

router.delete("/", (req, res) => {
  res.send("STATIONS");
});

export default router;
