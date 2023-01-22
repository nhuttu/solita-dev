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

// NOTE: Updating, deleting or creating stations are forbidden for now

export default { findStation, findStations };
