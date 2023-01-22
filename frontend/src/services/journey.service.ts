import axios from "axios";

export const fetch50Journeys = async (
  page: number,
  filters: {
    return: string;
    departure: string;
  }
) => {
  const response = await axios.get(
    `http://localhost:3000/journeys?page=${page}&departure=${filters.departure}&return=${filters.return}`
  );
  return response.data;
};

export const fetchJourneyById = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/journeys/${id}`);
  return response.data;
};
