import axios from "axios";

export const uploadJourneyCSVFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(
    "http://localhost:3003/upload/journey",
    formData,
    {
      headers: {
        "Content-Type": "text/csv",
      },
    }
  );
  console.log(res);
  return res.data;
};

export const uploadStationCSVFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(
    "http://localhost:3003/upload/station",
    formData,
    {
      headers: {
        "Content-Type": "text/csv",
      },
    }
  );
  console.log(res);
  return res.data;
};
