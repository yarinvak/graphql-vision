import VisionServer from "../index" ;

const visionServer = new VisionServer();
visionServer.run({
    port: 4000, dbOptions: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "Aa123456",
        database: "apollo-tracing"
    }
}).then(() => console.log('started vision server')).catch(console.error);
