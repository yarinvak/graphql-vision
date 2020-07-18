import {getRepository} from "typeorm";
import {TracingResult} from "../db/entities/tracing-result";

export const senderIdsResolver = async (obj: any, args: any) => {
    const tracingRepository = getRepository(TracingResult);
    const senders =  await tracingRepository.find({select: ["senderId"]});
    return [...new Set(senders.map(x=>x.senderId))];
};
