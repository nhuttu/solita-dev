import express from "express";
import journeysRouter from "./routes/journey.route";
import stationsRouter from "./routes/station.route";
import cors from "cors";
import { AppDataSource } from "./database";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stations", stationsRouter);
app.use("/journeys", journeysRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Connection worked");
  })
  .catch((error) => console.log(error));

export default app;
