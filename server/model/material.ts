import { Schema, connect, model } from "mongoose";
import NPPCError from "./error";
import { IFactory, FactorySchema, FactoryID } from "./factory";
import { IOrder, OrderSchema } from "./order";

export type MDMCode = string;
export type MaterialID = string;

export interface IMaterial extends Document{
    factoryid: string;

}
export const MaterialSchema: Schema = new Schema({})

export default class Material {
    private id: MaterialID;
    private factoryid: string;
    private data?: any;
    constructor(factoryid: string, id: MaterialID | MDMCode) {
        this.id = id;
        this.factoryid = factoryid;
    }
    async load(){
        let uri = 'mongodb://0.0.0.0/NPP';
        connect(uri)
        .catch((err)=>{
            try {
                throw new NPPCError("mongo:connect", `err=${err.message}; factoryid=${this.factoryid}; materialid=${this.id}`)
            } catch(e){
                console.error(e);
            }
        });
        const mongoMaterial = model<IMaterial>('materials', MaterialSchema);
        try {
            let m: IMaterial | null = await mongoMaterial.findById(this.id).lean<IMaterial>();
            this.data = m;
            console.log("Material from mongo =", this.data);
        } catch(e){
            console.error(e);
        }
        if (!this.data) throw new NPPCError("material:notfound", `factoryid=${this.factoryid}; materialid=${this.id}`);
        if (this.data && this.data.factoryid != this.factoryid) throw new NPPCError("material:anotherfactory");
    }
    toJson(): IMaterial {
        if (!this.data) throw new NPPCError("material:notloaded", `factoryid=${this.factoryid}; materialid=${this.id}`);
        return this.data;
    }

}
