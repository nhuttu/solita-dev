import express from "express";
import stationService from "../services/station.service";

const router = express.Router();

router.get("/", async (req, res) => {
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
    const station = await stationService.findStation(id);
    console.log(station);
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
