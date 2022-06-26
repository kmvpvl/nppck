import {Request, Response} from 'express';
import factory from "./factory";

let NPPCKAPI = {
    factory: (c: any, req: Request, res: Response) => {return factory(c, req, res)}
};

export default NPPCKAPI;
