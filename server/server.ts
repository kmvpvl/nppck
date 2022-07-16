import OpenAPIBackend from 'openapi-backend';
import express, { Application, Request, Response } from "express";
import { IncomingHttpHeaders } from 'http2';
import morgan from "morgan";
import NPPCKAPI from './api';
import User from "./model/user"
import cors from 'cors';

const PORT = process.env.PORT || 8000;

 
const api = new OpenAPIBackend({ 
    definition: 'nppck.yml'
});
api.init();
api.register({
    factory: async (c, req, res) => {
        try {
            const r = await NPPCKAPI.factory(c, req, res);
            return res.status(200).json(r);
        }
        catch(e) {
            return res.status(404).json((e as Error).message);    
        }
    },

    order: async (c, req, res) => {
        try {
            const r = await NPPCKAPI.order(c, req, res);
            return res.status(200).json(r);
        }
        catch(e) {
            return res.status(404).json((e as Error).message);    
        }
    },
    orders: async (c, req, res) => {
        try {
            const r = await NPPCKAPI.orders(c, req, res);
            return res.status(200).json(r);
        }
        catch(e) {
            return res.status(404).json((e as Error).message);    
        }
    },
    validationFail: (c, req, res) => res.status(400).json({ err: c.validation.errors }),
    notFound: (c, req, res) => res.status(404).json({ err: 'not found' }),
    notImplemented: (c, req, res) => res.status(500).json({ err: 'not found' }),
    postResponseHandler: (c, req, res) => {
    //    return res.status(200);
    },
    unauthorizedHandler: (c, req, res) => res.status(401).json({ err: 'not auth' })
    
});
api.registerSecurityHandler('NPPC_AUTH', (c, ...args) => {
    try{
        const user = new User(args[0] as Request);
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
app.use((req: Request, res: Response) => api.handleRequest({
    method: req.method,
    path: req.path,
    body: req.body,
    query: "",
    headers: { }
  }, 
  req, res));
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});