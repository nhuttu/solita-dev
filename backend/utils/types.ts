export type iso8601 = string;

export interface IJourney {
  departure: iso8601;
  return: iso8601;
  departureStationID: number;
  returnStationID: number;
  coveredDistance: number;
  duration: number;
}

// FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

export interface IStation {
  stationID: number;
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
}
