import {request} from 'graphql-request';
import GraphQLVisionPlugin from "./graphql-vision-plugin";

const keepAliveRequest = `mutation($senderId: String!) {
  keepAlive(senderId: $senderId)
}`;

export const keepAliveInterval = (intervalInMillis: number) => {
    setInterval(async () => {
        try {
            await request(GraphQLVisionPlugin.endpoint, keepAliveRequest, {
                senderId: GraphQLVisionPlugin.senderId
            });
        } catch (e) {
            throw new Error("Keep alive interval failed sending a keep-alive to the GraphQL-Vision Server. Is your vision server active?");
        }
    }, intervalInMillis ?? 5000)
};
