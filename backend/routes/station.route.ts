import express from "express";
import stationService from "../services/station.service";
import { validateStationEntry } from "../utils/helpers";
import { IStation } from "../utils/types";

const router = express.Router();

router.get("/", async (_req, res) => {
  const stations = await stationService.findStations();
  res.status(200).send(stations);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res
      .status(404)
      .send({ error: `Parameter provided was not a valid number ` });
  } else {
    const station = (await stationService.findStation(id)) as IStation;

    station.popularDepartures =
      await stationService.findPopularDepartureStationsForStation(id);

    station.popularReturns =
      await stationService.findPopularReturnStationsForStation(id);

    station.averageDistanceBegun =
      await stationService.findAverageDistanceStartingFromStation(id);

    station.averageDistanceEnded =
      await stationService.findAverageDistanceEndingAtStation(id);

    station.journeysEnded = await stationService.findJourneysStartedCount(id);

    station.journeysEnded = await stationService.findJourneysEndedCount(id);

    if (station) res.status(200).send(station);
    else
      res.status(404).send({ error: `Station with ID ${id} was not found ` });
  }
});

router.post("/", async (req, res) => {
  try {
    validateStationEntry(req.body);
    const station = await stationService.createStation(req.body);
    res.status(200).send(station);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({ error: "ID was not of valid type" });
  } else {
    const station = await stationService.deleteStation(id);
    if (station) res.status(200).send(station);
    else
      res.status(404).send({ error: `Station with ID ${id} was not found ` });
  }
});

export default router;
