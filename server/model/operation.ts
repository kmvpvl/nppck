import { Schema, Types } from 'mongoose';
import Material, { IMaterial } from './material';

export interface IOperationResult{
    materialref: Types.ObjectId;
    count: number;
}
export interface IOperation {
    _id: string;
    auxiliary: Array<IMaterial>;
    consistsof: Array<IMaterial>;
    cost: number;
    duration: number;
    fullname: string;
    name: string;
    results: Array<IOperationResult>;
    tools: Array<IMaterial>;
}

export const OperationSchema: Schema = new Schema({
    name: String,
    cost: Number,
    results: Array<{
        materialref: Types.ObjectId,
        count: Number
    }>
});

export default class Operation {
    private id: string;
    private data?: IOperation;
    constructor(id: string | IOperation){
        if (id instanceof Object) {
            this.id = id._id;
            this.data = id;
        } else {
            this.id = id;
        }
    }
    async load() {
    }
    
    get json(): any {
        return this.data;
    }
    set preLoadedData(v: any) {
        this.data = v;
    }
    getCountMaterialResult(materialId: string): number | undefined {
        if (this.data) {
            for (const [i, r] of Object.entries(this.data.results)){
                if (r.materialref.toString() == materialId) return r.count;
            }
            return undefined;
        } else {
            return undefined;
        }
    }
}