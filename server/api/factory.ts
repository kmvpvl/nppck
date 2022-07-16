import { Request, Response } from 'express';
import { model, Schema, Model, Document, Mongoose, connect } from 'mongoose';
import { IFactory, FactorySchema, Factory } from './../model/factory';
import User from "../model/user";

export default async function factory(c: any, req: Request, res: Response) {
  console.log(`API: factory command with params: ${c.request.params["factoryid"]}`);
  try {
    const uu = new User(req);
    console.log("Check role", await uu.hasRole("factory:read"));
    let f = new Factory(c.request.params["factoryid"]);
    console.log("User in factory", uu);
    await f.load();
    return f.toJson();
  } catch(e) {
    throw e;
  }
}