"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldUsagesResolver = function (dbHandler) {
    return function () {
        var fieldUsages = {};
        dbHandler.db.traces.forEach(function (trace) {
            trace.execution.resolvers.forEach(function (resolver) {
                var path = mapPath(resolver.path);
                if (path == '')
                    return;
                if (!fieldUsages[path]) {
                    fieldUsages[path] = { count: 1, duration: resolver.duration };
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
var mapFieldUsages = function (usages) {
    var fieldUsages = [];
    for (var key in usages) {
        fieldUsages.push({
            name: key,
            count: usages[key].count,
            averageDuration: Math.round(usages[key].duration / usages[key].count)
        });
    }
    return fieldUsages;
};
var mapPath = function (pathArray) {
    if (!pathArray || pathArray.length == 0) {
        return '';
    }
    var newPath = '';
    pathArray.forEach(function (path) {
        // if (!isNaN(path)) {
        //     return;
        // }
        newPath += '/';
        newPath += path;
    });
    return newPath;
};
