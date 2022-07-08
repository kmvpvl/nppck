import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF} from '../multidate/multidate';
import MLString from "../mlstring";
import "./operation.css";

export interface IOperation {

}
export default class Workshop extends React.Component<IOperation> {
    render() {
        return (
            <span>Operation</span>
        );
    }

}