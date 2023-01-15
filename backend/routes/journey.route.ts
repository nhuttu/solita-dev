import express from "express";

import journeyService from "../services/journey.service";

const router = express.Router();

router.get("/", async (req, res) => {
  const pages = Number(req.query.pages);
  if (isNaN(pages)) {
    res
      .status(400)
      .send({ error: "Pages was not provided or it was incorrect" });
  } else {
    const journeyEntries = await journeyService.findJourneysWithPagination(
      pages
    );
    res.status(200).send(journeyEntries);
  }
});

router.post("/", (req, res) => {
  res.send("JOURNEYS");
});

router.delete("/", (req, res) => {
  res.send("JOURNEYS");
});

export default router;
