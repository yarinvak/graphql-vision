"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const query_1 = require("./schema/query");
const mutation_1 = require("./schema/mutation");
const tracerInput_1 = require("./schema/input/tracerInput");
const graphql_iso_date_1 = require("graphql-iso-date");
const db_1 = require("./db/db");
const intString_1 = require("./schema/scalars/intString");
const fieldUsage_1 = require("./schema/output/fieldUsage");
const field_usages_resolver_1 = require("./resolvers/field-usages-resolver");
const path_1 = __importDefault(require("path"));
class VisionServer {
    constructor() {
        this.dbHandler = new db_1.DBHandler();
        this.dbHandler.db.traces = [];
        this.resolvers = {
            DateTime: graphql_iso_date_1.GraphQLDateTime,
            IntString: intString_1.IntString,
            Query: {
                fieldUsages: field_usages_resolver_1.getFieldUsagesResolver(this.dbHandler)
            },
            Mutation: {
                addTracing: (obj, args) => {
                    this.dbHandler.db.traces.push(args.tracing);
                    return true;
                }
            }
        };
    }
    run(port) {
        const app = express_1.default();
        // Serve the static files from the React app
        app.use('/', express_1.default.static(path_1.default.join(__dirname, 'dashboard/build')));
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: [query_1.queryDef, mutation_1.mutationDef, tracerInput_1.tracingDef, fieldUsage_1.fieldUsageDef],
            resolvers: this.resolvers
        });
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(`🚀  Server ready at http://localhost:4000`);
        });
    }
}
exports.default = VisionServer;
