import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TracingResult {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "text", nullable: true})
    senderId: string;

    @Column({type: "int", nullable: true})
    version: number;

    @Column("timestamp")
    startTime: string;

    @Column("timestamp")
    endTime: string;

    @Column("bigint")
    duration: number;

    @Column({type: "simple-json", nullable: true})
    parsing: {
        startOffset: number;
        duration: number;
    };

    @Column({type: "simple-json", nullable: true})
    validation: {
        startOffset: number;
        duration: number;
    };

    @Column({type: "simple-json", nullable: true})
    execution: {
        resolvers: {
            path: string[];
            parentType: string;
            fieldName: string;
            returnType: string;
            startOffset: number;
            duration: number;
        }[];
    };
}
