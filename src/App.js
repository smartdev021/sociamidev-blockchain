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

import SearchHeader from './components/SearchHeader';
import SearchResults from './components/SearchResults';

import ThemeFooterContainer from './components/ThemeFooterContainer';
import ThemeCarouselContainer from './components/ThemeCarouselContainer';
import ThemeNavBar from './components/ThemeNavBar';
import Main from './components/Main';

import AuthenticationHelper from './authentication/AuthenticationHelper';
import SignUpFormPopup from './authentication/SignUpForm';
import UserProfile from './components/UserProfile';

import "./css/loginFormPopup.css"

import Axios from 'axios'

import ConfigMain from '../configs/main'

import Modal from 'react-modal';
const enhanceWithClickOutside = require('react-click-outside');

import ConfigsSocial from '../configs/social'

//load fonts
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,400,900']
  }
});

import './css/main.css';

let DataProviderIndeed = require("./data_providers/indeed/DataProvider");
let DataProviderEventBright = require("./data_providers/event_bright/DataProvider");
let DataProviderUdemy = require("./data_providers/udemy/DataProvider");
let DataProviderFreelancer = require("./data_providers/freelancer/DataProvider");

class App extends Component {
  constructor(props) {
    super(props);

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.countries = {Singapore:"sg", USA:"us", China:"cn", Germany:"de", Ukraine: "ua"};

    this.initialCountry = this.countries.Singapore;
    this.initialQuery = "";

    this.state = {
      country: "sg", 
      jobItems: [], 
      eventBrightItems: [], 
      udemyItems: [], 
      freelancerProjectItems: [], 
      query : "", 
      currentPage: "landing_page",
      selectedCategory: "category_jobs",
      isSearchInProgress: false, modalIsOpen: false,
      isSignUpFormOpen: false,
      isSettingsFormOpen: false,
      isAuthorized: false,
      linkedInCode: "",
      linkedInProfileID: "",
      faceBookToken: "",
      faceBookID: null,
      linkedInID: null,
      userProfileSettings: "",
    };

    this.isSearchingJobs = false;
    this.isSearchingEvents = false;
    this.isSearchingForUdemyItems = false;
    this.isSearchingForFreelancerItems = false;
  }

  handleChange(event) {
    this.handleQueryChange(event.target.value);
  }

  handleStartSearch(event) {
    event.preventDefault();

    if (!this.isSearchingJobs && !this.isSearchingEvents && !this.isSearchingForUdemyItems && !this.isSearchingForFreelancerItems) {
      this.startNewSearch();
    }
  }

  handleCategorySelect(event) {
    event.preventDefault();
    let copy = Object.assign({}, this.state, {selectedCategory: event.currentTarget.id});
    this.setState(copy);
  }

  handleAddJobToFavorites(event) {
    console.log("handleAddJobToFavorites");
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

  handleAddFreelancerProjectToFavorites(event) {
    let copy = Object.assign({}, this.state, {modalIsOpen: true});
    this.setState(copy);
  }

  refreshBusyState() {
    let copy = Object.assign({}, this.state, { isSearchInProgress: (
      this.isSearchingJobs || this.isSearchingEvents || this.isSearchingForUdemyItems || this.isSearchingForFreelancerItems)});
      
      this.setState(copy);
  }

  handleClickOutside() {
    this.closeModal();
  }

  handleFaceBookLoginResponse(response) {
    console.log("handleFaceBookLoginResponse");
    if (response.authResponse.accessToken) {
      let copy = Object.assign({}, this.state, {faceBookToken: response.authResponse.accessToken, faceBookID: response.authResponse.userID});
      this.setState(copy);

      console.log(response);

      Axios.get(`${ConfigMain.BackendURL}/signIn?facebookID=${response.authResponse.userID}`)
      .then((response) =>this.handleFaceBookSignInResponse(response))
      .catch(function(error){Axios.get(`${ConfigMain.BackendURL}/signUp?facebookID=${response.authResponse.userID}`)
      .then(function(){})
      .catch(function(){})});
    }
    this.closeSignUpModal();
  }

  handleFaceBookSignInResponse(response) {
    console.log("handleFaceBookSignInResponse");
    console.log(response.data.profile);
    
    let copy = Object.assign({}, this.state, {isSettingsFormOpen: false, userProfileSettings: response.data.profile});
    this.setState(copy);
  }

  startNewSearch() {
    this.isSearchingJobs = true;
    this.isSearchingEvents = true;
    this.isSearchingForUdemyItems = true;
    this.isSearchingForFreelancerItems = true;
    
    let copy = Object.assign({}, this.state, {jobItems: [], eventBrightItems: [], udemyItems: []});
    this.setState(copy);

    () => this.refreshBusyState();

    this.refreshDataIndeed();
    this.refreshDataEventBright();
    this.refreshDataUdemy();
    this.refreshDataFreelancer();
  }

  handleQueryChange(newQuery) {
    let copy = Object.assign({}, this.state, {query: newQuery});
    this.setState(copy);
  }

  dataUpdatedIndeed(items) {
    if (typeof items !== "undefined") {
      this.isSearchingJobs = false;

      let copy = Object.assign({}, this.state, {jobItems: items});
      this.setState(copy);

      () => this.refreshBusyState();
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {

      this.isSearchingEvents = false;

      let copy = Object.assign({}, this.state, {eventBrightItems: items});
      this.setState(copy);

      () => this.refreshBusyState();

      if (this.state.currentPage != "search_results_page" && this.state.query != "") {
        let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
        this.setState(copy);
      }
    }
  }

  dataUpdatedUdemy(items) {
    if (typeof items !== "undefined") {

      this.isSearchingForUdemyItems = false;

      let copy = Object.assign({}, this.state, {udemyItems: items});
      this.setState(copy);

      () => this.refreshBusyState();

      if (this.state.currentPage != "search_results_page" && this.state.query != "") {
        let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
        this.setState(copy);
      }
    }
  }

  dataUpdatedFreelancer(items) {
    if (typeof items !== "undefined") {

      this.isSearchingForFreelancerItems = false;

      let copy = Object.assign({}, this.state, {freelancerProjectItems: items});
      this.setState(copy);
      
      () => this.refreshBusyState();

      if (this.state.currentPage != "search_results_page" && this.state.query != "") {
        let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
        this.setState(copy);
      }
    }
  }

  refreshDataIndeed() {
    if (this.state.query != "") {
      const PUBLISHER_ID = "4201738803816157";
      let url = `${ConfigMain.BackendURL}/indeed/jobs?query=${this.state.query}&country=${this.state.country}`;
  
      DataProviderIndeed.requestApiData(url, (items) => this.dataUpdatedIndeed(items) , true);
    }
  }
  
  refreshDataEventBright() {
    if (this.state.query != "") {
      let url = `${ConfigMain.BackendURL}/eventbrite/events?query=${this.state.query}&location${this.state.country}`;
      console.log(url);
      DataProviderEventBright.requestApiData(url, (items) => this.dataUpdatedEventBright(items));
    }
  }

  refreshDataUdemy() {
    if (this.state.query != "") {
      let url = `${ConfigMain.BackendURL}/udemy/courses/?query=${this.state.query}`;
      console.log(url);
      DataProviderUdemy.requestApiData(url, (items) => this.dataUpdatedUdemy(items));
    }
  }

  refreshDataFreelancer() {
    if (this.state.query != "") {
      let url = `${ConfigMain.BackendURL}/freelancer/gigs/?query= ${this.state.query}`;
      console.log(url);
      DataProviderFreelancer.requestApiData(url, (items) => this.dataUpdatedFreelancer(items));
    }
  }

  closeModal() {
    let copy = Object.assign({}, this.state, {modalIsOpen: false});
    this.setState(copy);
  }

  closeSignUpModal() {
    let copy = Object.assign({}, this.state, {isSignUpFormOpen: false});
    this.setState(copy);
  }

  handleSignUpButtonClick() {
    let copy = Object.assign({}, this.state, {isSignUpFormOpen: !this.state.isSignUpFormOpen});
    this.setState(copy);
  }

  handleSettingsButtonClick() {
    let copy = Object.assign({}, this.state, {isSettingsFormOpen: !this.state.isSettingsFormOpen});
    this.setState(copy);
  }

  handleSettingsFormSubmit(settings) {
    let copy = Object.assign({}, this.state, {isSettingsFormOpen: false, userProfileSettings: settings});
    this.setState(copy);
  }

  handleCloseSettings() {
    let copy = Object.assign({}, this.state, {isSettingsFormOpen: false});
    this.setState(copy);
    console.log("Settings form closed!");
  }

  renderLoginPopup() {
    return (<div>
      <Modal
      className={{
    base: 'modal_base'
  }}
        isOpen={this.state.modalIsOpen}
        onRequestClose={() => this.closeModal()}
        contentLabel="Login Form"
      >

      <div className="wrapper">
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

  componentDidMount() {
    let urlParams = new URLSearchParams(window.location.search);

    console.log("urlParams: " + urlParams);

    let linkedInId = urlParams.get("linkedInId");
    let facebookId = urlParams.get("facebookId");
    if (linkedInId) {
      console.log(`Received LinkedIn id ${linkedInId} in URL`);

      console.log("Fetching user profile...");

     Axios.get(`${ConfigMain.BackendURL}/fetchUserProfile?linkedInId=${linkedInId}`)
        .then((response) =>this.handlelinkedInUserProfileFetch(response))
        .catch((error) =>this.handlelinkedInUserProfileFetchError(error));
    }
    else if (facebookId) {
      console.log(`Received FaceBook id ${facebookId} in URL`);

      console.log("Fetching user profile...");
    }
  }

  handlelinkedInUserProfileFetch(response) {
    console.log("Fetch successfull: " + response.data.linkedInID);
    console.dir(response.data);

    let copy = Object.assign({}, this.state, {linkedInProfileID: response.data.linkedInID, userProfileSettings : response.data.profile});
    this.setState(copy);
  }

  handlelinkedInUserProfileFetchError(error) {
    console.log("Error fetching result: " + error);
  }

  resetAuthentication() {
    let copy = Object.assign({}, this.state, {linkedInProfileID: "", faceBookToken: ""});
    this.setState(copy);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.linkedInProfileID != this.state.linkedInProfileID || prevState.faceBookToken != this.state.faceBookToken) {
      if(!this.state.linkedInProfileID && !this.state.faceBookToken) {
        let copy = Object.assign({}, this.state, {isAuthorized: false});
        this.setState(copy);
      }
      else if(this.state.linkedInProfileID || this.state.faceBookToken) {
        let copy = Object.assign({}, this.state, {isAuthorized: true});
        this.setState(copy);
      }
    }
  }
  
  render() {
    const SignUpForm = <SignUpFormPopup modalIsOpen={this.state.isSignUpFormOpen} 
    onCloseModal={() => this.closeSignUpModal()} onFaceBookLoginResponse = {(response) => this.handleFaceBookLoginResponse(response)}/>;

    const UserProfileForm = <UserProfile
    onSubmitSettings={(settings) => this.handleSettingsFormSubmit(settings)} 
    settings={this.state.userProfileSettings} linkedInID={this.state.linkedInID} faceBookID={this.state.faceBookID}/>;
    let RenderData = (<div>
      
    <Main onHandleStartSearch={(e) => this.handleStartSearch(e)} 
          onHandleChange={(e) => this.handleChange(e)} 
          onHandleQueryChange={(query) => this.handleQueryChange(query)} 
          onHandleSearchClicked={(e) => this.handleStartSearch(e)} query={this.state.query} 
          isSearchInProgress={this.state.isSearchInProgress}
          numJobs={this.state.jobItems.length} numEvents={this.state.eventBrightItems.length}
          numCourses={this.state.udemyItems.length}
          onSelectCategory={(e) => this.handleCategorySelect(e)} selectedCategory={this.state.selectedCategory}
          selectedCategory={this.state.selectedCategory} jobItems={this.state.jobItems}
          eventBriteItems={this.state.eventBrightItems} udemyItems={this.state.udemyItems}
          freelancerProjectItems={this.state.freelancerProjectItems}
          onHandleAddJobToFavorites={(e) => this.handleAddJobToFavorites(e)}
          onHandleAddEventToFavorites={(e) => this.handleAddEventToFavorites(e)}
          onHandleAddCourseToFavorites={(e) => this.handleAddCourseToFavorites(e)}
          onHandleAddFreelancerProjectToFavorites={(e) => this.handleAddFreelancerProjectToFavorites(e)} 
          currentPage={this.state.currentPage}/>
          </div>);
    if (this.state.isSettingsFormOpen) {
      RenderData = (<div>
      {UserProfileForm}
      </div>);
    }

    return (
      <div>
        {this.renderLoginPopup()}
      <ThemeNavBar onHandleSignUp={()=> this.handleSignUpButtonClick()} 
                          onHandleOpenSettings={()=> this.handleSettingsButtonClick()} isAuthorized={this.state.isAuthorized}/>
      {SignUpForm}
      {RenderData}
      <ThemeFooterContainer/>
      </div>
    );
  }
}


module.exports = enhanceWithClickOutside(App);