import VisionServer from "../index" ;
import "reflect-metadata";

const visionServer = new VisionServer();
visionServer.run({port: 4000});