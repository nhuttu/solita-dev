// Seeds the database if needed
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";
import { validateCSVJourneyRow, validateCSVStationRow } from "./helpers";

const assignPropertiesToJourneyEntity = async (
  line: string[]
): Promise<JourneyEntity> => {
  const stationRepository = AppDataSource.getRepository(StationEntity);

  const departureStation = await stationRepository.findOne({
    where: { stationID: Number(line[2]) },
  });
  const returnStation = await stationRepository.findOne({
    where: { stationID: Number(line[4]) },
  });
  if (!departureStation || !returnStation) return null;

  const newJourney = new JourneyEntity();
  newJourney.departure = line[0];
  newJourney.return = line[1];
  newJourney.coveredDistance = Number(line[6]);
  newJourney.duration = Number(line[7]);
  newJourney.departureStation = departureStation;
  newJourney.returnStation = returnStation;

  return newJourney;
};
export const seedDatabaseWithJournies = (file: string) => {
  return new Promise((resolve) => {
    createReadStream(file)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const isValid = validateCSVJourneyRow(row);
        const journeyEntity = await assignPropertiesToJourneyEntity(row);
        if (isValid && journeyEntity) {
          try {
            await AppDataSource.query(
              "INSERT INTO journey (departure, return, coveredDistance, duration, returnStationId, departureStationId) VALUES (?, ?, ?, ?, ?, ?)",
              [
                journeyEntity.departure,
                journeyEntity.return,
                journeyEntity.coveredDistance,
                journeyEntity.duration,
                journeyEntity.returnStation.id,
                journeyEntity.departureStation.id,
              ]
            );
          } catch (e) {
            console.log(e, "Error in insert");
          }
        }
      })
      .on("end", () => {
        console.log(`Journey CSV ${file}  successfully processed`);
        resolve(true);
      });
  });
};

export const seedDatabaseWithStations = (file: string) => {
  return new Promise((resolve) => {
    createReadStream(file)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const validateRow = validateCSVStationRow(row);
        if (validateRow) {
          const stationEntity = assignPropertiesToStationEntity(row);

          try {
            await AppDataSource.query(
              "INSERT INTO station (stationID, nameFI, nameSV, nameEN, addressFI, addressSV, cityFI, citySV, operator, capacity, coordinateX, coordinateY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              Object.values(stationEntity)
            );
          } catch (e) {
            console.log(e, "Error in insert");
          }
        }
      })

      .on("end", () => {
        console.log(`Station CSV ${file}  successfully processed`);
        resolve(true);
      });
  });
};

const assignPropertiesToStationEntity = (line: string[]) => {
  // FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
  const stationEntity = new StationEntity();
  stationEntity.stationID = Number(line[1]);

  stationEntity.nameFI = line[2];
  stationEntity.nameSV = line[3];
  stationEntity.nameEN = line[4];

  stationEntity.addressFI = line[5];
  stationEntity.addressSV = line[6];

  stationEntity.cityFI = line[7];
  stationEntity.citySV = line[8];

  stationEntity.operator = line[9];
  stationEntity.capacity = Number(line[10]);
  stationEntity.coordinateX = Number(line[11]);
  stationEntity.coordinateY = Number(line[12]);

  return stationEntity;
};
