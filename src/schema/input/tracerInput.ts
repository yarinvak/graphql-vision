import {gql} from 'apollo-server';

export const tracingDef = gql`
    scalar DateTime
    scalar IntString
    
    input TracerInput {
        version: Int,
        startTime: DateTime,
        endTime: DateTime,
        duration: Int,
        parsing: ProcessInfo,
        validation: ProcessInfo,
        execution: Execution
    }

    input Execution {
        resolvers: [Resolver]
    }

    input Resolver{
        path: [IntString],
        parentType: String,
        fieldName: String,
        returnType: String,
        startOffset: Int,
        duration: Int
    }

    input ProcessInfo {
        startOffset: Int,
        duration: Int
    }
`;