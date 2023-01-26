import { IJourneyEntry } from "./types";

export const isISO8601 = (iso8601: string) => {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return iso8601Regex.test(iso8601);
};

export const validateNewJourney = (journey: IJourneyEntry): boolean => {
  if (!isISO8601(journey.departure)) return false;
  if (!isISO8601(journey.return)) return false;

  if (journey.coveredDistance < 10) return false;
  if (journey.duration < 10) return false;

  if (!Number(journey.departureStationID)) return false;
  if (!Number(journey.returnStationID)) return false;

  return true;
};
