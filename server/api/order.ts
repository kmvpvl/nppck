import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import { IOrder, OrderSchema } from '../model/order';

export default async function order(c: any, req: Request, res: Response) {
  console.log(`API: order command with params: ${c.request.params["orderid"]}`);
  let uri = 'mongodb://0.0.0.0/NPP';
  connect(uri, (err)=>{
      if (err) {
          console.error(err.message);
          throw err;
      }  
      console.log('Connected to MongoDb');
  });
  const FC = model<IOrder>('orders', OrderSchema);
  let o = await FC.find({_id : c.request.params['orderid']})
    .exec()
    .then((x)=>{
      return x;
    });
  console.log(o); 
  if (o.length) return o[0];
  else throw new Error(`Order id ${c.request.params["orderid"]} not found`);
}