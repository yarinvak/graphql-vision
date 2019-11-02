"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.fieldUsageDef = apollo_server_1.gql `
    type FieldUsage {
        name: String
        count: Int
        averageDuration: Int
    }
`;
