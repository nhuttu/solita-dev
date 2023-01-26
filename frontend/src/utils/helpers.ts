import { INewJourney } from "./types";

export const isISO8601 = (iso8601: string) => {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return iso8601Regex.test(iso8601);
};

export const validateNewJourney = (journey: INewJourney): boolean => {
  console.log("asd");
  if (!isISO8601(journey.departure)) return false;
  if (!isISO8601(journey.return)) return false;
  console.log("asd3");

  if (journey.coveredDistance < 10) return false;
  if (journey.duration < 10) return false;
  console.log("asd4");

  if (!Number(journey.departureStationID)) return false;
  if (!Number(journey.returnStationID)) return false;

  return true;
};
