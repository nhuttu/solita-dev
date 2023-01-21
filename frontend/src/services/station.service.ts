import axios from "axios";

export const fetchStations = async () => {
  const response = await axios.get("http://localhost:3000/stations");

  return response.data;
};

export const fetchStationById = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/stations/${id}`);

  return response.data;
};
