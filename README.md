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
    visionServer.run(4000); // send port as an argument
```

It will create a listener server with a graphql endpoint and a dashboard.

### Your GraphQL Service
You have to configure your graphql service to send the apollo tracing objects to the listener service.

For example, we configured our graphql service (created by apollo server):

```javascript
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
