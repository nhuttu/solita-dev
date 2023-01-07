import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { iso8601 } from "../utils/types";
import { StationEntity } from "./station.entity";

@Entity("journey")
export class JourneyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departure: iso8601;

  @Column()
  return: iso8601;

  // NOTE: make it explicit that the relation is not eager
  @ManyToOne((type) => StationEntity, { eager: false })
  departureStation: StationEntity;

  // NOTE: make it explicit that the relation is not eager
  @ManyToOne((type) => StationEntity, { eager: false })
  returnStation: StationEntity;

  @Column()
  coveredDistance: number;

  @Column()
  duration: number;
}
