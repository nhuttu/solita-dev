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

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
