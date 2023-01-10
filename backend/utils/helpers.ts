import { IJourney, IStation } from "./types";

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

export const validateJourneyRow = (line: unknown): boolean => {
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

// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distaindexDuration (sec.)

// [
//   '2021-05-31T23:57:25',
//   '2021-06-01T00:05:46',
//   '094',
//   'Laajalahden aukio',
//   '100',
//   'Teljäntie',
//   '2043',
//   '500'
// ]
export const validateStationRow = (line: unknown): line is IStation => {
  // FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
  console.log(line, "STATION");
  return true;
};
