import VisionServer from "../index" ;
import "reflect-metadata";

const visionServer = new VisionServer();
visionServer.run({port: 4000, dbOptions: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Aa123456",
    database: "apollo-tracing"
}});