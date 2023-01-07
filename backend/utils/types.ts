export type iso8601 = string;

export interface IJourney {
  departure: iso8601;
  return: iso8601;
  departureStationID: number;
  departureStationName: string;
  returnStationID: number;
  returnStationName: string;
  coveredDistance: number;
  duration: number;
}

// FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y

export interface IStation {
  // not sure if FID is necessary.. it shouldn't be
  stationID: number;
  nameFI: string;
  nameEN: string;
  nameSV: string;
  addressFI: string;
  addressEN: string;
  cityFI: string;
  citySV: string;
  operator: string;
  capacity: number;
  coordinateX: number;
  coordinateY: number;
}
