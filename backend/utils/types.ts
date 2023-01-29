import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";

export type iso8601 = string;

export interface IJourney extends JourneyEntity {
  id: number;
  departure: iso8601;
  return: iso8601;
  departureStationID: number;
  returnStationID: number;
  coveredDistance: number;
  duration: number;
}

// FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

export interface IStation extends StationEntity {
  id: number;
  nameFI: string;
  stationID?: number;
  nameEN: string;
  nameSV: string;
  addressFI: string;
  addressSV: string;
  cityFI?: string;
  citySV?: string;
  operator?: string;
  capacity: number;
  coordinateX: number;
  coordinateY: number;
  journeysStarted?: number;
  journeysEnded?: number;
  popularReturns?: IStation[];
  popularDepartures?: IStation[];
  averageDistanceBegun?: number;
  averageDistanceEnded?: number;
}

export type IStationEntry = Omit<IStation, "id">;

export type IJourneyEntry = Omit<
  IJourney,
  "id" | "departureStation" | "returnStation"
>;
