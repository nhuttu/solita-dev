import express from "express";
import journeysRouter from "./routes/journey.route";
import stationsRouter from "./routes/station.route";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stations", stationsRouter);
app.use("/journeys", journeysRouter);

export default app;
