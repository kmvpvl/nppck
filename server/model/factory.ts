import { Schema } from 'mongoose';

export interface IFactory extends Document {
    name: string;
    fullname: string;
    created: Date;
    modified: Date;
    map: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    workcenters: Array<{
        id: string;
        name: string;
    }>;
    roads: Array<{
        id: string;
        name: string;
        fullname: string;
        bidirect: boolean;
        from: string;
        to: string;
        capacity: number;
    }>;
}

export const FactorySchema: Schema = new Schema({
    name: { type: String, required: true },
    fullname: { type: String, required: false },
    created: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    modified: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    workcenters: {
        type: Array,
        required: false
    }
});