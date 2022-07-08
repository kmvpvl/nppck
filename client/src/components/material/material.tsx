import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF} from '../multidate/multidate';
import MLString from "../mlstring";
import "./material.css";

export interface IMaterial {

}
export default class Material extends React.Component<IMaterial> {
    render() {
        return (
            <span>Material</span>
        );
    }

}