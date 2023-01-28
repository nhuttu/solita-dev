import express from "express";
import journeysRouter from "./routes/journey.route";
import stationsRouter from "./routes/station.route";
import filesRouter from "./routes/file.route";
import cors from "cors";
import { AppDataSource } from "./database";
import morgan from "morgan";
import { seedDatabaseWithStations } from "./utils/seed";
import {
  checkIfStationsSeedIsNeeded,
  checkIfJourneySeedIsNeeded,
} from "./utils/helpers";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/stations", stationsRouter);
app.use("/journeys", journeysRouter);
app.use("/upload", filesRouter);

AppDataSource.initialize()
  .then(async () => {
    if (await checkIfStationsSeedIsNeeded()) {
      try {
        // await seedDatabaseWithStations("stations.csv");
      } catch (e) {
        console.log(
          e,
          "Something went wrong with the CSV file stations.csv read"
        );
      }
    }
    if (await checkIfJourneySeedIsNeeded()) {
      try {
        // await seedDatabaseWithJournies("2021-05.csv");
        // await seedDatabaseWithJournies("2021-06.csv");
        // await seedDatabaseWithJournies("2021-07.csv");
      } catch (e) {
        console.log(
          e,
          "One or more of the journey files was not present in the root directory!"
        );
      }
    }
  })
  .catch((error) => console.log(error));

export default app;
