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
            async willSendResponse({response}: { response: any }) {
                const tracing = response?.extensions?.tracing;
                if (!tracing) {
                    throw new Error("Cannot send tracing results to GraphQL-Vision server because tracing is undefined! Please set `tracing: true` in your apollo-server configuration");
                }
                try {
                    await request(GraphQLVisionPlugin.endpoint, tracingRequest, {
                        tracing,
                        senderId: GraphQLVisionPlugin.senderId
                    });
                } catch (e) {
                    console.warn(`Could not send a request to the GraphQL-Vision server. Is your server available for requests? ${e}`)
                }
            }
        }
    }
}
