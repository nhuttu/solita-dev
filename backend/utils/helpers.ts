import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";
import { IJourney, IStationEntry } from "./types";

const isISO8601 = (iso8601: string) => {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return iso8601Regex.test(iso8601);
};

const validateNumberAndNotLessThan10 = (index: unknown): index is number => {
  const num = Number(index);
  return !isNaN(num) && num > 9;
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

  const validateCoveredDistance = validateNumberAndNotLessThan10(line[6]);
  if (!validateCoveredDistance) return false;

  const validateJourneyDuration = validateNumberAndNotLessThan10(line[7]);
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

export const validateJourneyEntry = (obj: unknown): obj is IJourney => {
  if (typeof obj !== "object" || Object.keys(obj).length !== 6)
    throw new Error("Value provided was not an object or of correct length!");
  const journey = obj as IJourney;

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

  const validateCoveredDistance = validateNumberAndNotLessThan10(
    journey.coveredDistance
  );
  if (!validateCoveredDistance)
    throw new Error("Invalid covered distance type!");

  const validateDuration = validateNumberAndNotLessThan10(journey.duration);
  if (!validateDuration) throw new Error("Invalid duration type!");

  const validateDeparture = isISO8601(journey.departure);
  if (!validateDeparture) throw new Error("Invalid departure iso8601!");

  const validateReturn = isISO8601(journey.return);
  if (!validateReturn) throw new Error("Invalid return iso8601!");
  return true;
};

export const assignPropertiesToJourneyEntity = async (
  line: string[]
): Promise<JourneyEntity> => {
  const stationRepository = AppDataSource.getRepository(StationEntity);

  const departureStation = await stationRepository.findOne({
    where: { stationID: Number(line[2]) },
  });
  const returnStation = await stationRepository.findOne({
    where: { stationID: Number(line[4]) },
  });

  const newJourney = new JourneyEntity();
  newJourney.departure = line[0];
  newJourney.return = line[1];
  newJourney.coveredDistance = Number(line[6]);
  newJourney.duration = Number(line[7]);
  newJourney.departureStation = departureStation;
  newJourney.returnStation = returnStation;

  return newJourney;
};

export const assignPropertiesToStationEntity = (line: string[]) => {
  const stationEntity = new StationEntity();
  stationEntity.stationID = Number(line[1]);

  stationEntity.nameFI = line[2];
  stationEntity.nameSV = line[3];
  stationEntity.nameEN = line[4];

  stationEntity.addressFI = line[5];
  stationEntity.addressSV = line[6];

  stationEntity.cityFI = line[7].trim() === "" ? null : line[7];
  stationEntity.citySV = line[8].trim() === "" ? null : line[8];

  stationEntity.operator = line[9].trim() === "" ? null : line[9];
  stationEntity.capacity = Number(line[10]);
  stationEntity.coordinateX = Number(line[11]);
  stationEntity.coordinateY = Number(line[12]);

  return stationEntity;
};

export const validateStationEntry = (station: IStationEntry) => {
  if (!station.addressFI) throw new Error("Address FI was not provided!");
  if (!station.addressSV) throw new Error("Address EN was not provided!");

  if (!station.cityFI) throw new Error("City FI was not provided!");
  if (!station.citySV) throw new Error("City SV was not provided!");

  if (!station.nameEN) throw new Error("Name EN was not provided!");
  if (!station.nameFI) throw new Error("Name FI was not provided!");
  if (!station.nameSV) throw new Error("Name SV was not provided!");

  if (!station.operator) throw new Error("Operator was not provided!");
  if (!Number(station.coordinateX))
    throw new Error("Coordinate X was not provided!");
  if (!Number(station.coordinateY))
    throw new Error("Coordinate X was not provided!");

  if (!Number(station.capacity)) throw new Error("Capacity was not provided!");
};
