import {getRepository} from "typeorm";
import {KeepAlive} from "../db/entities/keep-alive";

export const saveKeepAlvie = async (obj: any, {senderId}: { senderId: string }) => {
    const keepAliveRepo = getRepository(KeepAlive);
    const date = new Date();
    const keepAlive = {senderId, date: date};
    await keepAliveRepo.save(keepAlive);
    return date;
};

export const getKeepAlive = async (obj: any, {senderId}: { senderId: string }) => {
    const keepAliveRepo = getRepository(KeepAlive);
    const keepAlive = await keepAliveRepo.find({senderId});
    if (!keepAlive || !keepAlive[0])
        return false;
    const date = keepAlive[0].date;
    date.setSeconds(date.getSeconds() + 5);
    return date > new Date();
};
