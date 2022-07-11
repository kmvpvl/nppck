import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import { IFactory, FactorySchema } from './../model/factory';

export default async function factory(c: any, req: Request, res: Response) {
  console.log(`API: factory command with params: ${c.request.params["factoryid"]}`);
  let uri = 'mongodb://0.0.0.0/NPP';
  connect(uri, (err)=>{
      if (err) {
          console.error(err.message);
          throw err;
      }  
      console.log('Connected to MongoDb');
  });
  const FC = model<IFactory>('factories', FactorySchema);
  let f = await FC.find({_id : c.request.params['factoryid']})
    .exec()
    .then((x)=>{
      return x;
    });
  console.log(f); 
  if (f.length) return f[0];
  else throw new Error(`Factory id ${c.request.params["factoryid"]} not found`);
}