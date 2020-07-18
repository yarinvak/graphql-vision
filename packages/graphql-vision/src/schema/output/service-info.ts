import {gql} from 'apollo-server';

export const serviceInfoDef = gql`
    type ServiceInfo {
        url: String
        lastRequestTime: DateTime
    }
`;