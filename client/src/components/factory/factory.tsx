import React, { Component, MutableRefObject, ReactNode, useRef, createRef, useCallback, useState, useId } from "react";
import { ReactDOM } from "react";
import MLString, {IMLString} from "../mlstring";
import "./factory.css";

import { UserInputCoordinates } from "geolib/es/types";
import Workcenter, {IWorkcenter} from "../workcenter/workcenter";
import { getBounds, toDecimal, getLatitude, getLongitude } from "geolib";
import serverFetch from "../berequest";
import { NPPCSettings } from "../../settings";

export class ViewPort {
    private bounds: any;
    private width: number;
    private height: number;
    constructor (bounds: any, width: number, height: number) {
        bounds.minLat -= 0.025 * (bounds.maxLat - bounds.minLat);
        bounds.maxLat += 0.35 * (bounds.maxLat - bounds.minLat);
        bounds.minLng -= 0.025 * (bounds.maxLng - bounds.minLng);
        bounds.maxLng += 0.25 * (bounds.maxLng - bounds.minLng);
        this.bounds = bounds;
        this.width = width;
        this.height = height;
    }
	X2LAT(x: number) {
		return x * (toDecimal(this.bounds.maxLat) - toDecimal(this.bounds.minLat)) / this.width + toDecimal(this.bounds.minLat);
	}
	LAT2X(x: number) {
		return Math.round((toDecimal(x) - toDecimal(this.bounds.minLat)) * this.width / (toDecimal(this.bounds.maxLat) - toDecimal(this.bounds.minLat)));
	}
	Y2LNG(x: number) {
		return x * (toDecimal(this.bounds.maxLng) - toDecimal(this.bounds.minLng)) / this.height + toDecimal(this.bounds.minLng);
	}
	LNG2Y(x: number) {
		return Math.round((toDecimal(x) - toDecimal(this.bounds.minLng)) * this.height / (toDecimal(this.bounds.maxLng) - toDecimal(this.bounds.minLng)));
	}
    Point2ViewPort(p: UserInputCoordinates) {
        return {x: this.LAT2X(getLatitude(p)), y: this.LNG2Y(getLongitude(p))};
    }
}
type IFactoryData = {
    name: IMLString | MLString;
    fullname: IMLString | MLString;
    workcenters: Array<IWorkcenter>;
}
export interface IFactory {
    id: string;
    updateFactoryName: (name: string)=>void;
}
interface IFactoryState {
}
export default class Factory extends React.Component<IFactory, IFactoryState> {
    private ref: React.RefObject<HTMLSpanElement>;
    private data: IFactoryData = {name: {default:""}, fullname: {default:""}, workcenters: []};
    constructor(props: IFactory){
        super(props);
        serverFetch("factory/"+this.props.id)
        .then(res=>res.json())
        .then((f: IFactoryData)=>{
            // here is Factory info downloaded successfully issue#3 
            console.log("factory = ", f);
            this.data = f;
            this.data.name = new MLString(this.data.name as IMLString);
            this.data.fullname = new MLString(this.data.fullname as IMLString);
            this.props.updateFactoryName(this.data.name.toString());
            console.log(this.data.fullname.toString());
            let b: Array<UserInputCoordinates> = [];
            this.data.workcenters.forEach((e)=>{
                e.bounds.polygon.forEach(element => {
                    b.push(element)
                });
            });
            if (this.ref.current){
                if (b.length) {
                    let vp = new ViewPort(getBounds(b), this.ref.current.clientWidth, this.ref.current.clientHeight);
                    this.data.workcenters.forEach((e)=>{
                        e.bounds.viewport = vp; 
                    });
                    this.setState({});
                }
            }
            //if (this.ref.current) this.setState({});
        });
        this.ref = React.createRef();
        window.addEventListener('resize', (ev:Event)=>{
            this.setState({});
        }) ;
    }
    componentDidMount(){
        console.log("Factory Did mount");
    }
    
    render() {
        return (
            <span  className="factory" ref={this.ref}>Factory: size {this.ref.current?.clientWidth} {this.ref.current?.clientHeight}
            {this.data.workcenters.map((e, i)=><Workcenter key={i} {...e}/>)}
            </span>
        )
    }

}