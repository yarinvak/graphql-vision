"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var query_1 = require("./schema/query");
var mutation_1 = require("./schema/mutation");
var tracerInput_1 = require("./schema/input/tracerInput");
var graphql_iso_date_1 = require("graphql-iso-date");
var db_1 = require("./db/db");
var intString_1 = require("./schema/scalars/intString");
var fieldUsage_1 = require("./schema/output/fieldUsage");
var field_usages_resolver_1 = require("./resolvers/field-usages-resolver");
var dbHandler = new db_1.DBHandler();
dbHandler.db.traces = [];
var resolvers = {
    DateTime: graphql_iso_date_1.GraphQLDateTime,
    IntString: intString_1.IntString,
    Query: {
        fieldUsages: field_usages_resolver_1.getFieldUsagesResolver(dbHandler)
    },
    Mutation: {
        addTracing: function (obj, args) {
            dbHandler.db.traces.push(args.tracing);
            return true;
        }
    }
};
var server = new apollo_server_1.ApolloServer({ typeDefs: [query_1.queryDef, mutation_1.mutationDef, tracerInput_1.tracingDef, fieldUsage_1.fieldUsageDef], resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
