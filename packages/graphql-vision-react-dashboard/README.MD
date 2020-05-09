GraphQL Vision Dashboard
--------------------------
![version](https://img.shields.io/npm/v/graphql-vision-react-dashboard)
![Node CI](https://github.com/yarinvak/graphql-vision-react-dashboard/workflows/Node%20CI/badge.svg)

This is a react component of a dashboard retreiving tracing information of graphql requests from the graphql vision server.

Required Properties:
- endpoint: string - the url for the vision service
- serviceName: the name of the service that sends the tracing information to the graphql vision service

### Work on the project
- In order to run the example (and debug the dashboard), do the following:
    - `npm i && npm run build`
    - `cd example`
    - `npm i && npm link-libs` (For initialization)
    - `npm start`

Every change in the root directory needs to be built in order to be reflected in the example (`npm run build`).
    
Notice that in the `App.tsx` file inside example directory, it defines `localhost:4000` as the vision-server endpoint. You might want to change this in order to connect your vision-server
