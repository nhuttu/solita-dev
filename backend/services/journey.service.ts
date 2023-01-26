import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";
import { IJourney } from "../utils/types";

const journeyRepository = AppDataSource.getRepository(JourneyEntity);
const stationRepository = AppDataSource.getRepository(StationEntity);

const createJourney = async (
  journey: IJourney
): Promise<JourneyEntity> | null => {
  const departureStation = await stationRepository.findOne({
    where: { id: Number(journey.departureStationID) },
  });
  const returnStation = await stationRepository.findOne({
    where: { id: Number(journey.returnStationID) },
  });

  if (!departureStation || !returnStation) return null;

  const journeyEntity = new JourneyEntity();

  journeyEntity.coveredDistance = journey.coveredDistance;
  journeyEntity.duration = journey.duration;

  journeyEntity.departure = journey.departure;
  journeyEntity.return = journey.return;

  journeyEntity.returnStation = returnStation;
  journeyEntity.departureStation = departureStation;

  return await journeyRepository.save(journeyEntity);
};

const updateJourney = async (id: number, journey: IJourney) => {
  const journeyEntity = await journeyRepository.findOne({ where: { id: id } });

  if (journeyEntity) {
  }

  console.log("Journey update");
};

const deleteJourney = async (id: number): Promise<JourneyEntity> | null => {
  const journeyEntity = await journeyRepository.findOne({ where: { id: id } });

  if (journeyEntity) {
    await journeyRepository.delete({ id: id });
    // Return deleted entity
    return journeyEntity;
  }

  return null;
};

const findJourney = async (id: number): Promise<JourneyEntity> | null => {
  const journeyEntity = await journeyRepository.findOne({
    relations: ["returnStation", "departureStation"],
    where: { id: id },
  });

  return journeyEntity;
};

const findJourneysWithPagination = async (
  page: number,
  returnFilter?: string,
  departureFilter?: string
): Promise<JourneyEntity[]> => {
  const PAGE_AMOUNT = 50;

  const journeys = await journeyRepository
    .createQueryBuilder("journey")
    .skip(PAGE_AMOUNT * page)
    .take(PAGE_AMOUNT)
    .leftJoinAndSelect("journey.returnStation", "returnStation")
    .leftJoinAndSelect("journey.departureStation", "departureStation")
    .where("departureStation.nameFI LIKE :departure", {
      departure: `%${departureFilter}%`,
    })
    .andWhere("returnStation.nameFI LIKE :return", {
      return: `%${returnFilter}%`,
    })
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
