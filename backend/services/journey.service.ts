import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";

const journeyRepository = AppDataSource.getRepository(JourneyEntity);

const createJourney = () => {
  // TODO: Implement create
  console.log("Journey create");
};

const updateJourney = async (id: number) => {
  // TODO: Implement update
  const journeyEntity = await journeyRepository.findOne({ where: { id: id } });
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

const findJourneysWithPagination = async (pages: number) => {
  const PAGE_AMOUNT = 50;
  const journeys = await journeyRepository
    .createQueryBuilder("journey")
    .skip(PAGE_AMOUNT * pages)
    .take(PAGE_AMOUNT)
    .leftJoinAndSelect("journey.returnStation", "returnStation")
    .leftJoinAndSelect("journey.departureStation", "departureStation")
    .getMany();

  return journeys;
};

export default {
  createJourney,
  updateJourney,
  deleteJourney,
  findJourney,
  findJourneysWithPagination,
};
