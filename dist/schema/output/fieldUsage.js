"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.fieldUsageDef = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type FieldUsage {\n        name: String\n        count: Int\n        averageDuration: Int\n    }\n"], ["\n    type FieldUsage {\n        name: String\n        count: Int\n        averageDuration: Int\n    }\n"])));
var templateObject_1;
