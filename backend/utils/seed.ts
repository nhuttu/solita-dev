// Seeds the database if needed
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { validateJourneyRow, validateStationRow } from "./helpers";

export const seedDatabaseWithJournies = () => {
  // NOTE: hard coding the filename for dev purposes for now
  // OPTIMAL: fetch the files from bucket (e.g. AWS S3)
  const file = "2021-05.csv";
  let x = 0;
  let y = 0;
  createReadStream(file)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      const lest = validateJourneyRow(row);
      if (lest) {
        x++;
      } else {
        y++;
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      console.log(x, "TRUE");
      console.log(y, "FALSE");
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
