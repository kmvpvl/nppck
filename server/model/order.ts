import { Schema, Types, connect, model } from 'mongoose';
import { IMultiDate, IMLString } from './factory';  
import NPPCError from './error';  
import Material from './material';
import { IRouteTree } from './route';
export interface IOrderPriority {
    customer: string;
    manufacture: string;
}

export interface IProduct {
    materialref: Types.ObjectId;
    mdmCode: string;
    name: string | IMLString;
    fullname?: string | IMLString;
}

export interface IOrderPos {
    suborderid?: Types.ObjectId;
    sort?: string;
    product: IProduct;
    count: number;
    measurement: string | IMLString;
    contractDate: IMultiDate;
    promiseDate?: IMultiDate;
    route?: IRouteTree;
}

export interface IOrder {
    _id: Types.ObjectId;
    factoryid?: Types.ObjectId;
    number: string;
    priority: IOrderPriority;
    contractDate: IMultiDate;
    promiseDate?: IMultiDate;
    calendar?: string;
    customerPO?: string;
    planningMode?: string;
    products: Array<IOrderPos>;
}

export const OrderSchema: Schema = new Schema({
    number: String,
    products: Array<{
        suborderid: Types.ObjectId,
        count: Number,
        route: Object
    }>
});

export default class Order {
    private id: Types.ObjectId;
    private data?: IOrder;
    constructor(id: Types.ObjectId){
        this.id = id;
    }
    async load(){
        let uri = 'mongodb://0.0.0.0/NPP';
        connect(uri)
        .catch((err)=>{
            try {
                throw new NPPCError("mongo:connect", `err=${err.message}; orderid=${this.id}`)
            } catch(e){
                console.error(e);
            }
        });
        const mongoOrder = model<IOrder>('orders', OrderSchema);
        try {
            let o: IOrder | null = await mongoOrder.findById(this.id).lean<IOrder>();
            this.data = o;
            console.log("Order from mongo =", this.data);
        } catch(e){
            console.error(e);
            throw e;
        }
        if (!this.data) throw new NPPCError("order:notfound", `orderid=${this.id}`);
    }
    async routeProducts(){
        if (!this.data) throw new NPPCError("order:notloaded", `orderid = ${this.id}`);
        const mongoOrder = model<IOrder>('orders', OrderSchema);
        for (const[i, p] of Object.entries(this.data?.products)){
            let m = new Material(p.product.materialref);
            await m.load();
            let route = await m.route(p.count);
            p.route = route;
        }
        await mongoOrder.findByIdAndUpdate(this.id, {$set: this.data}).lean<IOrder>();
        await this.load();
        console.log("after route =", this.data);
    }
    toJson(){
        return this.data;
    }
}