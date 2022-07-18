import { Schema, connect, model } from 'mongoose';
import NPPCError from './error';
export type FactoryID = string;
export interface IFactory extends Document {
}

export const FactorySchema: Schema = new Schema({
});

export default class Factory {
    private id: FactoryID;
    private data: any;
    constructor(fid: FactoryID){
        this.id = fid;
    }
    async load (){
        let uri = 'mongodb://0.0.0.0/NPP';
        connect(uri)
        .catch((err)=>{
            try {
                throw new NPPCError("mongo:connect", `err=${err.message}; factoryid=${this.id}`)
            } catch(e){
                console.error(e);
            }
        });
        const mongoFactory = model<IFactory>('factories', FactorySchema);
        try {
            let f: IFactory | null = await mongoFactory.findById(this.id).lean<IFactory>();
            this.data = f;
            console.log("Factory from mongo =", this.data);
        } catch(e){
            console.error(e);
        }
        if (!this.data) throw new NPPCError("factory:notfound", `factoryid=${this.id}`);
    }

    toJson(){
        return this.data;
    }
}