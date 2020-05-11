import {getRepository} from "typeorm";
import {TracingResult} from "../db/entities/tracing-result";

export const timedUsagesResolver = async (obj: any, {senderId}: { senderId: string }) => {
    const tracingRepo = getRepository(TracingResult);
    let findOptions;
    if (senderId) {
        findOptions = {where: {senderId}};
    }

    const traces = await tracingRepo.find(findOptions);
    const days = {};
    traces.forEach(trace => {
        const day = new Date(trace.startTime).toDateString();
        if (days[day]) {
            days[day]++;
        } else {
            days[day] = 1;
        }
    });
    const arr = [];
    for (const key in days) {
        arr.push({day: key, count: days[key]});
    }
    return arr;
};
