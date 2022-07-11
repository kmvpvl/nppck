import './App.css';
import Factory from './components/factory/factory';
import StatusLine, {IStatusLine, IStatusLineState} from './components/statusline/statusline';
import MLString from './components/mlstring';
import MultiDate, {IMultiDate, IDateTolerance, MULTIDATE_EXTERIOR_FULL, MULTIDATE_EXTERIOR_SUPERBRIEF, MULTIDATE_EXTERIOR_BRIEF} from './components/multidate/multidate';
import Order, { IOrder } from './components/order/order';
import {NPPCSettings} from './settings';
import { Button, Container, Form, FormControl, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Workcenter, { IWorkcenter } from './components/workcenter/workcenter';
import React, { Children, ReactNode } from 'react';

const strMenuFactory = new MLString("Factory", new Map([["ru", "Фабрика"]]));
const strMenuMDM = new MLString("MDM", new Map([["ru", "НСИ"]]));
const strMenuOrders = new MLString("Orders", new Map([["ru", "Заказы"]]));
const strMenuSearch = new MLString("Search", new Map([["ru", "Поиск"]]));
interface INPPCApp{

}
interface INPPCAppState {

}
export default class NPPCApp extends React.Component<INPPCApp, INPPCAppState> {
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
        return (<span>Orders</span>);
      case "#factory":
      default:
        return (<Factory id='62c992c14b3fea2d4d5a6cd3'/>);
    }
  }

  render() {return(
    <>
      <Navbar collapseOnSelect expand="sm" bg="auto">
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link onClick={this.menuChoosen} href="#factory">{strMenuFactory.toString(NPPCSettings.lang)}</Nav.Link>
              <Nav.Link onClick={this.menuChoosen} href="#orders">{strMenuOrders.toString(NPPCSettings.lang)}</Nav.Link>
              <Nav.Link onClick={this.menuChoosen} href="#mdm">{strMenuMDM.toString(NPPCSettings.lang)}</Nav.Link>
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
      { this.showChapter()}
      <StatusLine></StatusLine>
    </>
  )};
}
