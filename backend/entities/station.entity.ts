import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number
    @Column("text")
    title: string
}