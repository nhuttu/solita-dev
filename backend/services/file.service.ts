import { parse } from "csv-parse";
import { PathLike } from "fs";
import { Readable } from "stream";
import { AppDataSource } from "../database";
import {
  assignPropertiesToJourneyEntity,
  validateCSVJourneyRow,
} from "../utils/helpers";
import { seedDatabaseWithJournies } from "../utils/seed";

const uploadJourneyCSVFile = async (file: string) => {
  const res = await seedDatabaseWithJournies(file);
  console.log("res", res);
  if (res) {
    return true;
  }
  return false;
};

export default { uploadJourneyCSVFile };
