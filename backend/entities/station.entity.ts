import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("station")
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

  @Column({ nullable: true })
  cityFI?: string;

  @Column({ nullable: true })
  citySV?: string;

  @Column({ nullable: true })
  operator?: string;

  @Column()
  capacity: number;

  @Column()
  coordinateX: number;

  @Column()
  coordinateY: number;
}
