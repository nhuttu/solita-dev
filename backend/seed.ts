// Seeds the database if needed
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { IJourney, IStation } from "./utils/types";

// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)

const validateJourneyRow = (line: unknown): line is IJourney => {
  // TODO: write validation for journey row
  console.log(line);
  return true;
};

const validateStationRow = (line: unknown): line is IStation => {
  // TODO: write validation for station row
  console.log(line);
  return true;
};

export const seedDatabaseWithJournies = () => {
  // NOTE: hard coding the filename for dev purposes for now
  // OPTIMAL: fetch the files from bucket (e.g. AWS S3)
  const file = "journies.csv";

  createReadStream(file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      validateJourneyRow(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
};

export const seedDatabaseWithStations = () => {
  // NOTE: hard coding the filename for dev purposes for now
  // OPTIMAL: fetch the files from bucket (e.g. AWS S3)
  const file = "stations.csv";

  createReadStream(file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      validateStationRow(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
};
