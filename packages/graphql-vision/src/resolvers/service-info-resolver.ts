import {TracingResult} from "../db/entities/tracing-result";
import {getRepository} from "typeorm";

export const serviceInfoResolver = async (obj: any, args: any) => {
    const tracingRepository = getRepository(TracingResult);
    const traces = await tracingRepository.find({take: 1, order: {startTime: "DESC"}});
    return {url: 'http://localhost:4000/graphql', lastRequestTime: traces[0].startTime};
};