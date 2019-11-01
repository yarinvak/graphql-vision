import {ApolloServer} from 'apollo-server-express';
const express = require('express');
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
const path = require('path');
import {addTrace} from "./resolvers/add-trace-resolver";
import {createConnection} from "typeorm";



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
                fieldUsages: getFieldUsagesResolver
            },
            Mutation: {
                addTracing: addTrace
            }
        };
    }

    async run(port: number) {
        const app = express();

        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "Aa123456",
            database: "apollo-tracing",
            entities: [
                __dirname + "/db/entities/*.js"
            ],
            synchronize: true,
        });

        console.log("connection created");

        // Serve the static files from the React app
        app.use(express.static(path.join(__dirname, 'dashboard/build')));


        app.get('/', (req, res) => res.send('Hello World'));

        const server = new ApolloServer({
            typeDefs: [queryDef, mutationDef, tracingDef, fieldUsageDef],
            resolvers: this.resolvers
        });

        server.applyMiddleware({app});

        app.listen(port, () => {
            console.log(`🚀  Server ready at http://localhost:4000`);
        });

    }
}