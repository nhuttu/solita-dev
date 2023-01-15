import { AppDataSource } from "../database";
import { StationEntity } from "../entities/station.entity";

const stationRepository = AppDataSource.getRepository(StationEntity);
