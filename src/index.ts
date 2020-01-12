import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import {queryDef} from './schema/query';
import {mutationDef} from "./schema/mutation";
import {tracingDef} from "./schema/input/tracerInput";
import {
    GraphQLDateTime
} from 'graphql-iso-date';
import {IntString} from "./schema/scalars/intString";
import {fieldUsageDef} from "./schema/output/fieldUsage";
import {fieldUsageResolvers} from "./resolvers/field-usages-resolver";
import path from 'path';
import {ConnectionOptions, createConnection} from "typeorm";
import {addTrace} from "./resolvers/add-trace-resolver";
import {serviceInfoDef} from "./schema/output/service-info";
import {serviceInfoResolver} from "./resolvers/service-info-resolver";
import {senderIdsResolver} from "./resolvers/sender-ids-resolver";

interface VisionOptions {
    port: number;
    dbOptions: DBOptions;
}

interface DBOptions {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export default class VisionServer {
    resolvers: any;

    constructor() {
        this.resolvers = {
            DateTime: GraphQLDateTime,
            IntString: IntString,
            Query: {
                fieldUsages: fieldUsageResolvers,
                serviceInfo: serviceInfoResolver,
                senderIds: senderIdsResolver,
            },
            Mutation: {
                addTracing: addTrace
            }
        };
    }

    async run(options: VisionOptions) {
        const app = express();
        const dbOptions = options.dbOptions;
        await createConnection({
            ...dbOptions,
            entities: [
                __dirname + "/db/entities/*.js"
            ],
            synchronize: true,
        } as ConnectionOptions);

        console.log("connection created");

        // Serve the static files from the React app
        app.use('/', express.static(path.join(__dirname, 'dashboard/build')));

        const server = new ApolloServer({
            typeDefs: [queryDef, mutationDef, tracingDef, fieldUsageDef, serviceInfoDef],
            resolvers: this.resolvers
        });

        server.applyMiddleware({app});

        app.listen(options.port, () => {
            console.log(`🚀  Server ready at http://localhost:${options.port}`);
        });
    }
}
