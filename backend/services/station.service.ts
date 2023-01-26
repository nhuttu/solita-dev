import { AppDataSource } from "../database";
import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";

const stationRepository = AppDataSource.getRepository(StationEntity);
const journeyRepository = AppDataSource.getRepository(JourneyEntity);

const findStations = async (): Promise<StationEntity[]> | null => {
  return await stationRepository.find({});
};

const findStation = async (id: number): Promise<StationEntity> | null => {
  let station = await stationRepository.findOne({
    where: { id: id },
  });

  return station;
};

const findJourneysStartedCount = async (id: number) => {
  return await journeyRepository.count({
    where: {
      departureStation: { id: id },
    },
  });
};

const findJourneysEndedCount = async (id: number) => {
  return await journeyRepository.count({
    where: {
      returnStation: { id: id },
    },
  });
};

const findPopularDepartureStationsForStation = async (
  id: number
): Promise<StationEntity[]> => {
  const result = await journeyRepository.query(
    `SELECT departure_station.*
    FROM journey
    LEFT JOIN station as departure_station ON journey.departureStationId = departure_station.id
    WHERE journey.returnStationId = ?
    GROUP BY journey.departureStationId
    ORDER BY COUNT(journey.id) DESC
    LIMIT 5`,
    [id]
  );

  return result;
};

// "select AVG(coveredDistance) from journey left join station as return_station  on journey.returnStationId = return_station.id where journey.returnStationId = 303"

const findPopularReturnStationsForStation = async (
  id: number
): Promise<StationEntity[]> => {
  const result = await journeyRepository.query(
    `SELECT return_station.*
    FROM journey
    LEFT JOIN station as return_station ON journey.returnStationId = return_station.id
    WHERE journey.departureStationId = ?
    GROUP BY journey.returnStationId
    ORDER BY COUNT(journey.id) DESC
    LIMIT 5`,
    [id]
  );

  return result;
};

const findAverageDistanceStartingFromStation = async (
  id: number
): Promise<number> => {
  const result = await journeyRepository
    .createQueryBuilder("journey")
    .select("AVG(journey.coveredDistance)", "avgCoveredDistance")
    .leftJoin("journey.returnStation", "return_station")
    .where("journey.returnStationId = :returnStationId", {
      returnStationId: id,
    })
    .getRawOne();

  return result.avgCoveredDistance;
};

const findAverageDistanceEndingAtStation = async (
  id: number
): Promise<number> => {
  const result = await journeyRepository
    .createQueryBuilder("journey")
    .select("AVG(journey.coveredDistance)", "avgCoveredDistance")
    .leftJoin("journey.departureStation", "departure_station")
    .where("journey.departureStationId = :departureStationId", {
      departureStationId: id,
    })
    .getRawOne();

  return result.avgCoveredDistance;
};

// NOTE: Updating, deleting or creating stations are forbidden for now

export default {
  findJourneysEndedCount,
  findJourneysStartedCount,
  findAverageDistanceStartingFromStation,
  findAverageDistanceEndingAtStation,
  findStation,
  findStations,
  findPopularDepartureStationsForStation,
  findPopularReturnStationsForStation,
};
