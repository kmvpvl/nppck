import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF} from '../MultiDate/multidate';
import MLString from "../MLString";
import "./workcenter.css";
import { IOperation } from "../operation/operation";
import { UserInputCoordinates } from "geolib/es/types";


export interface IWorkcenter {
    name: string | MLString;
    fullname?: string | MLString;
    workcenters?: Array<IWorkcenter>;
    operations?: Array<IOperation>;
    bounds: Array<UserInputCoordinates>;
}
export default class Workcenter extends React.Component<IWorkcenter> {
    render() {
        return (
            <span>Workcenter</span>
        );
    }

}