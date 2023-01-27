import { IJourneyEntry, IStationEntry } from "./types";

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

export const validateNewStation = (station: IStationEntry): boolean => {
  if (!station.addressFI) return false;
  if (!station.addressSV) return false;

  if (!station.cityFI) return false;
  if (!station.citySV) return false;

  if (!station.nameEN) return false;
  if (!station.nameSV) return false;
  if (!station.nameFI) return false;

  if (!station.operator) return false;
  if (!Number(station.capacity)) return false;

  if (!Number(station.coordinateX)) return false;
  if (!Number(station.coordinateY)) return false;

  return true;
};
