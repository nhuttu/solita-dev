import express from "express";
import journeysRouter from "./routes/journey.route";
import stationsRouter from "./routes/station.route";
import cors from "cors";
import { AppDataSource } from "./database";
import {
  seedDatabaseWithJournies,
  seedDatabaseWithStations,
} from "./utils/seed";
import {
  checkIfStationsSeedIsNeeded,
  checkIfJourneySeedIsNeeded,
} from "./utils/helpers";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stations", stationsRouter);
app.use("/journeys", journeysRouter);

AppDataSource.initialize()
  .then(async () => {
    if (await checkIfStationsSeedIsNeeded()) {
      await seedDatabaseWithStations("stations.csv");
    }
    if (await checkIfJourneySeedIsNeeded()) {
      await seedDatabaseWithJournies("2021-05.csv");
      await seedDatabaseWithJournies("2021-06.csv");
      await seedDatabaseWithJournies("2021-07.csv");
    }
  })
  .catch((error) => console.log(error));

export default app;
