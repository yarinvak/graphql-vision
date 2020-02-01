# graphql-vision-plugin

You can use this plugin in your apollo server in order to send tracing results to a graphql-vision server.

## Getting started

Use npm to install the library:
```$xslt
npm i --save graphql-vision-plugin
```

Add it to your apollo server configurations:

```typescript
import GraphQLVisionPlugin from 'graphql-vision-plugin';
import {keepAliveInterval} from 'graphql-vision-plugin';

const server = new ApolloServer({
    typeDefs, resolvers, tracing: true, plugins: [new GraphQLVisionPlugin('http://localhost:4000/graphql', 'my-app')]
});

keepAliveInterval(); // it will send a frequent keep alive to the vision server, and will be presented in the dashboard
```

The `tracing` argument must be set to `true`.
The `GraphQLVisionPlugin` receives the address to a graphql-vision server that will monitor the requests to our server, and our application id (sender-id).

You should send your graphql-vision server (graphql) endpoint to the constructor of the plugin.
