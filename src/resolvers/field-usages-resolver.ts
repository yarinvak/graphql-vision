import {getRepository} from 'typeorm';
import {TracingResult} from '../db/entities/tracing-result';

export const getFieldUsagesResolver = () => {
    return async () => {
        let fieldUsages: any = {};
        console.log("bla blabla");
        const tracingRepository = getRepository(TracingResult);
        const traces = await tracingRepository.find({});
        console.log("traces: " + JSON.stringify(traces));
        traces.forEach(trace => {
            let pathsTraveled = [];
            trace.execution.resolvers.forEach(resolver => {
                let path = mapPath(resolver.path);
                if (path == '') return;
                if (!fieldUsages[path]) {
                    fieldUsages[path] = {count: 1, duration: resolver.duration};
                } else {
                    if (pathsTraveled.indexOf(path) == -1) {
                        fieldUsages[path].count++;
                    }

                    fieldUsages[path].duration += resolver.duration;
                }
                pathsTraveled.push(path);
            });
        });

        return mapFieldUsages(fieldUsages);
    };
};

const mapFieldUsages = (usages: any) => {
    let fieldUsages = [];
    for (let key in usages) {
        fieldUsages.push({
            name: key,
            count: usages[key].count,
            averageDuration: Math.round(usages[key].duration / usages[key].count)
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

