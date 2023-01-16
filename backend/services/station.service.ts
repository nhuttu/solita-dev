import { AppDataSource } from "../database";
import { StationEntity } from "../entities/station.entity";

const stationRepository = AppDataSource.getRepository(StationEntity);

const findStations = async (): Promise<StationEntity[]> | null => {
  return await stationRepository.find({});
};

const findStation = async (id: number): Promise<StationEntity> | null => {
  return await stationRepository.findOne({ where: { id: id } });
};

// NOTE: Updating, deleting or creating stations are forbidden for now

export default { findStation, findStations };
