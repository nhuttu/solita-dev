import { IJourney, IStation } from "./types";

const isISO8601 = (iso8601: string) => {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return iso8601Regex.test(iso8601);
};

const validateNumberAndLargerThan10 = (index: unknown): index is number => {
  return typeof index === "number" && !isNaN(index) && index > 10;
};

export const validateJourneyRow = (line: unknown): line is IJourney => {
  // FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

  // TODO: write validation for journey row
  console.log(line);
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
  console.log(line, "STATION");
  return true;
};
