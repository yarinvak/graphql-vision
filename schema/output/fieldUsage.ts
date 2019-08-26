import {gql} from 'apollo-server';

export const fieldUsageDef = gql`
    type FieldUsage {
        name: String
        count: Int
        averageDuration: Int
    }
`;