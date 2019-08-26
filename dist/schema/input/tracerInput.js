"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.tracingDef = (_a = ["\n    scalar DateTime\n    scalar IntString\n    \n    input TracerInput {\n        version: Int,\n        startTime: DateTime,\n        endTime: DateTime,\n        duration: Int,\n        parsing: ProcessInfo,\n        validation: ProcessInfo,\n        execution: Execution\n    }\n\n    input Execution {\n        resolvers: [Resolver]\n    }\n\n    input Resolver{\n        path: [IntString],\n        parentType: String,\n        fieldName: String,\n        returnType: String,\n        startOffset: Int,\n        duration: Int\n    }\n\n    input ProcessInfo {\n        startOffset: Int,\n        duration: Int\n    }\n"], _a.raw = ["\n    scalar DateTime\n    scalar IntString\n    \n    input TracerInput {\n        version: Int,\n        startTime: DateTime,\n        endTime: DateTime,\n        duration: Int,\n        parsing: ProcessInfo,\n        validation: ProcessInfo,\n        execution: Execution\n    }\n\n    input Execution {\n        resolvers: [Resolver]\n    }\n\n    input Resolver{\n        path: [IntString],\n        parentType: String,\n        fieldName: String,\n        returnType: String,\n        startOffset: Int,\n        duration: Int\n    }\n\n    input ProcessInfo {\n        startOffset: Int,\n        duration: Int\n    }\n"], apollo_server_1.gql(_a));
var _a;
