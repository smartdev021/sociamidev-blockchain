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

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.countries = {Singapore:"sg", USA:"us", China:"cn", Germany:"de", Ukraine: "ua"};

    this.initialCountry = this.countries.Singapore;
    this.initialQuery = "";
    console.log("constructor");
    this.state = {country: "sg", jobItems: [], eventBrightItems: [], query : "", currentPage: "landing_page", isSearchInProgress: false};

    this.isSearchingJobs = false;
    this.isSearchingEvents = false;
  }

  handleChange(event) {
    this.handleQueryChange(event.target.value);
  }

  handleStartSearch(event) {
    event.preventDefault();

    if (!this.isSearchingJobs && !this.isSearchingEvents) {
      this.startNewSearch();
    }
  }

  startNewSearch() {
    this.isSearchingJobs = true;
    this.isSearchingEvents = true;
    
    let copy = Object.assign({}, this.state, {jobItems: [], eventBrightItems: [],
       isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents});
    this.setState(copy);

    this.refreshData();
    this.refreshDataEventBright();
  }

  handleQueryChange(newQuery) {
    console.log("QUERY: " + newQuery)
    let copy = Object.assign({}, this.state, {query: newQuery});
    this.setState(copy);
  }

  dataUpdated(items) {
    if (typeof items !== "undefined") {
      this.isSearchingJobs = false;

      let copy = Object.assign({}, this.state, {jobItems: items, 
        isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents});
      this.setState(copy);
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {

      this.isSearchingEvents = false;

      let copy = Object.assign({}, this.state, {eventBrightItems: items, 
        isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents});
      this.setState(copy);

      if (this.state.currentPage != "search_results_page" && this.state.query != "") {
        let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
        this.setState(copy);
      }
    }
  }

  refreshData() {
    if (this.state.query != "") {
      const PUBLISHER_ID = "4201738803816157";
      let url = "https://devfortest.000webhostapp.com/indeed_api/index.php?publisher=" + PUBLISHER_ID + "&query=" + this.state.query + "&country=" + this.state.country;
  
      DataProvider.requestApiData(url, (items) => this.dataUpdated(items) , true);
    }
  }
  
  refreshDataEventBright() {
    if (this.state.query != "") {
      let url = "https://devfortest.000webhostapp.com/eventbright_api/index.php?query=" + this.state.query + "&location=" + this.state.country;
      console.log(url);
      DataProviderEventBright.requestApiData(url, (items) => this.dataUpdatedEventBright(items));
    }
  }
  
  render() {
    const waitingText = (this.state.isSearchInProgress) ? <b>(Processing...)</b> : "";
    const HeadWrap = <div id="headerwrap">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Make your landing page<br/>look really good.</h1>
            <form className="form-inline" action="#" onSubmit={(e) => this.handleStartSearch(e)}>
              <div className="form-group">
                <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" placeholder="Key in a job or a skill you are exploring" onChange={(e) => this.handleChange(e)}/>
              </div>
              <button type="button" className="btn btn-warning btn-lg" 
              onClick={(e) => this.handleStartSearch(e)}>Check out the future!{waitingText}</button>
            </form>					
          </div>
        <div className="col-lg-6">
      <img className="img-responsive" src={Image_Ipad_Hand} alt="ipad-hand.png"/>
    </div>
  </div>
</div>
</div>;

    let RenderData = (<div><ThemeNavBar/>
                        {HeadWrap}
                        <ThemeMainContainer/>
                        <ThemeInviteMeContainer/>
                        <ThemeCarouselContainer/>
                        <ThemeInviteMeContainer/>
                        <ThemeMeetTheTeamContainer/>
                        <ThemeFooterContainer/></div>
                        );
                        
    if (this.state.currentPage == "search_results_page") {
      console.log("search_results_page");
      RenderData = (<div><ThemeNavBar/>
      <div className="container search_results" >
        <div className="row mt left">
          <div className="col-lg-12">
            <SearchHeader onHandleQueryChange={(query) => this.handleQueryChange(query)} 
              onHandleSearchClicked={(e) => this.handleStartSearch(e)} query={this.state.query} isSearchInProgress={this.state.isSearchInProgress}/>
              {<JobsList items={this.state.jobItems}/>}    
              {<EventBrightItemList items={this.state.eventBrightItems}/>}
          </div>
        </div>
      </div>
      <ThemeFooterContainer/></div>);
    }

    return (
      <div>
      {RenderData}
      </div>
    );
  }
}
