import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("JOURNEYS");
});

router.post("/", (req, res) => {
  res.send("JOURNEYS");
});

router.delete("/", (req, res) => {
  res.send("JOURNEYS");
});

export default router;
