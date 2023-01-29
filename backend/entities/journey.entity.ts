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
  // This cascade is questionable, this means all journeys related to StationEntity will be removed too
  @ManyToOne((type) => StationEntity, {
    eager: false,
    nullable: false,
    onDelete: "CASCADE",
  })
  departureStation: StationEntity;

  // NOTE: make it explicit that the relation is not eager
  // This cascade is questionable, this means all journeys related to StationEntity will be removed too
  // Which is definitely not ideal from a UX perspective
  @ManyToOne((type) => StationEntity, {
    eager: false,
    nullable: false,
    onDelete: "CASCADE",
  })
  returnStation: StationEntity;

  @Column()
  coveredDistance: number;

  @Column()
  duration: number;
}
