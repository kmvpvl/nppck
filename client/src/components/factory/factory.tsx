import React, { Component, MutableRefObject, ReactNode, useRef, createRef, useCallback, useState, useId } from "react";
import { ReactDOM } from "react";
import MLString from "../mlstring";
import "./factory.css";

import { UserInputCoordinates } from "geolib/es/types";
import Workcenter, {IWorkcenter} from "../workcenter/workcenter";
import { getBounds, toDecimal, getLatitude, getLongitude } from "geolib";

export class ViewPort {
    private bounds: any;
    private width: number;
    private height: number;
    constructor (bounds: any, width: number, height: number) {
        bounds.minLat -= 0.025 * (bounds.maxLat - bounds.minLat);
        bounds.maxLat += 0.025 * (bounds.maxLat - bounds.minLat);
        bounds.minLng -= 0.025 * (bounds.maxLng - bounds.minLng);
        bounds.maxLng += 0.025 * (bounds.maxLng - bounds.minLng);
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
    name: MLString;
    fullname?: MLString;
    workcenters: Array<IWorkcenter>;
}
interface IFactoryState {
}
export default class Factory extends React.Component<IFactory, IFactoryState> {
    private ref: React.RefObject<HTMLSpanElement>;
    private workcenters: IWorkcenter[] = [];
    constructor(props: IFactory){
        super(props);
        this.workcenters = this.props.workcenters;
        this.ref = React.createRef();
        window.addEventListener('resize', (ev:Event)=>{
            this.setState({});
        }) ;
    }
    componentDidMount(){
        let b: Array<UserInputCoordinates> = [];
        this.workcenters.forEach((e)=>{
            e.bounds.polygon.forEach(element => {
                b.push(element)
            });
        });

        this.setState({});
        if (this.ref.current){
            let vp = new ViewPort(getBounds(b), this.ref.current.clientWidth, this.ref.current.clientHeight);
            this.workcenters.forEach((e)=>{
                e.bounds.viewport = vp; 
            });
        }
    }
    render() {
        return (
            <span  className="factory" ref={this.ref}>Factory: size {this.ref.current?.clientWidth} {this.ref.current?.clientHeight}
            {this.workcenters.map((e, i)=><Workcenter key={i} {...e}/>)}
            </span>
        )
    }

}