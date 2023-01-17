import express from "express";

import journeyService from "../services/journey.service";
import { validateIJourney } from "../utils/helpers";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = Number(req.query.pages);
  if (isNaN(page)) {
    res
      .status(400)
      .send({ error: "Pages was not provided or it was incorrect" });
  } else {
    const journeyEntries = await journeyService.findJourneysWithPagination(
      page
    );
    res.status(200).send(journeyEntries);
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ error: "ID was not of valid type" });
  } else {
    const journey = await journeyService.findJourney(id);
    if (journey) res.status(200).send(journey);
    else
      res.status(404).send({ error: `Journey with ID ${id} was not found ` });
  }
});

router.post("/", async (req, res) => {
  try {
    validateIJourney(req.body);
    const journey = await journeyService.createJourney(req.body);
    res.status(200).send(journey);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ error: "ID was not of valid type" });
  } else {
    const journey = await journeyService.deleteJourney(id);
    if (journey) res.status(200).send(journey);
    else
      res.status(404).send({ error: `Journey with ID ${id} was not found ` });
  }
});

router.put("/:id", (req, res) => {
  res.send("JOURNEYS");
});

export default router;
