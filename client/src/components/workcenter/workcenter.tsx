import React, { Component, ReactNode } from "react";
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF} from '../multidate/multidate';
import MLString from "../mlstring";
import "./workcenter.css";
import { IOperation } from "../operation/operation";
import { UserInputCoordinates } from "geolib/es/types";
import { getCenterOfBounds, getLatitude, getLongitude } from "geolib";


export interface IWorkcenter {
    name: string | MLString;
    fullname?: string | MLString;
    workcenters?: Array<IWorkcenter>;
    operations?: Array<IOperation>;
    bounds: Array<UserInputCoordinates>;
}
export default class Workcenter extends React.Component<IWorkcenter> {
    private center: UserInputCoordinates;
    private ref: React.RefObject<HTMLSpanElement>;

    constructor(props: IWorkcenter){
        super(props);
        this.ref = React.createRef();
        this.center = getCenterOfBounds(this.props.bounds);
    }
    componentDidMount(){
        this.setState({});
        //console.log(this.ref);
    }
    render() {
        return (
            <span ref={this.ref} style={{top:10*getLongitude(this.center), left:10*getLatitude (this.center)}} className="workcenter">
                <span className="workcenter-heavy-indicator"></span>
                Workcenter:{this.props.name}: {getLatitude (this.center)}: {getLongitude(this.center)}: size {this.ref.current?.offsetWidth} {this.ref.current?.offsetHeight}
            </span>
        );
    }

}