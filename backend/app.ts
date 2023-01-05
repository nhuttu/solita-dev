import express  from "express";
import journeysRouter from "./routes/journey.route"
import stationsRouter from "./routes/station.route"
const app = express();

app.use(express.json())

app.use('/stations', stationsRouter)
app.use('/journeys', journeysRouter)

export default app;