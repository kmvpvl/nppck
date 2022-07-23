import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_SUPERBRIEF, MULTIDATE_EXTERIOR_BRIEF} from '../multidate/multidate';
import MLString, { IMLString } from "../mlstring";
import "./order.css";

const strContract: IMLString = {default: "Contract", values: new Map([["ru", "Дата договора"]])};
const strPromise: IMLString = {default: "Promise", values: new Map([["ru", "Дата обещания"]])};
const strContractSubtitle: IMLString = {default: "Due date by agreement", values: new Map([["ru-ru", "Дата в соответствии с договором"]])};

export interface IProduct {
    materialref: string;
    mdmCode: string;
    name: MLString;
    fullname?: MLString;
}
export interface IAmount {}
export interface IPriority {
    customer: string;
    manufacture: string;
}
export interface IOrderPos {
    id?: string;
    sort?: string;
    product: IProduct;
    count: number;
    measurement: string | MLString;
    contractDate: IMultiDate;
    promiseDate?: IMultiDate;
}

export interface ICustomer {

}

export interface IOrderState{}

export type IPlanningMode = "auto" | "manual";

export interface  IOrder {
    id?: string;
    factoryId: string;
    number: string;
    customerPO?: string;
    contractDate: IMultiDate;
    promiseDate?: IMultiDate;
    priority: IPriority;
    customer: ICustomer;
    planning_mode: IPlanningMode;
    calendar: string;
    products: Array<IOrderPos>;
}
export default class Order extends Component<IOrder, IOrderState> {
    constructor(props: IOrder) {
        super(props);
        console.log("constructor Order = ", this.props);
    }
    render(){
        let pp = this.props as IOrder;
        const prs = pp.products.map((p, ind)=> 
            <React.Fragment key={ind}>
            <span>{ind+1}</span>
            <span>{p.product.mdmCode}</span>
            <span>{p.product.name}</span>
            <span>{p.count}</span>
            <span>{p.measurement as string}</span>
            <MultiDate {...p.contractDate}/>
            </React.Fragment>
        );

        return (
            <span className="order-container">
                <span className="order-number">#{pp.number}</span>
                <span className="order-contract">
                    <MultiDate title={strContract}
                        estimated={this.props.contractDate.estimated}
                        state={MULTIDATE_EXTERIOR_BRIEF}
                    />
                </span>
                <span className="order-promise">
                    <MultiDate title={strPromise} 
                        estimated={this.props.contractDate.estimated} 
                        state={MULTIDATE_EXTERIOR_BRIEF}
                    />
                </span>
                <span className="order-priority">{pp.priority.customer+pp.priority.manufacture}</span>
                <span className="order-customer">RNFT Worldwide LLC</span>
                <span className="order-products">
                <span className="order-product-header">#</span>
                <span className="order-product-header">Code</span>
                <span className="order-product-header">Name</span>
                <span className="order-product-header">Cnt</span>
                <span className="order-product-header">Unts</span>
                <span className="order-product-header">Contract</span>
                {prs}
                </span>
            </span>
        );
    }
}