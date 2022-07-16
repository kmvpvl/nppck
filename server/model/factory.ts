import { Schema, connect, model } from 'mongoose';
export type FactoryID = string;
export interface IFactory extends Document {
}

export const FactorySchema: Schema = new Schema({
});

export class Factory {
    private id: FactoryID;
    private data: any;
    constructor(fid: FactoryID){
        this.id = fid;
    }
    async load (){
        let uri = 'mongodb://0.0.0.0/NPP';
        connect(uri, (err)=>{
            if (err) {
                console.error(err.message);
                throw err;
            }  
            console.log('Connected to MongoDb');
        });
        const FC = model<IFactory>('factories', FactorySchema);
        let f = await FC.find({_id : this.id})
          .exec()
          .then((x)=>{
            return x;
          });
        console.log(f); 
        if (!f.length) throw new Error(`Factory id ${this.id} not found`);
        this.data = f[0];
    }
    toJson(){
        return this.data;
    }
}