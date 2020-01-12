import {TracingResult} from "../db/entities/tracing-result";
import {getRepository} from "typeorm";

export const addTrace = async (obj: any, {tracing, senderId}: { tracing: any, senderId: string }) => {
    if (tracing) {
        const tracingRepository = getRepository(TracingResult);
        await tracingRepository.save({...tracing, senderId: senderId});
        return true;
    } else {
        throw new Error("Tracing is undefined");
    }
};
