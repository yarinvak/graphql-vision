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

const app = express();
const port = 4000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dashboard/build')));


app.get('/', (req, res) => res.send('Hello World'));

const server = new ApolloServer({typeDefs: [queryDef, mutationDef, tracingDef, fieldUsageDef], resolvers});

server.applyMiddleware({app});

app.listen(port, () => {
    console.log(`🚀  Server ready at http://localhost:4000`);
});

