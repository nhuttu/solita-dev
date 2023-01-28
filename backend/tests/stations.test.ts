import app from "../app";
import supertest from "supertest";
import { AppDataSource } from "../database";

import path from "path";
import {
  seedDatabaseWithJournies,
  seedDatabaseWithStations,
} from "../utils/seed";

const api = supertest(app);

beforeAll(async () => {
  await AppDataSource.initialize();

  const csvFilePathStation = path.resolve(
    __dirname,
    "..",
    "tests",
    "data",
    "stations.csv"
  );

  const csvFilePathJourneys = path.resolve(
    __dirname,
    "..",
    "tests",
    "data",
    "journies.csv"
  );

  await seedDatabaseWithStations(csvFilePathStation);
  await seedDatabaseWithJournies(csvFilePathJourneys);
}, 30000);

afterAll(async () => {
  await AppDataSource.query("DROP TABLE journey;");
  await AppDataSource.query("DROP TABLE station;");
  await AppDataSource.destroy();
});

describe("Create endpoints test", () => {
  test("Station GET works", async () => {
    const stations = await api
      .get("/stations")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    // There is 457 rows in the Stations CSV.
    expect(stations.body.length).toEqual(457);
  }, 10000);
});
