import { Component } from "react";
import MLString from "../MLString";
import "./multidate.css";

interface IDateTolerance {
  datepoint: Date;
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

export const MULTIDATE_EXTERIOR_BRIEF: IMultiDateExterior = {
  style: "brief",
  showTitle: true,
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
    getDateToView(): IDateTolerance {
      let d: IDateTolerance = {datepoint: new Date()};
      if (this.props.baseline) {

      }
      if (this.props.exterior?.showEstimated) d = this.props.estimated;
      return d;
    }
    getDateTimeString(d?: IDateTolerance):string {
      if (!d) d = this.getDateToView();
      return this.props.exterior?.showTime?d.datepoint.toLocaleString():d.datepoint.toLocaleDateString();
    }
    getToleranceString(d?: IDateTolerance): string {
      if (!d) d = this.getDateToView();
      return this.props.exterior?.showTolerance?"+"+d.right+";-"+d.left:"";
    }
    render() {
      let p = this.props;
      const blselector = p.baseline?.map((bl, ind)=>
        <span key={ind}>Baseline#{ind}</span>
      );
      const bls = this.props.baseline?.map((bl, ind)=>
        <span className="multidate-datepoint" key={ind}><span className="multidate-datepoint-label">BL{ind}</span>{p.exterior?.showTime?bl.datepoint.toLocaleString():bl.datepoint.toLocaleDateString()}<span>+{bl.right};-{bl.left}</span></span>
      );
      switch (p.exterior?.style) {
      case 'superbrief':
        return (
          <span className={"multidate-container-"+p.exterior?.style}>
            {p.exterior?.showTitle?(<span className="multidate-title">{("string" == typeof p.title )? (p.title as string):""}</span>):""}
            {p.exterior?.showSubtitle?(<span className="multidate-subtitle">{p.subtitle}</span>):""}
            {p.exterior?.showEstimated?(<span className="multidate-datepoint"><span className="multidate-datepoint-label">EST</span>{p.exterior.showTime?p.estimated.datepoint.toLocaleString():p.estimated.datepoint.toLocaleDateString()}<span className="multidate-tolerance">+{p.estimated.right};-{p.estimated.left}</span></span>):""}
            {p.exterior?.showBaseline?bls:""}
          </span>
        );
      case 'brief':
      default:

        return (
          <div className={"multidate-container-"+p.exterior?.style}>
            <div className="multidate-title">{("string" == typeof p.title )? (p.title as string):""}
              <span className="multidate-expandinfo">↕</span>
            </div>
            <div className="multidate-dateselected">{this.getDateTimeString()}<span className="multidate-tolerance">{this.getToleranceString()}</span></div>
            <div className="multidate-dateselector">
              <span className="multidate-dateselector-prev">Estimated</span>
              <span className="multidate-dateselector-cur">Baseline#0</span>
              <span className="multidate-dateselector-next">Baseline#1</span>
            </div>
          </div>
        );
      }
    }
  }
export default MultiDate;