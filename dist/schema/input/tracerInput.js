"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.tracingDef = apollo_server_1.gql `
    scalar DateTime
    scalar IntString
    
    input TracerInput {
        version: Int,
        startTime: DateTime,
        endTime: DateTime,
        duration: Int,
        parsing: ProcessInfo,
        validation: ProcessInfo,
        execution: Execution
    }

    input Execution {
        resolvers: [Resolver]
    }

    input Resolver{
        path: [IntString],
        parentType: String,
        fieldName: String,
        returnType: String,
        startOffset: Int,
        duration: Int
    }

    input ProcessInfo {
        startOffset: Int,
        duration: Int
    }
`;
