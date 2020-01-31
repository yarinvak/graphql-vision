![logo](vision.jpg?raw=true)
# graphql-vision
a dashboard &amp; server for handling tracing results sent by a graphql endpoint

## Getting Started
### Listener Service
You have to create the listener service (with a dashboard) in a new project.

run `npm i --save graphql-vision` in your listener project.

in your index.ts file:
```javascript
    import VisionServer from 'graphql-vision';

    const visionServer = new VisionServer();
    visionServer.run({port: 4000, dbOptions: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "apollo-tracing"
    }});
```

- The `port` argument stands for the port that the vision server will be running on.
- The `dbOptions` argument stands for the type-orm configurations. The vision server requires a DB for saving the tracing results.

It will create a listener server with a graphql endpoint and a dashboard.

### Your GraphQL Service
You have to configure your graphql service to send the apollo tracing objects to the listener service.

You can use the simpler way, using the [graphql-vision-plugin](https://github.com/yarinvak/graphql-vision-plugin), or the manual way:

For example, we configured our graphql service (created by apollo server):

```javascript
const trace = `mutation($tracing: TracerInput) {
  addTracing(tracing: $tracing)
}`;

const server = new ApolloServer({
    typeDefs, resolvers, tracing: true, plugins: [{
        requestDidStart({}){
            return {
                willSendResponse({response}){
                    request('http://localhost:4000/graphql', trace, {tracing: response.extensions.tracing}).then(()=>{
                        console.log('success');
                    });
                }
            }
        }
    }]
});
```
The `tracing:true` makes apollo server to return apollo tracing in response's extensions. Then we send these objects to the listener service created earlier, with url `http://localhost:4000/graphql`.

## How to work on project
- Clone the repository
- `npm i`
- `cd src/dashboard && npm i`

You can now run the example project with the following command:
- `npm run example`
