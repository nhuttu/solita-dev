// Seeds the database if needed
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { AppDataSource } from "../database";
import {
  assignPropertiesToJourneyEntity,
  assignPropertiesToStationEntity,
  validateCSVJourneyRow,
  validateCSVStationRow,
} from "./helpers";

export const seedDatabaseWithJournies = (file: string) => {
  let validCount = 0;
  return new Promise((resolve) => {
    createReadStream(file)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const isValid = validateCSVJourneyRow(row);
        const journeyEntity =
          isValid && (await assignPropertiesToJourneyEntity(row));
        if (isValid && journeyEntity) {
          validCount++;
          try {
            await AppDataSource.query(
              "INSERT INTO journey (departure, return, coveredDistance, duration, returnStationId, departureStationId) VALUES (?, ?, ?, ?, ?, ?)",
              [
                journeyEntity.departure,
                journeyEntity.return,
                journeyEntity.coveredDistance,
                journeyEntity.duration,
                journeyEntity.returnStation?.id,
                journeyEntity.departureStation?.id,
              ]
            );
          } catch (e) {
            console.log(e, "Error in insert");
          }
        }
      })
      .on("end", () => {
        if (validCount) {
          resolve(true);
          console.log(`Journey CSV ${file}  successfully processed`);
        } else resolve(false);
      });
  });
};

export const seedDatabaseWithStations = (file: string) => {
  let validCount = 0;
  return new Promise((resolve) => {
    createReadStream(file)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const validateRow = validateCSVStationRow(row);
        if (validateRow) {
          validCount++;
          const stationEntity = assignPropertiesToStationEntity(row);

          try {
            await AppDataSource.query(
              "INSERT INTO station (id, nameFI, nameSV, nameEN, addressFI, addressSV, cityFI, citySV, operator, capacity, coordinateX, coordinateY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              Object.values(stationEntity)
            );
          } catch (e) {
            console.log(e, "Error in insert");
          }
        }
      })

      .on("end", () => {
        if (validCount) {
          console.log(`Station CSV ${file}  successfully processed`);
          resolve(true);
        } else resolve(false);
      });
  });
};
