import OpenAPIBackend from 'openapi-backend';
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import factory from "./api/factory";
import material from './api/material';
import orders from './api/orders';
import operations from './api/operations';
import material_route from './api/material_route';
import order_route from './api/order_route';
import User from "./model/user";
import cors from 'cors';

const PORT = process.env.PORT || 8000;

 
const api = new OpenAPIBackend({ 
    definition: 'nppck.yml'
});
api.init();
api.register({
    factory:    async (c, req, res) => factory(c, req, res),
    material:   async (c, req, res) => material(c, req, res),
    material_route:      async (c, req, res) => material_route(c, req, res),
    order_route:      async (c, req, res) => order_route(c, req, res),
    operations: async (c, req, res) => operations(c, req, res),
    orders:     async (c, req, res) => orders(c, req, res),
    validationFail: (c, req, res) => res.status(400).json({ err: c.validation.errors }),
    notFound: (c, req, res) => res.status(404).json({ err: 'not found' }),
    notImplemented: (c, req, res) => res.status(500).json({ err: 'not found' }),
    unauthorizedHandler: (c, req, res) => res.status(401).json({ err: 'not auth' })
});
api.registerSecurityHandler('NPPC_AUTH', (c: any) => {
    try{
        const user = new User(c.request);
        return true; 
    } catch(e){
        return false;
    }
});

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// use as express middleware
app.use(async (req: Request, res: Response) => await api.handleRequest({
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query as {[key: string]: string},
    headers: req.headers as {[key: string]: string}
  }, 
  req, res));
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});