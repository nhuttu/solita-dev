type iso8601 = string;

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

// TODO: implement IStation
export interface IStation {}
