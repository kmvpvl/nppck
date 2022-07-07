import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_SUPERBRIEF, MULTIDATE_EXTERIOR_BRIEF} from '../MultiDate/multidate';
import MLString from "../MLString";
import "./order.css";

const strContract = new MLString("Contract", new Map([["ru-ru", "Дата договора"]]));
const strPromise = new MLString("Promise", new Map([["ru-ru", "Дата обещания"]]));

export interface IProduct {
    id?: string;
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

export interface  IOrder {
    id?: string;
    number: string;
    customerPO?: string;
    contractDate: IMultiDate;
    promiseDate?: IMultiDate;
    priority: IPriority;
    customer: ICustomer;
    precedors?: Array<string>;
    planning_mode?: string;
    products: Array<IOrderPos>;
    lang?: string;
}
export class IOrder {

}
export default class Order extends Component<IOrder> {
    constructor(props: any) {
        super(props);
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
                <span className="order-contract"><MultiDate title={strContract} estimated={pp.contractDate.estimated} state={MULTIDATE_EXTERIOR_BRIEF} lang={pp.lang}/></span>
                <span className="order-promise"><MultiDate title={strPromise} estimated={pp.contractDate.estimated} state={MULTIDATE_EXTERIOR_BRIEF} lang={pp.lang}/></span>
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
    componentDidMount() {
        
    }
}