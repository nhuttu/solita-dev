import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";
import { IJourney } from "./types";

const isISO8601 = (iso8601: string) => {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return iso8601Regex.test(iso8601);
};

const validateNumberAndLargerThan10 = (index: unknown): index is number => {
  const num = Number(index);
  return !isNaN(num) && num > 10;
};

const validateNumberAndPositive = (index: unknown): index is number => {
  const num = Number(index);
  return !isNaN(num) && num > 0;
};

const validateTextAndNotTooLong = (index: unknown): index is string => {
  // NOTE: Just my educated guess that the station name shouldn't be longer than this
  return typeof index === "string" && index.length < 50;
};

/**
 * validateJourneyRow checks if the given line is a valid Journey row.
 * @param {unknown} line - The Journey row to be validated.
 * @returns {boolean} - Returns true if all the data in the line is valid, false otherwise.
 */
export const validateCSVJourneyRow = (line: unknown): boolean => {
  if (!Array.isArray(line) || line.length !== 8) return false;

  const departureIsISO8601 = isISO8601(line[0]);
  if (!departureIsISO8601) return false;

  const returnIsISO8601 = isISO8601(line[1]);
  if (!returnIsISO8601) return false;

  const validateDepartureStationID = validateNumberAndPositive(line[2]);
  if (!validateDepartureStationID) return false;

  const validateDepartureName = validateTextAndNotTooLong(line[3]);
  if (!validateDepartureName) return false;

  const validateReturnStationID = validateNumberAndPositive(line[4]);
  if (!validateReturnStationID) return false;

  const validateReturnStationName = validateTextAndNotTooLong(line[5]);
  if (!validateReturnStationName) return false;

  const validateCoveredDistance = validateNumberAndLargerThan10(line[6]);
  if (!validateCoveredDistance) return false;

  const validateJourneyDuration = validateNumberAndLargerThan10(line[7]);
  if (!validateJourneyDuration) return false;

  return true;
};

/**
 * validateStationRow checks if the given line is a valid Station row.
 * @param {unknown} line - The Station row to be validated.
 * @returns {boolean} - Returns true if all the data in the line is valid, false otherwise.
 */
export const validateCSVStationRow = (line: unknown): boolean => {
  if (!Array.isArray(line)) return false;
  // FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
  const validateStationID = validateNumberAndPositive(line[1]);
  if (!validateStationID) return false;

  const validateStationNameFI = validateTextAndNotTooLong(line[2]);
  const validateStationNameSV = validateTextAndNotTooLong(line[3]);
  const validateStationNameEN = validateTextAndNotTooLong(line[4]);

  if (
    !validateStationNameEN ||
    !validateStationNameFI ||
    !validateStationNameSV
  )
    return false;
  const validateCapacity = validateNumberAndPositive(line[10]);
  const validateCoordinateX = validateNumberAndPositive(line[11]);
  const validateCoordinateY = validateNumberAndPositive(line[12]);

  if (!validateCapacity || !validateCoordinateX || !validateCoordinateY)
    return false;

  return true;
};

export const checkIfStationsSeedIsNeeded = () => {
  return new Promise(async (resolve) => {
    try {
      const stationQuery = await AppDataSource.getRepository(
        StationEntity
      ).find({});

      if (stationQuery.length === 0) resolve(true);
    } catch (e) {
      resolve(false);
    }
  });
};

export const checkIfJourneySeedIsNeeded = () => {
  return new Promise(async (resolve) => {
    try {
      const journeyQuery = await AppDataSource.getRepository(
        JourneyEntity
      ).find({});

      if (journeyQuery.length === 0) resolve(true);
    } catch (e) {
      resolve(false);
    }
  });
};

export const validateIJourney = (obj: unknown): obj is IJourney => {
  if (typeof obj !== "object" || Object.keys(obj).length !== 6)
    throw new Error("Value provided was not an object or of correct length!");
  const journey = obj as IJourney;
  console.log(journey, "moi");
  const validateReturnStation = validateNumberAndPositive(
    journey.returnStationID
  );
  if (!validateReturnStation)
    throw new Error("Invalid return station ID type!");

  const validateDepartureStation = validateNumberAndPositive(
    journey.departureStationID
  );
  if (!validateDepartureStation)
    throw new Error("Invalid departure station ID type!");

  const validateCoveredDistance = validateNumberAndLargerThan10(
    journey.coveredDistance
  );
  if (!validateCoveredDistance)
    throw new Error("Invalid covered distance type!");

  const validateDuration = validateNumberAndLargerThan10(journey.duration);
  if (!validateDuration) throw new Error("Invalid duration type!");

  const validateDeparture = isISO8601(journey.departure);
  if (!validateDeparture) throw new Error("Invalid departure iso8601!");

  const validateReturn = isISO8601(journey.return);
  if (!validateReturn) throw new Error("Invalid return iso8601!");
  return true;
};
