import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IJourney } from "../utils/types";

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
export class Journey implements IJourney {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departure: string;

  @Column()
  return: string;

  @Column()
  departureStationID: number;

  @Column()
  departureStationName: string;

  @Column()
  returnStationID: number;

  @Column()
  returnStationName: string;

  @Column()
  coveredDistance: number;

  @Column()
  duration: number;
}
