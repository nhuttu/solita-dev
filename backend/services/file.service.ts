import {
  seedDatabaseWithJournies,
  seedDatabaseWithStations,
} from "../utils/seed";

const uploadJourneyCSVFile = async (file: string) => {
  const res = await seedDatabaseWithJournies(file);
  if (res) {
    return true;
  }
  return false;
};

const uploadStationCSVFile = async (file: string) => {
  const res = await seedDatabaseWithStations(file);
  if (res) {
    return true;
  }
  return false;
};

export default { uploadJourneyCSVFile, uploadStationCSVFile };
