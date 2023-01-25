import express from "express";
import stationService from "../services/station.service";
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

    if (!station.popularDepartures)
      station.popularDepartures =
        await stationService.findPopularDepartureStationsForStation(id);
    if (!station.popularReturns)
      station.popularReturns =
        await stationService.findPopularReturnStationsForStation(id);

    if (!station.averageDistanceBegun)
      station.averageDistanceBegun =
        await stationService.findAverageDistanceStartingFromStation(id);
    if (!station.averageDistanceEnded)
      station.averageDistanceEnded =
        await stationService.findAverageDistanceEndingAtStation(id);

    if (station) res.status(200).send(station);
    else
      res.status(404).send({ error: `Station with ID ${id} was not found ` });
  }
});

// NOTE: Updating, deleting or creating stations are forbidden for now
// router.post("/", (req, res) => {
//   res.send("STATIONS");
// });

// router.delete("/", (req, res) => {
//   res.send("STATIONS");
// });

export default router;
