# graphql-vision-plugin

You can use this plugin in your apollo server in order to send tracing results to a graphql-vision server.

## Getting started

Use npm to install the library:
```$xslt
npm i --save graphql-vision-plugin
```

Add it to your apollo server configurations:

```typescript
import GraphQLVisionPlugin from graphql-vision-plugin.ts;

const server = new ApolloServer({
    typeDefs, resolvers, tracing: true, plugins: [new GraphQLVisionPlugin('http://localhost:4000/graphql')]
});
```

You should send your graphql-vision server (graphql) endpoint to the constructor of the plugin.
