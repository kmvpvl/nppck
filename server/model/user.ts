import Role, { RoleName } from "./roles";
import express, { Application, Request, Response } from "express";
import { Schema, connect, model } from 'mongoose';
import { Context } from "vm";


export interface IUserData extends Document {
    name: string;
    hash?: string;
    roles?: Array<string>;
    subscribes?: Array<string>
}
export const UserSchema: Schema = new Schema({
});
export default class User {
    private _userName?: string | string[];
    private data?: IUserData;
    constructor(req: any){
        const authorization = req.headers["authorization"];
        this._userName = req.headers["nppc_auth"];
        console.log("authorization =", authorization, "; nppc_auth =", this._userName);
    }
    async hasRole(r: RoleName): Promise<boolean>{
        let uri = 'mongodb://0.0.0.0/NPP';
        connect(uri, (err)=>{
            if (err) {
                console.error(err.message);
                throw err;
            }  
            console.log('Connected to MongoDb');
        });
        const FC = model<IUserData>('users', UserSchema);
        let f = await FC.find({name : this._userName})
            .exec()
            .then((x)=>{
            return x;
            });
        console.log(f[0]); 
        if (!f.length) throw new Error(`User  ${this._userName} not found`);
        
        return true;
    }
}