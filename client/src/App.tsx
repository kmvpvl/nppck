import './App.css';
import MLString from './components/MLString';
import MultiDate, {IMultiDate, IDateTolerance, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF, MULTIDATE_EXTERIOR_BRIEF} from './components/MultiDate/multidate';
import Order, { IOrder } from './components/order/order';

async function serverFetch(url: string) {
  try{
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
  catch(err) {
    throw err;
    console.log(err);
  }
}
function App() {
  let params: string[] = window.location.search.substring(1).split("&");
  let lang = "";
  params.forEach((v: string)=>{
    let l: string[] = v.split("=");
    if ("lang" === l[0]) {
      lang = l[1];
    }
  });
  console.log(lang);

  //const h =  serverFetch('http://localhost:8000/order/62b8a8e097e44f4e43268abd');
  //console.log(h);
  const tmls = new MLString("Test", [["ru-ru", "Тест"]]);
  console.log(tmls.toString("ru-ru"));
  console.log({tmls});
  const md: IMultiDate = {
    title: new MLString("Contract"),
    subtitle: new MLString("Due date by agreement"),
    estimated: {
      datepoint: new Date(),
      left:1,
      right:0,
    },
    baseline: new Map<string, IDateTolerance>([
      ["0", {datepoint: new Date()}],
      ["1", {datepoint: new Date()}]
    ])
  };
  let mdexterior = MULTIDATE_EXTERIOR_BRIEF;
  
  const md1: IMultiDate = {
    title: new MLString("Promise"),
    subtitle: new MLString("Due date by agreement"),
    estimated: {
      datepoint: new Date(),
      left:1,
      right:0,
    },
    baseline: new Map<string, IDateTolerance>([
      ["0", {datepoint: new Date()}],
      ["1", {datepoint: new Date()}]
    ])
  };
  //md1.exterior = MULTIDATE_EXTERIOR_SUPER_BRIEF;
  //md1.exterior.showEstimated = true;

  const o: IOrder = {
    number: "R0180000395.1.22",
    contractDate: md,
    promiseDate:md1,
    priority: {customer:"A", manufacture: "2"},
    customer: {},
    products:[
      {
        product:{
          mdmCode: "0184653210",
          name: new MLString("Wheelpair 800x60 M2 DIN 4534-02")
        },
        count: 10,
        measurement: "pcs",
        contractDate: md1,
        promiseDate: md1
      },
      {
        product:{
          mdmCode: "0184653210",
          name: new MLString("Wheelpair 800x60 M2 DIN 4534-02")
        },
        count: 10,
        measurement: "pcs",
        contractDate: md1,
        promiseDate: md1
      }
    ],
    lang: lang
  }
  return (
    <div className="App">
      <MultiDate title={new MLString("Test", new Map([["ru-ru", "Тест"]]))} lang={lang} estimated={md.estimated} state={MULTIDATE_EXTERIOR_BRIEF}/>
      <Order {...o}/>
    </div>
  );
}

export default App;
