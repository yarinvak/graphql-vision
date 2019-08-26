"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var MAX_INT = 2147483647;
var MIN_INT = -2147483648;
var coerceIntString = function (value) {
    if (Array.isArray(value)) {
        throw new TypeError("IntString cannot represent an array value: [" + String(value) + "]");
    }
    if (!isNaN(value)) {
        if (value < MIN_INT || value > MAX_INT) {
            throw new TypeError("Value is integer but outside of valid range for 32-bit signed integer: " + String(value));
        }
        return value;
    }
    return String(value);
};
exports.IntString = new graphql_1.GraphQLScalarType({
    name: 'IntString',
    serialize: coerceIntString,
    parseValue: coerceIntString,
    parseLiteral: function (ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return coerceIntString(parseInt(ast.value, 10));
        }
        if (ast.kind === graphql_1.Kind.STRING) {
            return ast.value;
        }
        return undefined;
    }
});
