import {gql} from 'apollo-server';

export const queryDef = gql`    
    type Query {
        fieldUsages(senderId: String): [FieldUsage]
        serviceInfo: ServiceInfo
        senderIds: [String]
        keepAlive(senderId: String!): Boolean
    }
`;
