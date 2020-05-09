import {request} from 'graphql-request';
import {keepAliveInterval} from "./keep-alive-plugin";

const tracingRequest = `mutation($tracing: TracerInput!, $senderId: String) {
  addTracing(tracing: $tracing, senderId: $senderId)
}`;

export default class GraphQLVisionPlugin {
    static endpoint: string;
    static senderId: string;
    static keepAliveInterval: number;

    constructor(endpointUrl: string, senderId: string, keepAliveIntervalInMillis: number) {
        GraphQLVisionPlugin.endpoint = endpointUrl;
        GraphQLVisionPlugin.senderId = senderId;
        GraphQLVisionPlugin.keepAliveInterval = keepAliveIntervalInMillis;
        keepAliveInterval(keepAliveIntervalInMillis);
    }

    requestDidStart({}) {
        return {
            willSendResponse({response}: { response: any }) {
                request(GraphQLVisionPlugin.endpoint, tracingRequest, {
                    tracing: response.extensions.tracing,
                    senderId: GraphQLVisionPlugin.senderId
                }).then(() => {
                }).catch();
            }
        }
    }
}
