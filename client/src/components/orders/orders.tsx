import React from "react";
import MLString from "../mlstring";
import { Col, Form, Row } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./orders.css";
import Order, { IOrder } from "../order/order";
import serverFetch from "../berequest";

const strFilter = new MLString({default:"Filter", values: new Map([["ru", "Фильтр"]])});
type tsView = "list" | "boards";
const strViewType = new MLString({default:"Type", values: new Map([["ru", "Вид представления"]])});
const strViewTypeList = new MLString({default:"List", values: new Map([["ru", "Список"]])});
const strViewTypeBucket = new MLString({default:"Buckets", values: new Map([["ru", "Дорожки"]])});

type tsGroupBy = "workcenter" | "progress" | "status" | "label" | "priority";
const strGroupBy = new MLString({default:"Group by", values: new Map([["ru", "Группировка по"]])});
const strGroupByWorkshop = new MLString({default:"Workcenter", values: new Map([["ru", "Раб.центр"]])});
const strGroupByProgress = new MLString({default:"Progress", values: new Map([["ru", "Ход выполнения"]])});
const strGroupByStatus = new MLString({default:"Status", values: new Map([["ru", "Статус"]])});
const strGroupByLabel = new MLString({default:"Label", values: new Map([["ru", "Метка"]])});
const strGroupByPriority = new MLString({default:"Priority", values: new Map([["ru", "Приоритет"]])});

type tsStatus = "readytostart" | "inprogress" | "waiting" | "stopped" | "finished";
const strStatus = new MLString({default:"Status", values: new Map([["ru", "Статус"]])});
const strStatusReadytostart = new MLString({default:"Ready to start", values: new Map([["ru", "Готов к запуску"]])});
const strStatusInprogres = new MLString({default:"Inprogress", values: new Map([["ru", "Изготавливается"]])});
const strStatusWaiting = new MLString({default:"Waiting", values: new Map([["ru", "Ждёт"]])});
const strStatusStopped = new MLString({default:"Stoppped", values: new Map([["ru", "Остановлен"]])});
const strStatusFinished = new MLString({default:"Finished", values: new Map([["ru", "Завершён"]])});

type tsOneManyOptions = "any" | "all";

export interface IOrders{
    factoryId: string
}
interface IOrdersState {

}

export default class Orders extends React.Component<IOrders, IOrdersState>{
    private ordersContainer: any;
    private ordersCollection: Array<IOrder>;
    constructor(props: any){
        super(props);
        this.ordersCollection = new Array<IOrder>();
    }
    componentDidMount(){
        serverFetch("factory/"+this.props.factoryId+"/orders")
        .then(res=>res.json())
        .then((result)=>{
            console.log("orders = ", result);
            this.ordersCollection = result;
            this.setState({});
        });
    }
    render() {
        console.log("render =", this.ordersCollection);
        return (
            <span className="orders-list">
                <span className="orders-toolbar-container">
                    <Form><Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>{strViewType}</Form.Label>
                        <Form.Select aria-label="Default select example" size="sm" className="select">
                            <option value="list">{strViewTypeList}</option>
                            <option value="boards">{strViewTypeBucket}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>{strGroupBy}</Form.Label>
                        <Form.Select aria-label="Default select example" size="sm" className="select">
                            <option value="list">{strGroupByWorkshop}</option>
                            <option value="boards">{strGroupByProgress}</option>
                            <option value="boards">{strGroupByStatus}</option>
                            <option value="boards">{strGroupByLabel}</option>
                            <option value="boards">{strGroupByPriority}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>{strStatus}</Form.Label>
                        <Form.Select aria-label="Default select example" size="sm" className="select">
                            <option value="list">{strStatusReadytostart}</option>
                            <option value="boards">{strStatusInprogres}</option>
                            <option value="boards">{strStatusWaiting}</option>
                            <option value="boards">{strStatusStopped}</option>
                            <option value="boards">{strStatusFinished}</option>
                        </Form.Select>
                    </Form.Group>
                    </Row></Form>
                </span>
                <span className="orders-list-container" ref={(ref)=>this.ordersContainer = ref}>
                    {this.ordersCollection.map((o, i)=><Order key={i} {...o}/>)}
                </span>
            </span>
        );
    }
}