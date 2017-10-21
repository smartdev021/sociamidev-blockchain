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
import UserProfile from './components/UserProfile';

import "./css/loginFormPopup.css"

import Axios from 'axios'

import ConfigMain from '../configs/main'

import Modal from 'react-modal';
const enhanceWithClickOutside = require('react-click-outside');

//load fonts
import WebFont from 'webfontloader';

import { withRouter } from 'react-router-dom'

import { Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  openUserProfile,
  openSearchResults,
  fetchJobItemsComplete,
  fetchEventItemsComplete,
  fetchCourseItemsComplete,
  fetchGigItemsComplete,
} from './redux/actions/actions'

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

const BackendURL = ConfigMain.getBackendURL();

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
      query : "", 
      currentPage: "landing_page",
      isSearchInProgress: false, modalIsOpen: false,
      isSignUpFormOpen: false,
      isSettingsFormOpen: false,
      isAuthorized: false,
      faceBookID: null,
      linkedInID: null,

      userProfile: {
      firstName: 'John', 
      lastName: 'Doe', 
      interests: 'programming, study',
      skills: 'javascript, c++', 
      experience: 'Google',
      education: 'Harvard'}
    };

    this.isSearchingJobs = false;
    this.isSearchingEvents = false;
    this.isSearchingForUdemyItems = false;
    this.isSearchingForFreelancerItems = false;

    console.log(`Config BackendURL: ${BackendURL}`);

    console.log("App props: ");
    console.dir(this.props);
  }

  handleAuthorizeLinked(id) {
    let copy = Object.assign({}, this.state, {linkedInID: id});
    this.setState(copy);
    console.log("handleAuthorizeLinked id: " + id);
  }

  handleAuthorizeFaceBook(id) {
    let copy = Object.assign({}, this.state, {faceBookID: id});
    this.setState(copy);
    console.log("handleAuthorizeFaceBook id: " + id);
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

  startNewSearch() {
    this.isSearchingJobs = true;
    this.isSearchingEvents = true;
    this.isSearchingForUdemyItems = true;
    this.isSearchingForFreelancerItems = true;

    this.props.populateJobItems([]);
    this.props.populateEventItems([]);
    this.props.populateCourseItems([]);
    this.props.populateGigItems([]);
    
    let copy = Object.assign({}, this.state, {jobItems: [], eventBrightItems: [], udemyItems: []});
    this.setState(copy);

    this.refreshBusyState();

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

      this.props.populateJobItems(items);

      this.refreshBusyState();
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {

      this.isSearchingEvents = false;

      let copy = Object.assign({}, this.state, {eventBrightItems: items});
      this.setState(copy);

      this.props.populateEventItems(items);

      this.refreshBusyState();

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

      this.props.populateCourseItems(items);

      this.refreshBusyState();

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

      this.props.populateGigItems(items);
      
      this.refreshBusyState();

      if (this.state.currentPage != "search_results_page" && this.state.query != "") {
        let copy = Object.assign({}, this.state, {currentPage: "search_results_page"});
        this.setState(copy);
      }
    }
  }

  refreshDataIndeed() {
    if (this.state.query != "") {
      const PUBLISHER_ID = "4201738803816157";
      let url = `${BackendURL}/indeed/jobs?query=${this.state.query}&country=${this.state.country}`;
  
      DataProviderIndeed.requestApiData(url, (items) => this.dataUpdatedIndeed(items) , true);
    }
  }
  
  refreshDataEventBright() {
    if (this.state.query != "") {
      let url = `${BackendURL}/eventbrite/events?query=${this.state.query}&location${this.state.country}`;
      DataProviderEventBright.requestApiData(url, (items) => this.dataUpdatedEventBright(items));
    }
  }

  refreshDataUdemy() {
    if (this.state.query != "") {
      let url = `${BackendURL}/udemy/courses/?query=${this.state.query}`;
      DataProviderUdemy.requestApiData(url, (items) => this.dataUpdatedUdemy(items));
    }
  }

  refreshDataFreelancer() {
    if (this.state.query != "") {
      let url = `${BackendURL}/freelancer/gigs/?query= ${this.state.query}`;
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
    let copy = Object.assign({}, this.state, {isSettingsFormOpen: false, userProfile: settings});
    this.setState(copy);
  }

  handleCloseSettings() {
    let copy = Object.assign({}, this.state, {isSettingsFormOpen: false});
    this.setState(copy);
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

  resetAuthentication() {
    let copy = Object.assign({}, this.state, {linkedInID: "", faceBookID: "", profule: null});
    this.setState(copy);
  }

  fetchUserInfoFromDataBase() {
    if (this.state.linkedInID) {
      Axios.get(`${BackendURL}/fetchUserProfile?linkedInID=${this.state.linkedInID}`)
      .then((response) =>this.handleLinkedInUserProfileFetch(response))
      .catch((error) =>this.handleLinkedInUserProfileFetchError(error));
    }
    else if (this.state.faceBookID) {
      Axios.get(`${BackendURL}/fetchUserProfile?faceBookID=${this.state.faceBookID}`)
      .then((response) =>this.handleFaceBookUserProfileFetch(response))
      .catch((error) =>this.handleFaceBookUserProfileFetchError(error));
    }
  }

  handleLinkedInUserProfileFetch(response) {
    console.log("handleLinkedInUserProfileFetch: ");
    const responseProfile = response.data.profile;

    let newUserProfile = {
      firstName: responseProfile.firstName, 
      lastName: responseProfile.lastName, 
      interests: 'N/A due to lack of LinkedIn parmissions', //TODO: receive LinkedIn advanced permissions
      skills: 'N/A due to lack of LinkedIn parmissions', //TODO: receive LinkedIn advanced permissions
      experience: responseProfile.experience,
      education: responseProfile.education
    }

    let copy = Object.assign({}, this.state, {isAuthorized: true, userProfile: newUserProfile});
    this.setState(copy);
  }

  handleLinkedInUserProfileFetchError(error) {
    console.log("Error fetching LinkedIn profile: " + error);
  }

  handleFaceBookUserProfileFetch(response) {
    console.log("handleFaceBookUserProfileFetch: ");
    
    const responseProfile = response.data.profile;

    let newUserProfile = {
      firstName: responseProfile.firstName, 
      lastName: responseProfile.lastName, 
      interests: 'N/A due to lack of FaceBook parmissions', //TODO: receive FaceBook advanced permissions
      skills: 'N/A due to lack of FaceBook parmissions', //TODO: receive FaceBook advanced permissions
      experience: responseProfile.experience,
      education: responseProfile.education
    }

    let copy = Object.assign({}, this.state, {isAuthorized: true, userProfile: newUserProfile});
    this.setState(copy);
  }
    
  handleFaceBookUserProfileFetchError(error) {
    console.log("Error fetching FaceBook profile: " + error);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.linkedInID != this.state.linkedInID || prevState.faceBookID != this.state.faceBookID) {
      if(!this.state.linkedInID && !this.state.faceBookID) {
        let copy = Object.assign({}, this.state, {isAuthorized: false});
        this.setState(copy);
      }
      else if(this.state.linkedInID || this.state.faceBookID) {
        this.fetchUserInfoFromDataBase();
      }
    }
    if (prevState.isSearchInProgress != this.state.isSearchInProgress) {
      if (!this.state.isSearchInProgress) {
        this.props.openSearchResults();
      }
    }
    if (prevState.isAuthorized != this.state.isAuthorized) {
      if (this.state.isAuthorized) {
        this.props.openUserProfile();
      }
    }
  }

  getRedirectLocation() {
    let RedirectTo = null;
    if (this.props.isOpenSearchResultsPending) {
      if (this.props.location.pathname != '/searchResults') {
        RedirectTo = <Redirect to="/searchResults" push />;
      }
    }
    else if (this.props.isOpenProfilePending) {
      if (this.props.location.pathname != '/userProfile') {
        RedirectTo = <Redirect to="/userProfile" push />;
      }
    }

    return RedirectTo;
  }
  
  render() {

    let RedirectTo = this.getRedirectLocation();

    return (
      
      <div>
        {this.renderLoginPopup()}
        {RedirectTo}
      <ThemeNavBar onHandleSignUp={()=> this.handleSignUpButtonClick()} 
                          onHandleOpenSettings={()=> this.handleSettingsButtonClick()} isAuthorized={this.state.isAuthorized}/>
      <Main onHandleStartSearch={(e) => this.handleStartSearch(e)} 
          onHandleChange={(e) => this.handleChange(e)} 
          onHandleQueryChange={(query) => this.handleQueryChange(query)} 
          onHandleSearchClicked={(e) => this.handleStartSearch(e)} query={this.state.query} 
          isSearchInProgress={this.state.isSearchInProgress}
          onHandleAddJobToFavorites={(e) => this.handleAddJobToFavorites(e)}
          onHandleAddEventToFavorites={(e) => this.handleAddEventToFavorites(e)}
          onHandleAddCourseToFavorites={(e) => this.handleAddCourseToFavorites(e)}
          onHandleAddFreelancerProjectToFavorites={(e) => this.handleAddFreelancerProjectToFavorites(e)} 
          currentPage={this.state.currentPage}
          linkedInID={this.state.linkedInID} faceBookID={this.state.faceBookID}
          onCloseSignUpModal={() => this.closeSignUpModal()}
          isSignUpFormOpen={this.state.isSignUpFormOpen}
          onAuthorizeLinkedIn={(id) => this.handleAuthorizeLinked(id)}
          onAuthorizeFaceBook={(id) => this.handleAuthorizeFaceBook(id)}
          userProfile={this.state.userProfile}/>
      <ThemeFooterContainer/>
      </div>
    );
  }
}

App.propTypes = {
  isOpenProfilePending: PropTypes.bool.isRequired,
  isOpenSearchResultsPending: PropTypes.bool.isRequired,
  
  openUserProfile: PropTypes.func.isRequired,
  openSearchResults: PropTypes.func.isRequired,
  populateJobItems: PropTypes.func.isRequired,
  populateEventItems: PropTypes.func.isRequired,
  populateCourseItems: PropTypes.func.isRequired,
  populateGigItems: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  openUserProfile: bindActionCreators(openUserProfile, dispatch),
  openSearchResults: bindActionCreators(openSearchResults, dispatch),
  populateJobItems: bindActionCreators(fetchJobItemsComplete, dispatch),
  populateEventItems: bindActionCreators(fetchEventItemsComplete, dispatch),
  populateCourseItems: bindActionCreators(fetchCourseItemsComplete, dispatch),
  populateGigItems: bindActionCreators(fetchGigItemsComplete, dispatch),
})

const mapStateToProps = state => ({
  isOpenProfilePending: state.isOpenProfilePending,
  isOpenSearchResultsPending: state.isOpenSearchResultsPending,
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(App)));