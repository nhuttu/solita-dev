export type iso8601 = string;

export interface IJourney {
  id: number;
  departure: iso8601;
  return: iso8601;
  departureStation?: IStation;
  returnStation?: IStation;
  coveredDistance: number;
  duration: number;
}

export interface IJourneyEntry {
  departure: iso8601;
  return: iso8601;
  departureStationID: number;
  returnStationID: number;
  coveredDistance: number;
  duration: number;
}

export interface IStation {
  id: number;
  nameFI: string;
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

export interface IStationEntry {
  nameFI: string;
  nameEN: string;
  nameSV: string;
  addressFI: string;
  addressSV: string;
  cityFI: string;
  citySV: string;
  operator: string;
  capacity: number;
  coordinateX: number;
  coordinateY: number;
}
