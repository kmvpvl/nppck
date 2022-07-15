import { Component } from "react";
import MLString, {IMLString} from "../mlstring";
import "./multidate.css";

const strEst = new MLString({default: "Estimated", values: new Map([["ru", "Ожидаемый"]])});
const strBL = new MLString({default: "Baseline", values: new Map([["ru", "ПоПлану"]])});
type MultiDateStyle = "full" | "brief" | "superbrief";

export interface IDateRange {
  datepoint: Date;
  tolerance?: {
    left?: number;
    right?: number;
  }
}

interface IMultiDateExterior {
    style: MultiDateStyle; //full, brief, superbrief
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
  title?: IMLString;
  subtitle?: IMLString;
  estimated: IDateRange
  baseline?: Map<string, IDateRange>;
  state?: IMultiDateExterior;
}

class DateRange implements IDateRange {
  public datepoint: Date;
  public tolerance?: { left?: number | undefined; right?: number | undefined; } | undefined;
  constructor(d: IDateRange) {
    console.log("Date range =", d);
    this.datepoint = new Date(d.datepoint);
    this.tolerance = d.tolerance;
  }
}

class MultiDate extends Component<IMultiDate, IMultiDateExterior> {
    private title: MLString;
    private subtitle: MLString;
    private estimated: DateRange;
    private baseline: Map<string, DateRange>;

    constructor(props: IMultiDate) {
      super(props);
      console.log("Multidate =", this.props);
      this.title = new MLString(props.title?props.title:"");
      this.subtitle = new MLString(props.subtitle?props.subtitle:"");
      this.estimated = new DateRange(props.estimated);
      this.baseline = new Map<string, DateRange>(props.baseline);
      //debugger;
      this.baseline.forEach((v, k, m)=>m.set(k, new DateRange(v)));
      if (props.state) {
        this.state = props.state;
      } else {
        this.state = MULTIDATE_EXTERIOR_SUPERBRIEF;
      }
    }
    getDateToView(): DateRange {
      return this.estimated;
    }
    getDateTimeString(d?: DateRange):string {
      if (!d) d = this.getDateToView();
      return this.state.showTime?d.datepoint.toLocaleString():d.datepoint.toLocaleDateString();
    }
    getToleranceString(d?: DateRange): string {
      if (!d) d = this.getDateToView();
      return this.state.showTolerance?"+"+d.tolerance?.right+";-"+d.tolerance?.left:"";
    }
    render() {
      let s = this.state;
      const blselector = this.baseline.forEach((bl, ind)=>
        <span key={ind}>Baseline#{ind}</span>
      );
      const bls = this.baseline?.forEach((bl, ind)=>
        <span className="multidate-datepoint" key={ind}><span className="multidate-datepoint-label">BL{ind}</span>{s.showTime?bl.datepoint.toLocaleString():bl.datepoint.toLocaleDateString()}<span>+{bl.tolerance?.right};-{bl.tolerance?.left}</span></span>
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
            <div className="multidate-title">{this.title.toString()}
              <span className="multidate-expandinfo">↕</span>
            </div>
            <div className="multidate-dateselected">{this.getDateTimeString()}<span className="multidate-tolerance">{this.getToleranceString()}</span></div>
            <div className="multidate-dateselector">
              <span className="multidate-dateselector-prev">{strEst}</span>
              <span className="multidate-dateselector-cur">Baseline#0</span>
              <span className="multidate-dateselector-next">Baseline#1</span>
            </div>
          </div>
        );
      }
    }
  }
export default MultiDate;
