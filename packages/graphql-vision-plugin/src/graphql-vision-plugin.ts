import {request} from 'graphql-request';

const tracingRequest = `mutation($tracing: TracerInput!, $senderId: String) {
  addTracing(tracing: $tracing, senderId: $senderId)
}`;

export default class GraphQLVisionPlugin {
    static endpoint: string;
    static senderId: string;

    constructor(endpointUrl: string, senderId: string) {
        GraphQLVisionPlugin.endpoint = endpointUrl;
        GraphQLVisionPlugin.senderId = senderId;
    }

    requestDidStart({}) {
        return {
            willSendResponse({response}: { response: any }) {
                request(GraphQLVisionPlugin.endpoint, tracingRequest, {
                    tracing: response.extensions.tracing,
                    senderId: GraphQLVisionPlugin.senderId
                }).then(() => {
                }).catch(err => console.log(err));
            }
        }
    }
}
