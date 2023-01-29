import path from "path";
import supertest from "supertest";
import app from "../app";
import { AppDataSource } from "../database";
import {
  seedDatabaseWithStations,
  seedDatabaseWithJournies,
} from "../utils/seed";
import { IJourneyEntry } from "../utils/types";

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

describe("Journey test scenarios", () => {
  test("Journey GET works", async () => {
    const stations = await api
      .get("/journeys?page=0&departure=&return=")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(stations.body.length).toEqual(50);
  });

  test("Journey GET works with pagination", async () => {
    const stationsAgain = await api
      .get("/journeys?page=1&departure=&return=")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(stationsAgain.body.length).toBeLessThan(50);
    expect(stationsAgain.body.length).toBeGreaterThan(0);
  });

  test("Journey GET works with pagination and filters", async () => {
    const station = await api
      .get("/journeys?page=0&departure=Karhupuisto&return=Venttiilikuja")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(station.body.length).toEqual(1);
    expect(station.body[0].departureStation.nameFI).toEqual("Karhupuisto");
    expect(station.body[0].returnStation.nameFI).toEqual("Venttiilikuja");
    expect;
  });

  test("Journey CREATE works", async () => {
    const newJourney: IJourneyEntry = {
      departure: "2015-05-05T23:50:25",
      return: "2015-05-05T23:50:45",
      departureStationID: 2,
      returnStationID: 2,
      coveredDistance: 100,
      duration: 20,
    };

    const createJourney = await api
      .post("/journeys")
      .send(newJourney)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const getJourney = await api.get(`/journeys/${createJourney.body.id}`);

    expect(newJourney.departureStationID).toEqual(
      getJourney.body.departureStation.id
    );
    expect(newJourney.returnStationID).toEqual(
      getJourney.body.returnStation.id
    );
  });

  test("Journey DELETE works", async () => {
    const newJourney: IJourneyEntry = {
      departure: "2015-05-05T23:50:25",
      return: "2015-05-05T23:50:45",
      departureStationID: 2,
      returnStationID: 2,
      coveredDistance: 100,
      duration: 20,
    };

    const createJourney = await api
      .post("/journeys")
      .send(newJourney)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .delete(`/journeys/${createJourney.body.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const getDeletedJourney = await api
      .get(`/journeys/${createJourney.body.id}`)
      .expect(404);

    expect(getDeletedJourney.text).toContain("not found");
  });

  test("Journey CREATE fails with wrong input", async () => {
    const newJourney = {
      departure: "2015-05-05T23:50:25",
      // Incorrect return
      return: "2015-05-305T23:50:45",
      departureStationID: 2,
      returnStationID: 2,
      coveredDistance: 100,
      duration: 20,
    };

    const createJourney = await api
      .post("/journeys")
      .send(newJourney)
      .expect(400);

    expect(createJourney.text).toContain("Invalid return iso8601!");
  });
});
