import { Component } from "react";
import MLString from "../mlstring";
import "./multidate.css";

const strEst = new MLString("Estimated", new Map([["ru-ru", "Ожидаемый"]]));
const strBL = new MLString("Baseline", new Map([["ru-ru", "ПоПлану"]]));


export interface IDateTolerance {
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

export const MULTIDATE_EXTERIOR_SUPERBRIEF: IMultiDateExterior = {
  style: "superbrief",
  showTitle: false,
  showSubtitle: false,
  showTolerance: false,
  showEstimated: true,
  showBaseline: false,
  showTime: false
}

export const MULTIDATE_EXTERIOR_BRIEF: IMultiDateExterior = {
  style: "brief",
  showTitle: true,
  showSubtitle: false,
  showTolerance: false,
  showEstimated: true,
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
  title?: MLString;
  subtitle?: MLString;
  estimated: IDateTolerance
  baseline?: Map<string, IDateTolerance>;
  state?: IMultiDateExterior;
  lang?: string;
}

class MLComponent extends Component<{}, {}> {

}

class DateTolerance implements IDateTolerance {
  public datepoint: Date = new Date();
  public left?: number;
  public right?: number;
  constructor(dp: Date, left?: number, right?:number) {
    this.datepoint = dp;
    this.left = left;
    this.right = right;
  }
}

class MultiDate extends Component<IMultiDate, IMultiDateExterior> implements IMultiDate {
    title?: MLString = this.props.title;
    estimated: DateTolerance = this.props.estimated;

    constructor(props: any) {
      super(props);
      if (props.state) {
        this.state = props.state;
      } else {
        this.state = MULTIDATE_EXTERIOR_SUPERBRIEF;
      }
    }
    getDateToView(): IDateTolerance {
      let d: IDateTolerance = {datepoint: new Date()};
      if (this.props.baseline) {

      }
      if (this.state.showEstimated) d = this.props.estimated;
      return d;
    }
    getDateTimeString(d?: IDateTolerance):string {
      if (!d) d = this.getDateToView();
      return this.state.showTime?d.datepoint.toLocaleString():d.datepoint.toLocaleDateString();
    }
    getToleranceString(d?: IDateTolerance): string {
      if (!d) d = this.getDateToView();
      return this.state.showTolerance?"+"+d.right+";-"+d.left:"";
    }
    render() {
      let p = this.props;
      let s = this.state;
      const blselector = p.baseline?.forEach((bl, ind)=>
        <span key={ind}>Baseline#{ind}</span>
      );
      const bls = this.props.baseline?.forEach((bl, ind)=>
        <span className="multidate-datepoint" key={ind}><span className="multidate-datepoint-label">BL{ind}</span>{s.showTime?bl.datepoint.toLocaleString():bl.datepoint.toLocaleDateString()}<span>+{bl.right};-{bl.left}</span></span>
      );
      switch (s.style) {
      case 'superbrief':
        return (
          <span className={"multidate-container-"+s.style}>
            <div className="multidate-dateselected">{this.getDateTimeString()}<span className="multidate-tolerance">{this.getToleranceString()}</span></div>
          </span>
        );
      case 'brief':
      default:
        return (
          <div className={"multidate-container-"+s.style}>
            <div className="multidate-title">{p.title?.toString(p.lang)}
              <span className="multidate-expandinfo">↕</span>
            </div>
            <div className="multidate-dateselected">{this.getDateTimeString()}<span className="multidate-tolerance">{this.getToleranceString()}</span></div>
            <div className="multidate-dateselector">
              <span className="multidate-dateselector-prev">{strEst.toString(p.lang)}</span>
              <span className="multidate-dateselector-cur">Baseline#0</span>
              <span className="multidate-dateselector-next">Baseline#1</span>
            </div>
          </div>
        );
      }
    }
  }
export default MultiDate;
