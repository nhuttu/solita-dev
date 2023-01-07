import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { iso8601 } from "../utils/types";
import { StationEntity } from "./station.entity";

// export interface IJourney {
//   departure: iso8601;
//   return: iso8601;
//   departureStationID: number;
//   departureStationName: string;
//   returnStationID: number;
//   returnStationName: string;
//   coveredDistance: number;
//   duration: number;
// }

@Entity()
export class JourneyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departure: iso8601;

  @Column()
  return: iso8601;

  @ManyToOne((type) => StationEntity)
  departureStation: StationEntity;

  @ManyToOne((type) => StationEntity)
  returnStation: StationEntity;

  @Column()
  coveredDistance: number;

  @Column()
  duration: number;
}
