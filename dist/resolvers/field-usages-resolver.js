"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldUsagesResolver = (dbHandler) => {
    return () => {
        let fieldUsages = {};
        dbHandler.db.traces.forEach(trace => {
            let pathsTraveled = [];
            trace.execution.resolvers.forEach(resolver => {
                let path = mapPath(resolver.path);
                if (path == '')
                    return;
                if (!fieldUsages[path]) {
                    fieldUsages[path] = { count: 1, duration: resolver.duration };
                }
                else {
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
const mapFieldUsages = (usages) => {
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
const mapPath = (pathArray) => {
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
