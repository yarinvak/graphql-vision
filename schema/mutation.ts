import {gql} from 'apollo-server';

export const mutationDef = gql`
    type Mutation {
        addTracing(tracing: TracerInput): Boolean
    }
`;