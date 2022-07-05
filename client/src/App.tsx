import { useEffect, useState } from 'react';
import './App.css';
import MultiDate, {IMultiDate, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPER_BRIEF, MULTIDATE_EXTERIOR_BRIEF} from './components/MultiDate/multidate';
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
  const h =  serverFetch('http://localhost:8000/order/62b8a8e097e44f4e43268abd');
  console.log(h);
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
  md.exterior = MULTIDATE_EXTERIOR_BRIEF;
  md.exterior.showEstimated = true;
  md.exterior.showTitle = true;

  const md1: IMultiDate = {
    title: "Promise",
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
  md1.exterior = MULTIDATE_EXTERIOR_SUPER_BRIEF;
  md1.exterior.showEstimated = true;

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
          name: "Wheelpair 800x60 M2 DIN 4534-02"
        },
        count: 10,
        measurement: "pcs",
        contractDate: md1,
        promiseDate: md1
      },
      {
        product:{
          mdmCode: "0184653210",
          name: "Wheelpair 800x60 M2 DIN 4534-02"
        },
        count: 10,
        measurement: "pcs",
        contractDate: md1,
        promiseDate: md1
      }

    ]
  }
  console.log(1);
  return (
    <div className="App">
      <MultiDate {...md}/>
      <MultiDate {...md1}/>
      <Order {...o}/>
    </div>
  );
}

export default App;
