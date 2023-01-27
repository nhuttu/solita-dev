import axios from "axios";
import { IJourney, IJourneyEntry } from "../utils/types";

export const fetch50Journeys = async (
  page: number,
  filters: {
    return: string;
    departure: string;
  }
): Promise<IJourney[]> => {
  const response = await axios.get(
    `http://localhost:3000/journeys?page=${page}&departure=${filters.departure}&return=${filters.return}`
  );
  return response.data;
};

export const fetchJourneyById = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/journeys/${id}`);

  return response.data;
};

export const createJourney = async (journey: IJourneyEntry) => {
  const response = await axios.post(`http://localhost:3000/journeys`, journey);

  return response.data;
};

export const deleteJourney = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/journeys/${id}`);

  return response.data;
};
