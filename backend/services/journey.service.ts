import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";

const journeyRepository = AppDataSource.getRepository(JourneyEntity);

const createJourney = () => {
  // TODO: Implement create
  console.log("Journey create");
};

const updateJourney = () => {
  // TODO: Implement update
  console.log("Journey update");
};

const deleteJourney = async (id: number): Promise<JourneyEntity | null> => {
  const journeyEntity = await journeyRepository.findOne({ where: { id: id } });

  if (journeyEntity) {
    await journeyRepository.delete({ id: id });
    // Return deleted entity
    return journeyEntity;
  }

  return null;
};

const findJourney = async (id: number): Promise<JourneyEntity | null> => {
  const journeyEntity = await journeyRepository.findOne({ where: { id: id } });

  return journeyEntity;
};

const findJourneys = (page?: number) => {
  // TODO: Implement multi-find
  const PAGE_AMOUNT = 50;
  if (page) {
    // TODO: Query the database between page * PAGE_AMOUNT to page * PAGE_AMOUNT + PAGE_AMOUNT for frontend "infinite" query
  }
  // NOTE: if page parameter is not present, perhaps return the first 50 only.
  console.log("Journeys find");
};

export default {
  createJourney,
  updateJourney,
  deleteJourney,
  findJourney,
  findJourneys,
};
