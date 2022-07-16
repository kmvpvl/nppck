import React from "react";
import { NPPCSettings } from "../../settings";
import "./statusline.css";
export interface IStatusLine{

}

export interface IStatusLineState{

}

export default class StatusLine extends React.Component<IStatusLine, IStatusLineState> {
    render(): React.ReactNode {
        return (
            <span>
                <span>{NPPCSettings.user}</span>
                <span className="statusline-lang">{NPPCSettings.lang}</span>
            </span>
        );
    }
}