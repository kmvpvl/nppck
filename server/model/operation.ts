import { Schema, Types } from 'mongoose';

export interface IOperationResult{
}
export interface IOperation extends Document{
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
    
}