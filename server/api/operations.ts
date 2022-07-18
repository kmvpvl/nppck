import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect, Types } from 'mongoose';
import Factory, { IFactory, FactorySchema } from './../model/factory';
import NPPCError from '../model/error';
import Operation, { IOperation, OperationSchema } from '../model/operation';
import User from "../model/user";

export default async function operations(c: any, req: Request, res: Response) {
    const factoryid = c.request.params["factoryid"];
    const materialref = new Types.ObjectId(c.request.query["results.ref"]);
    console.log(`API: operations command with params: factoryid = ${factoryid}; materialref = ${materialref}`);
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
    const mongoOperations = model<IOperation>('operations', OperationSchema);
    try {
        let oo: IOperation[] = await mongoOperations.find({'cost' : 2400});
        console.log("Operations from mongo =", oo);
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