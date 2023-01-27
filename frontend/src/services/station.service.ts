import axios from "axios";
import { IStation, IStationEntry } from "../utils/types";

export const fetchStations = async (): Promise<IStation[] | undefined> => {
  const response = await axios.get("http://localhost:3000/stations");

  return response.data;
};

export const fetchStationById = async (
  id: string
): Promise<IStation | undefined> => {
  const response = await axios.get(`http://localhost:3000/stations/${id}`);

  return response.data;
};

export const createStation = async (station: IStationEntry) => {
  const response = await axios.post(`http://localhost:3000/stations`, station);
  return response.data;
};

export const deleteStation = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/stations/${id}`);

  return response.data;
};
