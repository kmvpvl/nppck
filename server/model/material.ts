import { Schema, connect, model, Types } from "mongoose";
import NPPCError from "./error";
import { IFactory, FactorySchema, FactoryID } from "./factory";
import Operation, { IOperation, OperationSchema } from "./operation";
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
            throw e;
        }
        if (!this.data) throw new NPPCError("material:notfound", `factoryid=${this.factoryid}; materialid=${this.id}`);
        if (this.data && this.data.factoryid && this.data.factoryid != this.factoryid) throw new NPPCError("material:anotherfactory", `factoryid=${this.factoryid}; materialid=${this.id}`);
    }
    toJson(): IMaterial {
        if (!this.data) throw new NPPCError("material:notloaded", `factoryid=${this.factoryid}; materialid=${this.id}`);
        return this.data;
    }
    async getOperationsByResult(): Promise<IOperation[]> {
        //const u = new User(c.request);
        let uri = 'mongodb://0.0.0.0/NPP';
        connect(uri)
        .catch((err)=>{
            try {
                throw new NPPCError("mongo:connect", `err=${err.message}; factoryid=${this.factoryid}`)
            } catch(e){
                console.error(e);
            }
        });
        const mongoOperations = model<IOperation>('operations', OperationSchema);
        let oo: IOperation[] = await mongoOperations.find({'results.ref': new Types.ObjectId(this.id)}).lean();
        //oo.forEach((o)=>o.lean<IOperation>());
        console.log("Operations from mongo =", oo);
        return oo;
    }
    async route() {
        let ret = {material: {ref: this.id, name: this.data.name, routes: new Array<any>()}};
        let oo = await this.getOperationsByResult();
        if (!oo.length) ret.material.routes.push({error: `There are no operations with result as Material`});
        for (const [i, op] of Object.entries(oo)) {
            let materials: any[] = [];
            let o: Operation = new Operation(op);
            console.log("Searching every found operation: ", o);
            let consofs: Array<any> = o.json.consistsof as Array<any>;
            for (const [x, m] of Object.entries(consofs)){
                try {
                    let mat = new Material(this.factoryid, m.ref);
                    await mat.load();
                    let z = await mat.route();
                    materials.push(z);
                }
                catch (e) {
                    if ((e as NPPCError).code == "material:notfound") console.log("Material not found");
                    materials.push({error: `${e}`});
                }
            };
            ret.material.routes.push({
                operation: {
                    ref: op._id,
                    name: op.name
                },
                materials: materials
            });
        }
        console.log("Routes =", ret);
        return ret;
    }
}
