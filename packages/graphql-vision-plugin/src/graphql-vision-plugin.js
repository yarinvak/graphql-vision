"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_request_1 = require("graphql-request");
var tracingRequest = "mutation($tracing: TracerInput) {\n  addTracing(tracing: $tracing)\n}";
var GraphQLVisionPlugin = (function () {
    function GraphQLVisionPlugin(endpointUrl) {
        GraphQLVisionPlugin.endpoint = endpointUrl;
    }
    GraphQLVisionPlugin.prototype.requestDidStart = function (_a) {
        return {
            willSendResponse: function (_a) {
                var response = _a.response;
                graphql_request_1.request(GraphQLVisionPlugin.endpoint, tracingRequest, { tracing: response.extensions.tracing }).then(function () {
                    console.log("success");
                }).catch(function (err) { return console.log(err); });
            }
        };
    };
    return GraphQLVisionPlugin;
}());
exports.default = GraphQLVisionPlugin;
