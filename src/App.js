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
import EventBriteItemList from './components/containers/EventBriteItemList';
import UdemyItemList from './components/containers/UdemyItemList';

import SearchHeader from './components/SearchHeader';
import ThemeMainContainer from './components/ThemeMainContainer';
import ThemeInviteMeContainer from './components/ThemeInviteMeContainer';
import ThemeMeetTheTeamContainer from './components/ThemeMeetTheTeamContainer';
import ThemeFooterContainer from './components/ThemeFooterContainer';
import ThemeCarouselContainer from './components/ThemeCarouselContainer';
import ThemeNavBar from './components/ThemeNavBar';

import "./css/loginFormPopup.css"

import Modal from 'react-modal';

//load fonts
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,400,900']
  }
});

import './css/main.css';

let DataProvider = require("./data_providers/DataProvider");
let DataProviderEventBright = require("./data_providers/event_bright/DataProvider");
let DataProviderUdemy = require("./data_providers/udemy/DataProvider");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.countries = {Singapore:"sg", USA:"us", China:"cn", Germany:"de", Ukraine: "ua"};

    this.initialCountry = this.countries.Singapore;
    this.initialQuery = "";

    this.state = {
      country: "sg", 
      jobItems: [], 
      eventBrightItems: [], 
      udemyItems: [], 
      query : "", 
      currentPage: "landing_page",
      selectedCategory: "category_jobs",
      isSearchInProgress: false, modalIsOpen: false};
      
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.isSearchingJobs = false;
    this.isSearchingEvents = false;
    this.isSearchingForUdemyItems = false;
  }

  handleChange(event) {
    this.handleQueryChange(event.target.value);
  }

  handleStartSearch(event) {
    event.preventDefault();

    if (!this.isSearchingJobs && !this.isSearchingEvents && !this.isSearchingForUdemyItems) {
      this.startNewSearch();
    }
  }

  handleCategorySelect(event) {
    event.preventDefault();
    let copy = Object.assign({}, this.state, {selectedCategory: event.currentTarget.id});
    this.setState(copy);
  }

  handleAddJobToFavorites(event) {
    let copy = Object.assign({}, this.state, {modalIsOpen: true});
    this.setState(copy);
  }

  handleAddCourseToFavorites(event) {
    let copy = Object.assign({}, this.state, {modalIsOpen: true});
    this.setState(copy);
  }

  handleAddEventToFavorites(event) {
    let copy = Object.assign({}, this.state, {modalIsOpen: true});
    this.setState(copy);
  }

  startNewSearch() {
    this.isSearchingJobs = true;
    this.isSearchingEvents = true;
    this.isSearchingForUdemyItems = true;
    
    let copy = Object.assign({}, this.state, {jobItems: [], eventBrightItems: [], udemyItems: [],
       isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents || this.isSearchingForUdemyItems});
    this.setState(copy);

    this.refreshData();
    this.refreshDataEventBright();
    this.refreshDataUdemy();
  }

  handleQueryChange(newQuery) {
    let copy = Object.assign({}, this.state, {query: newQuery});
    this.setState(copy);
  }

  dataUpdated(items) {
    if (typeof items !== "undefined") {
      this.isSearchingJobs = false;

      let copy = Object.assign({}, this.state, {jobItems: items, 
        isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents || this.isSearchingForUdemyItems});
      this.setState(copy);
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {

      this.isSearchingEvents = false;

      let copy = Object.assign({}, this.state, {eventBrightItems: items, 
        isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents || this.isSearchingForUdemyItems});
      this.setState(copy);

      if (this.state.currentPage != "search_results_page" && this.state.query != "") {
        let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
        this.setState(copy);
      }
    }
  }

  dataUpdatedUdemy(items) {
    if (typeof items !== "undefined") {

      this.isSearchingForUdemyItems = false;

      let copy = Object.assign({}, this.state, {udemyItems: items, 
        isSearchInProgress: this.isSearchingJobs || this.isSearchingEvents || this.isSearchingForUdemyItems});
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

  refreshDataUdemy() {
    if (this.state.query != "") {
      let url = "https://devfortest.000webhostapp.com/udemy_api/?query=" + this.state.query;
      console.log(url);
      DataProviderUdemy.requestApiData(url, (items) => this.dataUpdatedUdemy(items));
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderLoginPopup() {
    return (<div>
      <Modal
      className={{
    base: 'modal_base'
  }}
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Login Form"
      >

      <div className="wrapper" onClick={this.closeModal}>
    <form className="form-signin">       
      <h2 className="form-signin-heading">Coming Soon</h2>
      <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autoFocus="" />
      <input type="password" className="form-control" name="password" placeholder="Password" required=""/>      
      <label className="checkbox">
        <input type="checkbox" className="remember-me" id="rememberMe" name="rememberMe"/> Remember me
      </label>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
    </form>
  </div>
      </Modal>
    </div>);
  }
  
  render() {
    const waitingText = (this.state.isSearchInProgress) ? <b>(Wait...)</b> : "";
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
      <img className="img-responsive" src="https://sociamibucket.s3.amazonaws.com/assets/images/ipad-hand.png" alt="ipad-hand.png"/>
    </div>
  </div>
</div>
</div>;

    const jobsList = (this.state.selectedCategory == "category_jobs") 
    ? <JobsList items={this.state.jobItems} onAddToFavorites={(e) => this.handleAddJobToFavorites(e)}/> : null;

    const eventsList = (this.state.selectedCategory == "category_events") 
    ? <EventBriteItemList items={this.state.eventBrightItems} onAddToFavorites={(e) => this.handleAddEventToFavorites(e)}/> : null;

    const udemyCoursesList = (this.state.selectedCategory == "category_courses") 
    ? <UdemyItemList items={this.state.udemyItems} onAddToFavorites={(e) => this.handleAddJobToFavorites(e)}/> : null;

    let RenderData = (<div>
                        {this.renderLoginPopup()}
                        <ThemeNavBar/>
                        {HeadWrap}
                        <ThemeMainContainer/>
                        <ThemeInviteMeContainer/>
                        <ThemeCarouselContainer/>
                        <ThemeInviteMeContainer/>
                        <ThemeMeetTheTeamContainer/>
                        <ThemeFooterContainer/></div>
                        );
                        
    if (this.state.currentPage == "search_results_page") {
      RenderData = (<div>
        {this.renderLoginPopup()}
        <ThemeNavBar/>
      <div className="container search_results" >
      <SearchHeader onHandleQueryChange={(query) => this.handleQueryChange(query)} 
      onHandleSearchClicked={(e) => this.handleStartSearch(e)} query={this.state.query} isSearchInProgress={this.state.isSearchInProgress}
      numJobs={this.state.jobItems.length} numEvents={this.state.eventBrightItems.length} numCourses={this.state.udemyItems.length}
      onSelectCategory={(e) => this.handleCategorySelect(e)} selectedCategory={this.state.selectedCategory}/>
        <div className="row mt left">
          <div className="col-lg-12">
              {jobsList}    
              {eventsList}
              {udemyCoursesList}
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
