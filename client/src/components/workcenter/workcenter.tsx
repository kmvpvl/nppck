import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF} from '../multidate/multidate';
import MLString from "../mlstring";
import "./workcenter.css";
import { IOperation } from "../operation/operation";
import { UserInputCoordinates } from "geolib/es/types";
import { getCenterOfBounds, getLatitude, getLongitude } from "geolib";
import { ViewPort } from "../factory/factory";


export interface IWorkcenter {
    name: string | MLString;
    fullname?: string | MLString;
    workcenters?: Array<IWorkcenter>;
    operations?: Array<IOperation>;
    bounds: {
        polygon: Array<UserInputCoordinates>;
        viewport?: ViewPort;
    }
}
interface IWorkcenterState {
}
export default class Workcenter extends React.Component<IWorkcenter, IWorkcenterState> {
    private center: UserInputCoordinates;
    private ref: React.RefObject<HTMLSpanElement>;
    private x: number = 0;
    private y: number = 0;

    constructor(props: IWorkcenter){
        super(props);
        this.ref = React.createRef();
        this.center = getCenterOfBounds(this.props.bounds.polygon);
    }
    componentDidMount(){
        this.setState({});
        if (this.props.bounds.viewport) {
            let vp = this.props.bounds.viewport;
            this.x = vp.LAT2X(getLatitude (this.center));
            this.y = vp.LNG2Y(getLongitude(this.center));         
        }
        //console.log(this.ref);
    }
    render() {
        return (
            <span ref={this.ref} style={{top: this.y, left: this.x}} className="workcenter">
                <span className="workcenter-heavy-indicator"></span>
                Workcenter:{this.props.name}: {getLatitude (this.center)}: {getLongitude(this.center)}: size {this.ref.current?.offsetWidth} {this.ref.current?.offsetHeight}
            </span>
        );
    }

}