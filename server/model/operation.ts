import { Schema, Types } from 'mongoose';
import Material, { IMaterial } from './material';

export interface IOperationResult{
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
        ref: Types.ObjectId,
        type: String,
        count: Number
    }>
});

export default class Operation {
    private id: string;
    private data?: any;
    constructor(id: string | IOperation){
        if (id instanceof Object) {
            this.id = id._id;
            this.data = id;
        } else {
            this.id = id;
        }
    }
    async load() {
        this.data = {};
    }
    
    get json(): any {
        return this.data;
    }
    set preLoadedData(v: any) {
        this.data = v;
    }
}