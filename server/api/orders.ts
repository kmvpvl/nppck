import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect, Types } from 'mongoose';
import NPPCError from '../model/error';
import { IOrder, OrderSchema } from '../model/order';
import User from '../model/user';

export default async function orders(c: any, req: Request, res: Response) {
    const factoryid = c.request.params["factoryid"];
    console.log(`API: orders command with params: factoryid = ${factoryid}`);
    const u = new User(c.request);
    let uri = 'mongodb://0.0.0.0/NPP';
    connect(uri)
    .catch((err)=>{
        try {
            throw new NPPCError("mongo:connect", `err=${err.message}; factoryid=${factoryid}`)
        } catch(e){
            console.error(e);
        }
    });
    const mongoOrders = model<IOrder>('orders', OrderSchema);
    try {
        let oo: IOrder[] = await mongoOrders.find({});
        console.log("Orders from mongo =", oo);
        return res.status(200).json(oo);
    } catch(e){
        console.error(e);
        if (e instanceof NPPCError){
            switch (e.code){
                case "factory:notfound": 
                    return res.status(404).json(e)
                case "material:anotherfactory": 
                default: return res.status(400).json(e);
            }
        }
        return res.status(400).json(e);
    }
}