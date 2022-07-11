import {Request, Response} from 'express';
import factory from "./factory";
import order from "./order";
let NPPCKAPI = {
    factory: (c: any, req: Request, res: Response) => {return factory(c, req, res)},
    order: (c: any, req: Request, res: Response) => {return order(c, req, res)}
};

export default NPPCKAPI;
