"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.mutationDef = apollo_server_1.gql `
    type Mutation {
        addTracing(tracing: TracerInput): Boolean
    }
`;
