import express from "express";
import journeysRouter from "./routes/journey.route";
import stationsRouter from "./routes/station.route";
import filesRouter from "./routes/file.route";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./database";

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
  .then(() => console.log("DB iniatilized!"))
  .catch(() => console.log("DB init failed!"));

export default app;
