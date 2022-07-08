import './App.css';
import Factory from './components/factory/factory';
import StatusLine, {IStatusLine, IStatusLineState} from './components/statusline/statusline';
import MLString from './components/mlstring';
import MultiDate, {IMultiDate, IDateTolerance, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF, MULTIDATE_EXTERIOR_BRIEF} from './components/multidate/multidate';
import Order, { IOrder } from './components/order/order';
import {NPPCSettings} from './settings';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const strMenuFactory = new MLString("Factory", new Map([["ru", "Фабрика"]]));
const strMenuMDM = new MLString("MDM", new Map([["ru", "НСИ"]]));
const strMenuOrders = new MLString("Orders", new Map([["ru", "Заказы"]]));
const strMenuSearch = new MLString("Search", new Map([["ru", "Поиск"]]));
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
  //const h =  serverFetch('http://localhost:8000/order/62b8a8e097e44f4e43268abd');
  //console.log(h);
  const md: IMultiDate = {
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
  }
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="auto">
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href="#factory">{strMenuFactory.toString(NPPCSettings.lang)}</Nav.Link>
              <Nav.Link href="#orders">{strMenuOrders.toString(NPPCSettings.lang)}</Nav.Link>
              <Nav.Link href="#mdm">{strMenuMDM.toString(NPPCSettings.lang)}</Nav.Link>
            </Nav>
            <Form className='d-flex'>
              <FormControl type="search" placeholder={strMenuSearch.toString(NPPCSettings.lang)+"..."} className='me-2' aria-label='Search'/>
              <Button variant='outline-success'>{strMenuSearch.toString(NPPCSettings.lang)}</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
{/*       <MultiDate title={new MLString("Test", new Map([["ru-ru", "Тест"]]))} lang={NPPCSettings.lang} estimated={md.estimated} state={MULTIDATE_EXTERIOR_BRIEF}/>
      <Order {...o}/>
 */}      
      <Factory/>
      <StatusLine></StatusLine>
    </>
  );
}

export default App;
