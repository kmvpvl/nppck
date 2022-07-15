import './App.css';
import Factory from './components/factory/factory';
import StatusLine, {} from './components/statusline/statusline';
import MLString from './components/mlstring';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import React, {  } from 'react';
import Orders from './components/orders/orders';
import { NPPCSettings } from './settings';

const strMenuFactory = new MLString({default: "Factory", values: new Map([["ru", "Фабрика"]])});
const strMenuMDM = new MLString({default: "MDM", values: new Map([["ru", "НСИ"]])});
const strMenuOrders = new MLString({default: "Orders", values: new Map([["ru", "Заказы"]])});
const strMenuSearch = new MLString({default: "Search", values: new Map([["ru", "Поиск"]])});
interface INPPCApp{

}
interface INPPCAppState {

}
export default class NPPCApp extends React.Component<INPPCApp, INPPCAppState> {
  private brand: any;
  private curChapter: string = window.location.hash?window.location.hash:"#factory";
  constructor(props: any) {
    super(props);
    this.curChapter = window.location.hash?window.location.hash:"#factory";
    console.log("current chapter:", this.curChapter, "; window.location.hash", window.location.hash);
  }
  
  private menuChoosen = (e: any)=>{
    console.log("Menu choosen:", e.target.hash, "; current chapter:", this.curChapter, "; window.location.hash", window.location.hash);
    if (e.target.hash != window.location.hash) {
      this.curChapter = e.target.hash;
      this.setState({});
    }
  }
  
  private showChapter() {
    switch(this.curChapter) {
      case "#mdm":
        return (<span>MDM</span>);
      case "#orders":
        return (<Orders factoryId={NPPCSettings.factory}/>);
      case "#factory":
      default:
        return (<Factory id={NPPCSettings.factory} updateFactoryName={
          (name)=>{
            console.log(name);
            this.brand.innerHTML = name;
          }
        }/>);
    }
  }

  render() {return(
    <>
      <Navbar collapseOnSelect expand="sm" bg="auto">
        <Container>
          <Navbar.Brand href="#" ref={(ref: any)=>{
            console.log("Barnd", ref);  
            this.brand = ref;
          }}></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link onClick={this.menuChoosen} href="#factory">{strMenuFactory}</Nav.Link>
              <Nav.Link onClick={this.menuChoosen} href="#orders">{strMenuOrders}</Nav.Link>
              <Nav.Link onClick={this.menuChoosen} href="#mdm">{strMenuMDM}</Nav.Link>
            </Nav>
            <Form className='d-flex'>
              <FormControl type="search" placeholder={strMenuSearch.toString()+"..."} className='me-2' aria-label='Search'/>
              <Button variant='outline-success'>{strMenuSearch}</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
{/*       <MultiDate title={new MLString("Test", new Map([["ru-ru", "Тест"]]))} lang={NPPCSettings.lang} estimated={md.estimated} state={MULTIDATE_EXTERIOR_BRIEF}/>
      <Order {...o}/>
 */}     
      { this.showChapter()}
      <StatusLine></StatusLine>
    </>
  )};
}
