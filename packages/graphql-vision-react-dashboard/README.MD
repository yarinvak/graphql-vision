GraphQL Vision Dashboard
--------------------------
![version](https://img.shields.io/npm/v/graphql-vision-react-dashboard)

This is a react component of a dashboard retreiving tracing information of graphql requests from the graphql vision server.

Required Properties:
- endpoint: string - the url for the vision service
- serviceName: the name of the service that sends the tracing information to the graphql vision service

### How To Run
- In order to run the example, do the following:
    - `cd example && npm i && npm link-libs` (For initialization)
    - `npm run start`

Every change in the root directory needs to be built in order to be reflected in the example (`npm run build`).
    
