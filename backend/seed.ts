// Seeds the database if needed
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { validateJourneyRow, validateStationRow } from "./utils/helpers";

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
