import {DBHandler} from "../db/db";
export const getFieldUsagesResolver =  (dbHandler: DBHandler) => {
    return () => {
        let fieldUsages: any = {};
        dbHandler.db.traces.forEach(trace => {
            trace.execution.resolvers.forEach(resolver => {
                let path = mapPath(resolver.path);
                if (path == '') return;
                if (!fieldUsages[path]) {
                    fieldUsages[path] = {count: 1, duration: resolver.duration};
                }
                else {
                    fieldUsages[path].count++;
                    fieldUsages[path].duration += resolver.duration;
                }
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
        // if (!isNaN(path)) {
        //     return;
        // }
        newPath += '/';
        newPath += path;
    });
    return newPath;
};

