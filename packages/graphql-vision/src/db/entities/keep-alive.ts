import {Column, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class KeepAlive {
    @PrimaryColumn({unique: true, type: "text"})
    senderId: string;

    @Column({type: "timestamp"})
    date: Date;
}