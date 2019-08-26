import {gql} from 'apollo-server';

export const queryDef = gql`    
    type Query {
        fieldUsages: [FieldUsage]
    }
`;