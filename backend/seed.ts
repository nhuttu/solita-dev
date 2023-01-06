// Seeds the database if needed
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { IJourney, IStation } from "./utils/types";

// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)

const validateJourneyRow = (line: unknown): line is IJourney => {
  console.log(line);
  return true;
};

const validateStationRow = (line: unknown): line is IStation => {
  console.log(line);
  return true;
};

export const seedJournies = () => {
  // NOTE: hard coding the filename for dev purposes
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

export const seedStations = () => {
  // NOTE: hard coding the filename for dev purposes
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
