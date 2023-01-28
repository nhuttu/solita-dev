import { DataSource } from "typeorm";
import { JourneyEntity } from "../entities/journey.entity";
import { StationEntity } from "../entities/station.entity";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database:
    process.env.NODE_ENV === "test" ? "database-test.db" : "database.db",
  entities: [JourneyEntity, StationEntity],
  synchronize: true,
  logging: false,
});

// FOR PRODUCTION, DO NOT USE SQLITE
