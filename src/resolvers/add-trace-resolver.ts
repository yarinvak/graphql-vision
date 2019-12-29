import {TracingResult} from "../db/entities/tracing-result";
import {getRepository} from "typeorm";
export const addTrace = async (obj: any, args: any) => {
    const tracingRepository = getRepository(TracingResult);
    await tracingRepository.save({...args.tracing, senderUrl: "http://localhost:4000/graphql"});
    return true;
};
