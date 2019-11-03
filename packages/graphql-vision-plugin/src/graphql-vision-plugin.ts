import {request} from 'graphql-request';

const tracingRequest = `mutation($tracing: TracerInput) {
  addTracing(tracing: $tracing)
}`;

export default class GraphQLVisionPlugin {
    static endpoint: string;

    constructor(endpointUrl: string) {
        GraphQLVisionPlugin.endpoint = endpointUrl;
    }

    requestDidStart({}) {
        return {
            willSendResponse({response}: { response: any }) {
                request(GraphQLVisionPlugin.endpoint, tracingRequest, {tracing: response.extensions.tracing}).then(() => {
                    console.log("success")
                }).catch(err => console.log(err));
            }
        }
    }
}