import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import NPPCError from '../model/error';
import Order, { IOrder } from '../model/order';
import RouteTree from '../model/route';

export default async function order_route(c: any, req: Request, res: Response) {
    const orderid = c.request.params["orderid"];
    const count = c.request.query["count"];
    console.log(`API: route order command with params: order = ${orderid}`);
    try {
        let o = new Order(orderid);
        await o.load();
        await o.routeProducts();
        return res.status(200).json(o.toJson());
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