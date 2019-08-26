"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.tracingDef = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    scalar DateTime\n    scalar IntString\n    \n    input TracerInput {\n        version: Int,\n        startTime: DateTime,\n        endTime: DateTime,\n        duration: Int,\n        parsing: ProcessInfo,\n        validation: ProcessInfo,\n        execution: Execution\n    }\n\n    input Execution {\n        resolvers: [Resolver]\n    }\n\n    input Resolver{\n        path: [IntString],\n        parentType: String,\n        fieldName: String,\n        returnType: String,\n        startOffset: Int,\n        duration: Int\n    }\n\n    input ProcessInfo {\n        startOffset: Int,\n        duration: Int\n    }\n"], ["\n    scalar DateTime\n    scalar IntString\n    \n    input TracerInput {\n        version: Int,\n        startTime: DateTime,\n        endTime: DateTime,\n        duration: Int,\n        parsing: ProcessInfo,\n        validation: ProcessInfo,\n        execution: Execution\n    }\n\n    input Execution {\n        resolvers: [Resolver]\n    }\n\n    input Resolver{\n        path: [IntString],\n        parentType: String,\n        fieldName: String,\n        returnType: String,\n        startOffset: Int,\n        duration: Int\n    }\n\n    input ProcessInfo {\n        startOffset: Int,\n        duration: Int\n    }\n"])));
var templateObject_1;
