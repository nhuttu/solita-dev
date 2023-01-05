import { DataSource } from "typeorm";
import { Journey } from "../entities/journey.entity";
import { Station } from "../entities/station.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.db",
  entities: [Journey, Station],
  synchronize: true,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
