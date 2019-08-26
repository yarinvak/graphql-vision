import {ApolloServer} from 'apollo-server';

import {queryDef} from './schema/query';
import {mutationDef} from "./schema/mutation";
import {tracingDef} from "./schema/input/tracerInput";
import {
    GraphQLDateTime
} from 'graphql-iso-date';
import {DBHandler} from "./db/db";
import {IntString} from "./schema/scalars/intString";
import {fieldUsageDef} from "./schema/output/fieldUsage";
import {getFieldUsagesResolver} from "./resolvers/field-usages-resolver";

const dbHandler: DBHandler = new DBHandler();
dbHandler.db.traces = [];

const resolvers: any = {
    DateTime: GraphQLDateTime,
    IntString: IntString,
    Query: {
        fieldUsages: getFieldUsagesResolver(dbHandler)
    },
    Mutation: {
        addTracing: (obj, args) => {
            dbHandler.db.traces.push(args.tracing);
            return true;
        }
    }
};

const server = new ApolloServer({typeDefs: [queryDef, mutationDef, tracingDef, fieldUsageDef], resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

