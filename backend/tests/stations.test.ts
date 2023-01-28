import app from "../app";
import supertest from "supertest";
import { AppDataSource } from "../database";

import path from "path";
import {
  seedDatabaseWithJournies,
  seedDatabaseWithStations,
} from "../utils/seed";
import { IStationEntry } from "../utils/types";

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
    // There are 457 rows in the Stations CSV.
    expect(stations.body.length).toEqual(457);
  });

  test("Station CREATE works", async () => {
    const newStation: IStationEntry = {
      nameFI: "Oulun asema",
      nameEN: "Uleåborgs station",
      nameSV: "Oulu Station",
      addressFI: "Isokatu 87",
      addressSV: "Isokatu 87",
      cityFI: "Oulu",
      citySV: "Uleåborg",
      capacity: 35,
      coordinateX: 65.0121,
      coordinateY: 25.4651,
      operator: "Oulun kaupunki",
    };

    const stationCreate = await api
      .post("/stations")
      .send(newStation)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const getStation = await api
      .get(`/stations/${stationCreate.body.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect({ ...getStation.body, stationID: null }).toEqual(
      expect.objectContaining(stationCreate.body)
    );
  });
  test("Station CREATE with wrong object fails", async () => {
    const newStation = {
      nameEN: "Uleåborgs station",
      nameSV: "Oulu Station",
      addressFI: "Isokatu 87",
      addressSV: "Isokatu 87",
      cityFI: "Oulu",
      citySV: "Uleåborg",
      capacity: 35,
      coordinateX: 65.0121,
      coordinateY: 25.4651,
      operator: "Oulun kaupunki",
    };

    const stationCreate = await api
      .post("/stations")
      .send(newStation)
      .expect(400);

    expect(stationCreate.text).toContain("error");
  });

  test("Station DELETE works", async () => {
    const newStation: IStationEntry = {
      nameFI: "Oulun asema",
      nameEN: "Uleåborgs station",
      nameSV: "Oulu Station",
      addressFI: "Isokatu 87",
      addressSV: "Isokatu 87",
      cityFI: "Oulu",
      citySV: "Uleåborg",
      capacity: 35,
      coordinateX: 65.0121,
      coordinateY: 25.4651,
      operator: "Oulun kaupunki",
    };

    const stationCreate = await api
      .post("/stations")
      .send(newStation)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .delete(`/stations/${stationCreate.body.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const getDeleted = await api
      .get(`/stations/${stationCreate.body.id}`)
      .expect(404);
    expect(getDeleted.text).toContain("not found");
  }, 25000);
});
