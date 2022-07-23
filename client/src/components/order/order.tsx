import React, { Component, RefObject } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_BRIEF} from '../multidate/multidate';
import MLString, { IMLString } from "../mlstring";
import "./order.css";
import { Button, Toast } from "react-bootstrap";
import serverFetch from "../berequest";

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
interface INPPCError {
    code: string;
    description: string;
}
interface INPPCResult {
    code: string;
    description: string;
}

export interface ICustomer {

}

export interface IOrderState{
    showToolbar: boolean;
    showError: boolean;
    showResult: boolean;
    error?: INPPCError;
    result?: INPPCResult;
}

export type IPlanningMode = "auto" | "manual";

export interface  IOrder {
    _id: string;
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
    private toolbarRef: RefObject<HTMLSpanElement>;
    private errorContainerRef: RefObject<HTMLDivElement>;
    constructor(props: IOrder) {
        super(props);
        console.log("constructor Order = ", this.props);
        this.toolbarRef = React.createRef();
        this.errorContainerRef = React.createRef();
        this.state = {
            showToolbar: false,
            showError: false,
            showResult: false
        }
    }
    componentDidMount(){
    }
    showToolbar(x: boolean){
        //console.log("show =", this.toolbarRef.current);
        if(this.toolbarRef.current){
            this.toolbarRef.current.classList.toggle("show");
            this.setState({
                showToolbar: x,
                showError: this.state.showError,
                showResult: this.state.showResult
            });
        }
    }
    showInfo(){
        this.showToolbar(false);
    }
    showResult(info: INPPCResult) {
        this.setState({
            showToolbar: this.state.showToolbar,
            showError: false,
            showResult: true,
            result: info
        });
    }
    showError(errobject: INPPCError){
        console.log("showError =", errobject);
        this.setState({
            showToolbar: this.state.showToolbar,
            showResult: false,
            showError: true,
            error: errobject
        });
    }
    routeProducts(){
        //this.showToolbar(false);
        serverFetch(`order/${this.props._id}/route`)
        .then(res=>{
            if (!res.ok) {
                res.json()
                .then((v)=>this.showError(v));
            } else {
                this.showToolbar(false);
            }
            return res.json();})
        .then((v)=>{
            console.log("Route return =", v);
            this.showResult({code:"Success", description:"Allright"});
        })
        .catch((v)=>{
            console.log("error =", v);
            this.showError(v);
        });
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
        console.log("Order state =", this.state);
        return (
            <span className="order-container">
                <span className="order-toolbar" ref={this.toolbarRef}>
                <Button size="sm" variant="outline-primary" onClick={()=>this.showToolbar(false)}>&lt;</Button>
                <Button size="sm" onClick={()=>this.routeProducts()}>Route</Button>
                <Button size="sm">Start</Button>
                <Button size="sm">Stop</Button>
                <Button size="sm" onClick={()=>this.showInfo()}>Info</Button>
                </span>
                <Toast className="order-error-container" bg={this.state.showError?"danger":"success"} autohide={this.state.showResult} delay={1000} show={this.state.showError || this.state.showResult} onClose={()=>{this.setState({showError:false, showResult:false})}} ref={this.errorContainerRef}>
                <Toast.Header>
                    <strong className="me-auto">{this.state.showError?this.state.error?.code:this.state.result?.code}</strong>
                    <Button variant="outline-secondary" size="sm" onClick={()=>navigator.clipboard.writeText(`${this.state.error?.code}:${this.state.error?.description}`)}>Copy</Button>
                </Toast.Header>
                <Toast.Body>
                    {this.state.showError?this.state.error?.description:this.state.result?.description}
                </Toast.Body>
                </Toast>                
                <span className="order-number" onClick={()=>this.showToolbar(true)}>#{pp.number}</span>
                <span className="order-contract">
                    <MultiDate title={strContract}
                        subtitle={strContractSubtitle}
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