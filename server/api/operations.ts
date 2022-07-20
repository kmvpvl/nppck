import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect, Types } from 'mongoose';
import Factory, { IFactory, FactorySchema } from './../model/factory';
import NPPCError from '../model/error';
import Operation, { IOperation, OperationSchema } from '../model/operation';
import User from "../model/user";
import Material from '../model/material';

export default async function operations(c: any, req: Request, res: Response) {
    const factoryid = c.request.params["factoryid"];
    const materialref = c.request.query["results.materialref"];
    console.log(`API: operations command with params: factoryid = ${factoryid}; materialref = ${materialref}`);
    try {
        let m = new Material(factoryid, materialref);
        await m.load();
        let oo = await m.getOperationsByResult();
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