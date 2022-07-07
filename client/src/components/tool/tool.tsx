import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF} from '../MultiDate/multidate';
import MLString from "../MLString";
import "./tool.css";

export interface ITool {

}
export default class Tool extends React.Component<ITool> {
    render() {
        return (
            <span>Tool</span>
        );
    }

}