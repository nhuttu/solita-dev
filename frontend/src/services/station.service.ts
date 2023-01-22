import axios from "axios";
import { IStation } from "../utils/types";

export const fetchStations = async (): Promise<IStation[]> => {
  const response = await axios.get("http://localhost:3000/stations");

  return response.data;
};

export const fetchStationById = async (id: string): Promise<IStation> => {
  const response = await axios.get(`http://localhost:3000/stations/${id}`);

  return response.data;
};
