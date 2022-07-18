import { Schema, Types } from 'mongoose';

export interface IOperationResult{
    ref: Types.ObjectId;
    type: string;
    count: number;
}
export interface IOperation extends Document{
/*     name: string;
    cost: number;
    results: Array<IOperationResult>;
 */}

export const OperationSchema: Schema = new Schema({
});

export default class Operation {

}