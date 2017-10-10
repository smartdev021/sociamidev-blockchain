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
import FreelancerProjectItemList from './components/containers/FreelancerProjectItemList';

import SearchHeader from './components/SearchHeader';
import ThemeMainContainer from './components/ThemeMainContainer';
import ThemeInviteMeContainer from './components/ThemeInviteMeContainer';
import ThemeMeetTheTeamContainer from './components/ThemeMeetTheTeamContainer';
import ThemeFooterContainer from './components/ThemeFooterContainer';
import ThemeCarouselContainer from './components/ThemeCarouselContainer';
import ThemeNavBar from './components/ThemeNavBar';

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
      linkedInToken:"",
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
      let url = "https://devfortest.000webhostapp.com/indeed_api/index.php?publisher=" + PUBLISHER_ID + "&query=" + this.state.query + "&country=" + this.state.country;
  
      DataProviderIndeed.requestApiData(url, (items) => this.dataUpdatedIndeed(items) , true);
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

  refreshDataFreelancer() {
    if (this.state.query != "") {
      let url = "https://devfortest.000webhostapp.com/freelancer_api/?query=" + this.state.query;
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

    let code = urlParams.get("code");

    if (urlParams.get("code")) {
      Axios.get(`https://www.linkedin.com/oauth/v2/accessToken/?grant_type=authorization_code&code=${this.state.linkedInCode}&redirect_uri=${window.location.href }&client_id=${ConfigsSocial.LinkedInClientID}&client_secret=${ConfigsSocial.LinkedInSecret}`)
      .then((response) =>this.handlelinkedInTokenRequest(response))
      .catch((error) =>this.handlelinkedInTokenRequestError(error));

      let copy = Object.assign({}, this.state, {linkedInCode: code});
      this.setState(copy);
    }
  }

  handlelinkedInTokenRequest(response) {
    console.log(response);
    let copy = Object.assign({}, this.state, {linkedInToken: response.access_token});
    this.setState(copy);
  }

  handlelinkedInCodeRequestError(error) {
   
    console.log(error);
  }

  resetAuthentication() {
    let copy = Object.assign({}, this.state, {linkedInCode: "", faceBookToken: ""});
    this.setState(copy);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("this.state.faceBookToken: " + this.state.faceBookToken);
    if (prevState.linkedInCode != this.state.linkedInCode || prevState.faceBookToken != this.state.faceBookToken) {
      if(!this.state.linkedInCode && !this.state.faceBookToken) {
        let copy = Object.assign({}, this.state, {isAuthorized: false});
        this.setState(copy);
      }
      else if(this.state.linkedInCode || this.state.faceBookToken) {
        let copy = Object.assign({}, this.state, {isAuthorized: true});
        this.setState(copy);
      }
    }
  }
  
  render() {
    const waitingText = (this.state.isSearchInProgress) ? <b>(Wait...)</b> : "";
    const HeadWrap = <div id="headerwrap">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Prepare for the future with what you can learn now</h1>
            <form className="form-inline" action="#" onSubmit={(e) => this.handleStartSearch(e)}>
              <div className="form-group">
                <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" placeholder="Key in a job or a skill you are exploring" onChange={(e) => this.handleChange(e)}/>
              </div>
              <button type="button" className="btn btn-warning btn-lg" 
              onClick={(e) => this.handleStartSearch(e)}>Check out the future!{waitingText}</button>
            </form>					
          </div>
        <div className="col-lg-6">
      <img className="img-responsive" src="https://sociamibucket.s3.amazonaws.com/assets/images/Howwelive_resized.jpg" alt="Howwelive_resized.jpg"/>
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

    const freelancerProjectList = (this.state.selectedCategory == "category_freelancer_projects") 
    ? <FreelancerProjectItemList items={this.state.freelancerProjectItems} 
        onAddToFavorites={(e) => this.handleAddFreelancerProjectToFavorites(e)}/> : null;

    const SignUpForm = <SignUpFormPopup modalIsOpen={this.state.isSignUpFormOpen} 
    onCloseModal={() => this.closeSignUpModal()} onFaceBookLoginResponse = {(response) => this.handleFaceBookLoginResponse(response)}/>;

    const UserProfileForm = <UserProfile
    onSubmitSettings={(settings) => this.handleSettingsFormSubmit(settings)} 
    settings={this.state.userProfileSettings} linkedInID={this.state.linkedInID} faceBookID={this.state.faceBookID}/>;


    let RenderData = (<div>
                        {this.renderLoginPopup()}
                        {SignUpForm}
                        <ThemeNavBar onHandleSignUp={()=> this.handleSignUpButtonClick()} 
                          onHandleOpenSettings={()=> this.handleSettingsButtonClick()} isAuthorized={this.state.isAuthorized}/>
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
        {SignUpForm}
        <ThemeNavBar onHandleSignUp={()=> this.handleSignUpButtonClick()} 
        onHandleOpenSettings={()=> this.handleSettingsButtonClick()} isAuthorized={this.state.isAuthorized}/>
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
              {freelancerProjectList}
          </div>
        </div>
      </div>
      <ThemeFooterContainer/></div>);
    }

    if (this.state.isSettingsFormOpen) {
      RenderData = (<div>
        <ThemeNavBar onHandleSignUp={()=> this.handleSignUpButtonClick()} 
        onHandleOpenSettings={()=> this.handleSettingsButtonClick()} isAuthorized={this.state.isAuthorized}/>
      {UserProfileForm}
      <ThemeFooterContainer/></div>);
    }

    return (
      <div>
      {RenderData}
      </div>
    );
  }
}


module.exports = enhanceWithClickOutside(App);