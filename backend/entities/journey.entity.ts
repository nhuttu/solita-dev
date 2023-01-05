import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Journey {
    @PrimaryGeneratedColumn()
    id: number

}