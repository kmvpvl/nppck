import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import Factory, { IFactory, FactorySchema } from './../model/factory';
import NPPCError from '../model/error';
import User from "../model/user";

export default async function factory(c: any, req: Request, res: Response) {
    const factoryid = c.request.params["factoryid"];
    console.log(`API: factory command with params: ${factoryid}`);
    const u = new User(c.request);
    try {
        let f = new Factory(factoryid);
        await f.load();
        return res.status(200).json(f.toJson());
    } catch (e: any) {
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