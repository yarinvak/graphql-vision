import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TracingResult {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "text", nullable: true})
    senderUrl: string;

    @Column("int")
    version: number;

    @Column("timestamp")
    startTime: string;

    @Column("timestamp")
    endTime: string;

    @Column("int")
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