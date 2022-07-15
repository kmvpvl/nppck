import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect, Types } from 'mongoose';
import { IOrder, OrderSchema } from '../model/order';

export default async function orders(c: any, req: Request, res: Response) {
    console.log(`API: orders command with params: factoryid = ${c.request.params.factoryid}`);
    if (!c.request.params.factoryid) {
        console.error("Factory id not found in path");
        throw new Error("Factory id not found in path");
    }
    let uri = 'mongodb://0.0.0.0/NPP';
    connect(uri, (err)=>{
        if (err) {
            console.error(err.message);
            throw err;
        }  
      console.log('Connected to MongoDb');
  });
  const FC = model<IOrder>('orders', OrderSchema);
  let o = await FC.find({factoryid: c.request.params.factoryid})
    .exec()
    .then((x)=>{
      return x;
    });
  console.log("result = ", o); 
  if (o.length) return o;
  else throw new Error(`Orders  ${c.request.params} not found`);
}