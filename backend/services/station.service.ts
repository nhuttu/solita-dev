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

  station.journeysStarted = await journeyRepository.count({
    where: {
      departureStation: { id: station.id },
    },
  });

  station.journeysEnded = await journeyRepository.count({
    where: {
      returnStation: { id: station.id },
    },
  });

  return station;
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

// NOTE: Updating, deleting or creating stations are forbidden for now

export default {
  findStation,
  findStations,
  findPopularDepartureStationsForStation,
  findPopularReturnStationsForStation,
};
