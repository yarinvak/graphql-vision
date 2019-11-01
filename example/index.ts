import VisionServer from "../src/index" ;
import "reflect-metadata";

const visionServer = new VisionServer();

visionServer.run(4000).then(console.log("running")).catch(err=> console.log(err));