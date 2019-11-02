"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.queryDef = apollo_server_1.gql `    
    type Query {
        fieldUsages: [FieldUsage]
    }
`;
