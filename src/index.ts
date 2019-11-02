import {ApolloServer} from 'apollo-server-express';
import express from 'express';
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
import path from 'path';

interface VisionOptions{
    port: number;
}

export default class VisionServer {
    dbHandler: DBHandler;
    resolvers: any;

    constructor() {
        this.dbHandler = new DBHandler();
        this.dbHandler.db.traces = [];
        this.resolvers = {
            DateTime: GraphQLDateTime,
            IntString: IntString,
            Query: {
                fieldUsages: getFieldUsagesResolver(this.dbHandler)
            },
            Mutation: {
                addTracing: (obj: any, args: any) => {
                    this.dbHandler.db.traces.push(args.tracing);
                    return true;
                }
            }
        };
    }

    run(options: VisionOptions) {
        const app = express();

        // Serve the static files from the React app
        app.use('/', express.static(path.join(__dirname, 'dashboard/build')));

        const server = new ApolloServer({
            typeDefs: [queryDef, mutationDef, tracingDef, fieldUsageDef],
            resolvers: this.resolvers
        });

        server.applyMiddleware({app});

        app.listen(options.port, () => {
            console.log(`🚀  Server ready at http://localhost:${options.port}`);
        });
    }
}