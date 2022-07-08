import React, { Component, MutableRefObject, ReactNode, useRef, createRef, useCallback, useState, useId } from "react";
import { ReactDOM } from "react";
import MLString from "../mlstring";
import "./factory.css";

import { UserInputCoordinates } from "geolib/es/types";
import Workcenter from "../workcenter/workcenter";

export interface IFactory {
}
interface IFactoryState {
    ref: any;
}
export default class Factory extends React.Component<IFactory, IFactoryState> {
    private ref: React.RefObject<HTMLSpanElement>;
    constructor(props: IFactory){
        super(props);
        //console.log();
        this.ref = React.createRef();
    }
    //resize = (ob:GlobalEventHandlers, ev:UIEvent)=>console.log(this.ref.current?.clientWidth);
    componentDidMount(){
        this.setState({});
        window.addEventListener('resize', (ev:Event)=>{
            //console.log(`${this.ref.current?.clientWidth}`);
            this.setState({});
    }) ;
    }
    render() {
        //console.log("Render");
        let b1: Array<UserInputCoordinates> = [{lat: 1, lng:33}];
        let b2: Array<UserInputCoordinates> = [{lat: 10, lng:33}];
        return (
            <span  className="factory" ref={this.ref}>Factory: size {this.ref.current?.clientWidth} {this.ref.current?.clientHeight}
            <Workcenter name="Test1" bounds={b1}/>
            <Workcenter name="Test2" bounds={b2}/>
            </span>
        )
    }

}