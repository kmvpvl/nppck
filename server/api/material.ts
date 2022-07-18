import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import NPPCError from '../model/error';
import Material, { IMaterial } from '../model/material';


export default async function material(c: any, req: Request, res: Response) {
    const factoryid = c.request.params["factoryid"];
    const materialid = c.request.params["materialid"];
    console.log(`API: material command with params: factory = ${factoryid}; material = ${materialid}`);
    try {
        let m = new Material(factoryid, materialid);
        await m.load();
        return res.status(200).json(m.toJson());
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