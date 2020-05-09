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
            console.warn(`Keep alive interval failed: ${e}`);
        }
    }, intervalInMillis ?? 5000)
};
