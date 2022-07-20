import { Schema, connect, model, Types } from "mongoose";
import NPPCError from "./error";
import { IFactory, FactorySchema, FactoryID, IMLString } from "./factory";
import Operation, { IOperation, OperationSchema } from "./operation";
import { IOrder, OrderSchema } from "./order";

export type MDMCode = string;
export type MaterialID = string;

export interface IMaterial extends Document{
    factoryid?: string; // if undefined then any factory can use material
    name: string | IMLString;
    fullname: string | IMLString;
    mdmcode: string;
    cost: number;
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
        let oo: IOperation[] = await mongoOperations.find({'results.materialref': new Types.ObjectId(this.id)}).lean();
        //oo.forEach((o)=>o.lean<IOperation>());
        console.log("Operations from mongo =", oo);
        return oo;
    }
    async route(count: number = 1) {
        let ret = {materialref: this.id, name: this.data.name, mdmcode: this.data.mdmcode, routes: new Array<any>(), count: count, stock: 0};
        let oo = await this.getOperationsByResult();
        if (!oo.length) ret.routes.push({error: `There are no operations with result as Material`});
        for (const [i, op] of Object.entries(oo)) {
            let materials: any[] = [];
            let o: Operation = new Operation(op);
            let stock = 0;
            let mult = 1;
            let rcount = o.getCountMaterialResult(this.id);
            if (!rcount) {
                ret.routes.push({error: `Could not retrieve count of material as a result of operation`});
                break;
            }
            if (rcount > count) {
                stock = rcount - count;
            } else {
                mult = Math.ceil(count / rcount);
                stock = (mult * rcount) - count;
            }
            console.log("Searching every found operation: ", o);
            let consofs: Array<any> = o.json.consistsof as Array<any>;
            for (const [x, m] of Object.entries(consofs)){
                try {
                    let mat = new Material(this.factoryid, m.materialref);
                    await mat.load();
                    let z = await mat.route(mult * m.count);
                    materials.push(z);
                }
                catch (e) {
                    if ((e as NPPCError).code == "material:notfound") console.log("Material not found");
                    materials.push({error: `${e}`});
                }
            };
            ret.routes.push({
                operation: {
                    operationref: op._id,
                    name: op.name
                },
                materials: materials,
                stock: stock
            });
        }
        console.log("Routes =", ret);
        return ret;
    }
}
