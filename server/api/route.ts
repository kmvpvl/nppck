import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import NPPCError from '../model/error';
import Material, { IMaterial } from '../model/material';
import RouteTree from '../model/route';

export default async function route(c: any, req: Request, res: Response) {
    const factoryid = c.request.params["factoryid"];
    const materialid = c.request.params["materialid"];
    const count = c.request.query["count"];
    console.log(`API: route command with params: factory = ${factoryid}; material = ${materialid}; count = ${count}`);
    try {
        let r = new RouteTree(factoryid, materialid, count);
        await r.load();
        return res.status(200).json(r.toJson());
    } catch (e: any) {
        console.error(e);
        if (e instanceof NPPCError){
            switch (e.code){
                case "material:notloaded": 
                    return res.status(404).json(e)
                case "material:anotherfactory": 
                default: return res.status(400).json(e);
            }
        }
        return res.status(400).json(e);
    }
}