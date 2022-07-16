import {Request, Response} from 'express';
import factory from "./factory";
import order from "./order";
import orders from "./orders";
import User from "../model/user";
let NPPCKAPI = {
    factory: (c: any, req: Request, res: Response) => {return factory(c, req, res)},
    order: (c: any, req: Request, res: Response) => {return order(c, req, res)},
    orders: (c: any, req: Request, res: Response) => {return orders(c, req, res)}
};

export default NPPCKAPI;
