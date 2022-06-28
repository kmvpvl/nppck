import { Component } from "react";
import MLString from "../MLString";
import "./multidate.css";

interface IDateTolerance {
  datepoint: Date;
  mesure?: MLString | string;
  left?: number;
  right?: number;
}

interface IMultiDateExterior {
    style: string; //full, brief, superbrief
    showTitle: boolean;
    showSubtitle: boolean;
    showTolerance: boolean;
    showEstimated: boolean;
    showBaseline: boolean,
    showTime: boolean;
}

export const MULTIDATE_EXTERIOR_SUPER_BRIEF: IMultiDateExterior = {
  style: "superbrief",
  showTitle: false,
  showSubtitle: false,
  showTolerance: false,
  showEstimated: false,
  showBaseline: false,
  showTime: false
}

export const MULTIDATE_EXTERIOR_FULL: IMultiDateExterior = {
  style: "full",
  showTitle: true,
  showSubtitle: true,
  showTolerance: true,
  showEstimated: true,
  showBaseline: true,
  showTime: true
}
export interface IMultiDate {
  title: MLString | string;
  subtitle?: string;
  estimated: IDateTolerance
  baseline?: Array<IDateTolerance>;
  exterior?: IMultiDateExterior;
}



class MultiDate extends Component<IMultiDate> {
    render() {
      let p = this.props;
      const bls = this.props.baseline?.map((bl, ind)=>
        <span className="multidate-datepoint" key={ind}><span className="multidate-datepoint-label">BL{ind}</span>{p.exterior?.showTime?bl.datepoint.toLocaleString():bl.datepoint.toLocaleDateString()}</span>
      );
      return (
        <span className={"multidate-container-"+this.props.exterior?.style}>
          {this.props.exterior?.showTitle?(<span className="multidate-title">{("string" == typeof this.props.title )? (this.props.title as string):""}</span>):""}
          {this.props.exterior?.showSubtitle?(<span className="multidate-subtitle">{this.props.subtitle}</span>):""}
          {this.props.exterior?.showEstimated?(<span className="multidate-datepoint"><span className="multidate-datepoint-label">EST</span>{this.props.exterior.showTime?this.props.estimated.datepoint.toLocaleString():this.props.estimated.datepoint.toLocaleDateString()}</span>):""}
          {this.props.exterior?.showBaseline?bls:""}
        </span>
      );
    }
  }
export default MultiDate;