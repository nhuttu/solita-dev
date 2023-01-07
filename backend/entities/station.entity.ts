import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stationID: number;

  @Column()
  nameFI: string;

  @Column()
  nameEN: string;

  @Column()
  addressEN: string;

  @Column()
  addressFI: string;

  @Column()
  nameSV: string;

  @Column()
  cityFI: string;

  @Column()
  citySV: string;

  @Column()
  operator: string;

  @Column()
  capacity: number;

  @Column()
  coordinateX: number;

  @Column()
  coordinateY: number;
}
