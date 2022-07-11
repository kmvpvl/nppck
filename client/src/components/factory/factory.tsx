import React, { Component, MutableRefObject, ReactNode, useRef, createRef, useCallback, useState, useId } from "react";
import { ReactDOM } from "react";
import MLString from "../mlstring";
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

export interface IFactory {
    id?: string;
    name?: MLString;
    fullname?: MLString;
    workcenters?: Array<IWorkcenter>;
}
interface IFactoryState {
}
export default class Factory extends React.Component<IFactory, IFactoryState> {
    private ref: React.RefObject<HTMLSpanElement>;
    private workcenters: IWorkcenter[] = [];
    constructor(props: IFactory){
        super(props);
        if (!this.workcenters.length) {
            serverFetch("factory/"+this.props.id).then((f: IFactory)=>{
                // here is Factory info downloaded successfully issue#3 
                this.workcenters = f.workcenters as IWorkcenter[];
                let b: Array<UserInputCoordinates> = [];
                this.workcenters.forEach((e)=>{
                    e.bounds.polygon.forEach(element => {
                        b.push(element)
                    });
                });
                if (this.ref.current){
                    if (b.length) {
                        let vp = new ViewPort(getBounds(b), this.ref.current.clientWidth, this.ref.current.clientHeight);
                        this.workcenters.forEach((e)=>{
                            e.bounds.viewport = vp; 
                        });
                        this.setState({});
                    }
                }
                if (this.ref.current) this.setState({});
            });
        }
        this.workcenters = this.props.workcenters?this.props.workcenters:[];
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
            {this.workcenters.map((e, i)=><Workcenter key={i} {...e}/>)}
            </span>
        )
    }

}