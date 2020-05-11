import {gql} from 'apollo-server';

export const timedUsageDef = gql`
    type TimedUsage {
        count: Int
        day: String
    }
`;
