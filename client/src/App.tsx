import './App.css';
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPER_BRIEF} from './components/MultiDate/multidate';

function App() {
  const md: IMultiDate = {
    title: "Contract",
    subtitle: "Due date by agreement",
    estimated: {
      datepoint: new Date(),
      left:1,
      right:0,
    },
    baseline: [
      {datepoint: new Date()},
      {datepoint: new Date()},
    ]
  };
  md.exterior = MULTIDATE_EXTERIOR_SUPER_BRIEF;
  md.exterior.showEstimated = true;

  const md1: IMultiDate = {
    title: "Contract",
    subtitle: "Due date by agreement",
    estimated: {
      datepoint: new Date(),
      left:1,
      right:0,
    },
    baseline: [
      {datepoint: new Date()},
      {datepoint: new Date()},
    ]
  };
  md1.exterior = MULTIDATE_EXTERIOR_FULL;

  return (
    <div className="App">
      <MultiDate {...md}/>
      <MultiDate {...md1}/>
    </div>
  );
}

export default App;
