/*
    author: Alexander Zolotov
    Main application class.
    It is bound to JobsList class to SearchHeader by callbacks.
    It uses JobsList to display information, received from DataProvider.
    It requests data from DataProvider, each time country or query is changed in state.
*/

require('es6-object-assign').polyfill();
require('es6-promise').polyfill();

import React, { Component } from 'react';
import JobsList from './components/containers/JobsList';
import EventBrightItemList from './components/containers/EventBrightItemList';

import SearchHeader from './components/SearchHeader';
import ThemeMainContainer from './components/ThemeMainContainer';
import ThemeInviteMeContainer from './components/ThemeInviteMeContainer';
import ThemeMeetTheTeamContainer from './components/ThemeMeetTheTeamContainer';
import ThemeFooterContainer from './components/ThemeFooterContainer';
import ThemeCarouselContainer from './components/ThemeCarouselContainer';
import ThemeNavBar from './components/ThemeNavBar';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.css';

//load fonts
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,400,900']
  }
});

//load images
import Image_Ipad_Hand from '../assets/img/ipad-hand.png'

let DataProvider = require("./data_providers/DataProvider");
let DataProviderEventBright = require("./data_providers/event_bright/DataProvider");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.dataUpdated = this.dataUpdated.bind(this);

    this.dataUpdatedEventBright = this.dataUpdatedEventBright.bind(this);

    //TODO: refactor this place-----------------------
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //------------------------------------------------

    this.countries = {Singapore:"sg", USA:"us", China:"cn", Germany:"de", Ukraine: "ua"};

    this.initialCountry = this.countries.Singapore;
    this.initialQuery = "";
    console.log("constructor");
    this.state = {country: "sg", items: [], eventBrightItems: [], query : "", currentPage: "landing_page"};
  }

  //TODO: refactor this place-----------------------
  handleChange(event) {
    let copy = Object.assign({}, this.state, {query: event.target.value});
    this.setState(copy);
  }

  handleClick(event) {
    if (this.state.currentPage != "search_results_page" && this.state.query != "") {
      let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
      this.setState(copy);
      e.preventDefault();
    }
  }
  //------------------------------------------------

  handleCountryChange(country) {
    let copy = Object.assign({}, this.state, {country: country});
    this.setState(copy);
  }

  handleQueryChange(query) {
    //make query state change asynchronously with some delay, in order to reduce amount of data refreshes, when each symbol is typed
    let changeQueryAsync = function(query) {
      let copy = Object.assign({}, this.state, {query: query});
      this.setState(copy);
    }

    if (this.changeQUeryStateTimeoutHandle) {
      clearTimeout(this.changeQUeryStateTimeoutHandle);
    }

    this.changeQUeryStateTimeoutHandle = setTimeout(changeQueryAsync.bind(this, query), 1000)
  }

  dataUpdated(items) {
    if (typeof items !== "undefined") {
      this.state.items = [];
      
      let copy = Object.assign({}, this.state, {items: []});
      this.setState(copy);
      
      copy = Object.assign({}, this.state, {items: items});
      this.setState(copy);
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {
      this.state.eventBrightItems = [];
      
      let copy = Object.assign({}, this.state, {eventBrightItems: []});
      this.setState(copy);
      
      copy = Object.assign({}, this.state, {eventBrightItems: items});
      this.setState(copy);
    }
  }

  refreshData() {
    let copy = Object.assign({}, this.state, {items: []});
    this.setState(copy);
    
    if (this.state.query != "") {
      const PUBLISHER_ID = "4201738803816157";
      let url = "https://devfortest.000webhostapp.com/indeed_api/index.php?publisher=" + PUBLISHER_ID + "&query=" + this.state.query + "&country=" + this.state.country;
  
      DataProvider.requestApiData(url, this.dataUpdated, true);
    }
  }
  
  refreshDataEventBright() {
    let copy = Object.assign({}, this.state, {eventBrightItems: []});
    this.setState(copy);

    if (this.state.query != "") {
      let url = "https://devfortest.000webhostapp.com/eventbright_api/index.php?query=" + this.state.query;
      console.log(url);
      DataProviderEventBright.requestApiData(url, this.dataUpdatedEventBright);
    }
  }

  componentDidMount() {
    this.refreshData();
    this.refreshDataEventBright();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.country != prevState.country || this.state.query != prevState.query) {
      this.refreshData();
    }

    if (this.state.query != prevState.query) {
      let copy = Object.assign({}, this.state, {eventBrightItems: []});
      this.setState(copy);

      this.refreshDataEventBright();
    }
  }

  render() {

    //TODO: refactor this place----------------------------------------------------------

//TODO: refactor the code, split into components
  const HeadWrap = <div id="headerwrap">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h1>Make your landing page<br/>
        look really good.</h1>
        <form className="form-inline" action="#">
          <div className="form-group">
            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Key in a job or a skill you are exploring" onChange={this.handleChange}/>
          </div>
          <button type="button" className="btn btn-warning btn-lg" onClick={this.handleClick}>Check out the future!</button>
        </form>					
      </div>
      <div className="col-lg-6">
        <img className="img-responsive" src={Image_Ipad_Hand} alt="ipad-hand.png"/>
      </div>
    </div>
  </div>
</div>;

  let RenderData = <div><ThemeNavBar/>
  {HeadWrap}
  <ThemeMainContainer/>
  <ThemeInviteMeContainer/>
  <ThemeCarouselContainer/>
  <ThemeInviteMeContainer/>
  <ThemeMeetTheTeamContainer/>
  <ThemeFooterContainer/></div>;

if (this.state.currentPage == "search_results_page") {
  console.log("search_results_page");
  RenderData = <div><ThemeNavBar/>
  <div className="container search_results" >
  <div className="row mt left">
    <div className="col-lg-12">
    <SearchHeader onHandleCountryChange={(country) => this.handleCountryChange(country)} 
    onHandleQueryChange={(query) => this.handleQueryChange(query)} 
    country={this.initialCountry} query={this.state.query} countries={this.countries}/>
    {<JobsList items={this.state.items}/>}    
    {<EventBrightItemList items={this.state.eventBrightItems}/>}
    </div>
    </div>
  </div>
  <ThemeFooterContainer/></div>;
}
else{
  console.log("IT IS NOT search_results_page");
}
//----------------------------------------------------------

    return (
      <div>
      {RenderData}
      </div>
    );
  }
}
