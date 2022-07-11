import React from "react";
import MLString from "../mlstring";
import "./orders.css";

const strFilter = new MLString("Filter", new Map([["ru", "Фильтр"]]));
const strGroupBy = new MLString("Group by", new Map([["ru", "Группировка по"]]));
type tsView = "list" | "boards";
type tsGroupBy = "workshop" | "progress" | "status" | "label" | "priority";
type tsStatus = "readytostart" | "inprogress" | "waiting" | "stopped" | "finished";
type tsOneManyOptions = "any" | "all";

export interface IOrders{

}
interface IOrdersState {

}

export default class Orders extends React.Component<IOrders, IOrdersState>{
    render() {
        return (
            <span className="orders-list">
            <span className="order-toolbar-container">Orders1</span>
            <span className="order-list-container">Orders1</span>
            </span>
        );
    }
}