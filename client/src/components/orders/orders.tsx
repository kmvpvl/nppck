import React from "react";
import MLString from "../mlstring";
import { Button, ButtonGroup, Col, Container, Form, FormCheck, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./orders.css";

const strFilter = new MLString("Filter", new Map([["ru", "Фильтр"]]));
type tsView = "list" | "boards";
const strViewType = new MLString("Type", new Map([["ru", "Вид представления"]]));
const strViewTypeList = new MLString("List", new Map([["ru", "Список"]]));
const strViewTypeBucket = new MLString("Buckets", new Map([["ru", "Дорожки"]]));

type tsGroupBy = "workcenter" | "progress" | "status" | "label" | "priority";
const strGroupBy = new MLString("Group by", new Map([["ru", "Группировка по"]]));
const strGroupByWorkshop = new MLString("Workcenter", new Map([["ru", "Раб.центр"]]));
const strGroupByProgress = new MLString("Progress", new Map([["ru", "Ход выполнения"]]));
const strGroupByStatus = new MLString("Status", new Map([["ru", "Статус"]]));
const strGroupByLabel = new MLString("Label", new Map([["ru", "Метка"]]));
const strGroupByPriority = new MLString("Priority", new Map([["ru", "Приоритет"]]));

type tsStatus = "readytostart" | "inprogress" | "waiting" | "stopped" | "finished";
const strStatus = new MLString("Status", new Map([["ru", "Статус"]]));
const strStatusReadytostart = new MLString("Ready to start", new Map([["ru", "Готов к запуску"]]));
const strStatusInprogres = new MLString("Inprogress", new Map([["ru", "Изготавливается"]]));
const strStatusWaiting = new MLString("Waiting", new Map([["ru", "Ждёт"]]));
const strStatusStopped = new MLString("Stoppped", new Map([["ru", "Остановлен"]]));
const strStatusFinished = new MLString("Finished", new Map([["ru", "Завершён"]]));

type tsOneManyOptions = "any" | "all";

export interface IOrders{

}
interface IOrdersState {

}

export default class Orders extends React.Component<IOrders, IOrdersState>{
    render() {
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
                <span className="order-list-container">

                </span>
            </span>
        );
    }
}