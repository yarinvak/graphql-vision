import {getRepository} from 'typeorm';
import {TracingResult} from '../db/entities/tracing-result';

export const fieldUsageResolvers = async (obj: any, {senderId}: {senderId: string}) => {
    let fieldUsages: any = {};
    const tracingRepository = getRepository(TracingResult);
    let findOptions = {};
    if (senderId){
        findOptions = {where: {senderId: senderId}};
    }
    const traces = await tracingRepository.find(findOptions);
    traces.forEach(trace => {
        let pathsTraveled = [];
        trace.execution.resolvers.forEach(resolver => {
            let path = mapPath(resolver.path);
            if (path == '') return;
            if (!fieldUsages[path]) {
                fieldUsages[path] = {count: 1, duration: resolver.duration, lastRequestTime: trace.startTime};
            } else {
                if (pathsTraveled.indexOf(path) == -1) {
                    fieldUsages[path].count++;
                }
                if (trace.startTime > fieldUsages[path].lastRequestTime) {
                    fieldUsages[path].lastRequestTime = trace.startTime;
                }
                fieldUsages[path].duration += resolver.duration;
            }
            pathsTraveled.push(path);
        });
    });
    return mapFieldUsages(fieldUsages);
};

const mapFieldUsages = (usages: any) => {
    let fieldUsages = [];
    for (let key in usages) {
        fieldUsages.push({
            name: key,
            count: usages[key].count,
            averageDuration: Math.round(usages[key].duration / usages[key].count),
            lastRequestTime: usages[key].lastRequestTime,
        });
    }
    return fieldUsages;
};

const mapPath = (pathArray: any[]) => {
    if (!pathArray || pathArray.length == 0) {
        return '';
    }

    let newPath = '';
    pathArray.forEach(path => {
        if (!isNaN(path)) {
            return;
        }
        newPath += '/';
        newPath += path;
    });
    return newPath;
};
