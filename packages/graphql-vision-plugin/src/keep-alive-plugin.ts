import {request} from 'graphql-request';
import GraphQLVisionPlugin from "./graphql-vision-plugin";
const keepAliveRequest = `mutation($senderId: String!) {
  keepAlive(senderId: $senderId)
}`;

export const keepAliveInterval = (intervalInMillis: number) => {
    setInterval(() => {
        request(GraphQLVisionPlugin.endpoint, keepAliveRequest, {
            senderId: GraphQLVisionPlugin.senderId
        }).then(() => {
        }).catch();
    }, intervalInMillis?? 5000)
};
