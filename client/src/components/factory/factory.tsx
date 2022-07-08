import React, { Component, MutableRefObject, ReactNode, useRef, createRef, useCallback, useState, useId } from "react";
import { ReactDOM } from "react";
import MLString from "../mlstring";
import "./factory.css";

import { UserInputCoordinates } from "geolib/es/types";
import Workcenter from "../workcenter/workcenter";
import { getBounds, toDecimal, getLatitude, getLongitude } from "geolib";

class ViewPort {
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
}
interface IFactoryState {
    ref: any;
}
export default class Factory extends React.Component<IFactory, IFactoryState> {
    private ref: React.RefObject<HTMLSpanElement>;
    constructor(props: IFactory){
        super(props);
        this.ref = React.createRef();
        window.addEventListener('resize', (ev:Event)=>{
            this.setState({});
        }) ;
    }
    componentDidMount(){
        this.setState({});
    }
    render() {
        let b1: Array<UserInputCoordinates> = [{lat: 1, lng:33}];
        let b2: Array<UserInputCoordinates> = [{lat: 10, lng:33}];
        let b: Array<UserInputCoordinates> = [];
        b1.forEach(element => {
            b.push(element)
        });;
        b2.forEach(element => {
            b.push(element)
        });;

        console.log(getBounds(b));
        if (this.ref.current){
            let vp = new ViewPort(getBounds(b), this.ref.current.clientWidth, this.ref.current.clientHeight);
        }

        return (
            <span  className="factory" ref={this.ref}>Factory: size {this.ref.current?.clientWidth} {this.ref.current?.clientHeight}
            <Workcenter name="Test1" bounds={b1}/>
            <Workcenter name="Test2" bounds={b2}/>
            </span>
        )
    }

}