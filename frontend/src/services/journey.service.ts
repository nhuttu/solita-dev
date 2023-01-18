import axios from "axios";

export const fetch50Journeys = async (page: number) => {
  const response = await axios.get(
    `http://localhost:3000/journeys?page=${page}`
  );
  return response.data;
};
