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

//load fonts
import WebFont from 'webfontloader';

import { withRouter } from 'react-router-dom'

import { Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ObjectHash from 'object-hash'

import { withCookies, Cookies } from 'react-cookie';

import {
  openUserProfile,
  openSearchResults,
  fetchUserProfileComplete,
  fetchJobItemsComplete,
  fetchEventItemsComplete,
  fetchCourseItemsComplete,
  fetchGigItemsComplete,
  fetchResultsInitiate,
  fetchResultsComplete,
  bookmarkAdd,
  bookmarkRemoveAll,
  openSignUpForm,
  closeSignUpForm,
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
    this.countries = {Singapore:"sg", USA:"us", China:"cn", Germany:"de", Ukraine: "ua"};

    this.initialCountry = this.countries.Singapore;
    this.initialQuery = "";

    this.state = {
      country: "sg", 
      query : "",
      isSearchInProgress: false,
      isAuthorized: false,
      faceBookID: null,
      linkedInID: null,
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

  handleStartSearch() {
    this.startNewSearch();
  }

  handleAddBookmark(item) {
    this.props.addBookmark(Object.assign({}, item, {_id: ObjectHash(item)}));
  }

  refreshBusyState() {
    let copy = Object.assign({}, this.state, { isSearchInProgress: (
      this.isSearchingJobs || this.isSearchingEvents || this.isSearchingForUdemyItems || this.isSearchingForFreelancerItems)});
      
      this.setState(copy);
  }

  startNewSearch() {
    if (!this.props.isFetchInProgress && this.state.query != "") {
      this.isSearchingJobs = true;
      this.isSearchingEvents = true;
      this.isSearchingForUdemyItems = true;
      this.isSearchingForFreelancerItems = true;

      this.refreshBusyState();
  
      this.props.populateJobItems([]);
      this.props.populateEventItems([]);
      this.props.populateCourseItems([]);
      this.props.populateGigItems([]);
      
      let copy = Object.assign({}, this.state, {jobItems: [], eventBrightItems: [], udemyItems: []});
      this.setState(copy);
  
      this.props.fetchResultsInitiate();
  
      this.refreshData("jobs");
      this.refreshData("events");
      this.refreshData("courses");
      this.refreshData("gigs");
    }
  }

  handleQueryChange(newQuery) {
    let copy = Object.assign({}, this.state, {query: newQuery});
    this.setState(copy);
  }

  dataUpdatedIndeed(items) {
    if (typeof items !== "undefined") {
      this.isSearchingJobs = false;
      
      this.props.populateJobItems(items);

      this.refreshBusyState();
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {

      this.isSearchingEvents = false;

      this.props.populateEventItems(items);

      this.refreshBusyState();
    }
  }

  dataUpdatedUdemy(items) {
    if (typeof items !== "undefined") {

      this.isSearchingForUdemyItems = false;

      this.props.populateCourseItems(items);

      this.refreshBusyState();
    }
  }

  dataUpdatedFreelancer(items) {
    if (typeof items !== "undefined") {

      this.isSearchingForFreelancerItems = false;

      this.props.populateGigItems(items);
      
      this.refreshBusyState();
    }
  }

  refreshData(type) {
    switch(type) {
      case "jobs":
      {
        const PUBLISHER_ID = "4201738803816157";
        let url = `${BackendURL}/indeed/jobs?query=${this.state.query}&country=${this.state.country}`;
    
        DataProviderIndeed.requestApiData(url, (items) => this.dataUpdatedIndeed(items) , true);
        break;
      }
      case "events":
      {
        let url = `${BackendURL}/eventbrite/events?query=${this.state.query}&location=${this.state.country}`;
        DataProviderEventBright.requestApiData(url, (items) => this.dataUpdatedEventBright(items));
        break;
      }
      case "courses":
      {
        let url = `${BackendURL}/udemy/courses/?query=${this.state.query}`;
        DataProviderUdemy.requestApiData(url, (items) => this.dataUpdatedUdemy(items));
        break;
      }
      case "gigs":
      {
        let url = `${BackendURL}/freelancer/gigs/?query= ${this.state.query}`;
        DataProviderFreelancer.requestApiData(url, (items) => this.dataUpdatedFreelancer(items));
        break;
      }
      default:
       break;
    }
  }
  
  resetAuthentication() {
    let copy = Object.assign({}, this.state, {linkedInID: "", faceBookID: "", profule: null});
    this.setState(copy);
  }

  fetchUserInfoFromDataBase() {
    if (this.state.faceBookID || this.state.linkedInID) {
      const url = this.state.faceBookID ? `${BackendURL}/fetchUserProfile?faceBookID=${this.state.faceBookID}`
      : `${BackendURL}/fetchUserProfile?linkedInID=${this.state.linkedInID}`;
  
      Axios.get(url)
      .then((response) =>this.handleUserProfileFetchFromDB(response))
      .catch((error) =>this.handleUserProfileFetchFromDBError(error));
    }
  }

  handleUserProfileFetchFromDB(response) {
    console.log("handleUserProfileFetchFromDB: ");
    
    const responseProfile = response.data.profile;

    let newUserProfile = {
      firstName: responseProfile.firstName, 
      lastName: responseProfile.lastName, 
      interests: responseProfile.interests, //TODO: receive FaceBook advanced permissions
      skills: responseProfile.skills, //TODO: receive FaceBook advanced permissions
      experience: responseProfile.experience,
      education: responseProfile.education
    }

    this.props.fetchUserProfileComplete(newUserProfile);
    let copy = Object.assign({}, this.state, {isAuthorized: true});
    this.setState(copy);
  }
    
  handleUserProfileFetchFromDBError(error) {
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
        this.props.fetchResultsComplete();
      }
    }
    if (prevState.isAuthorized != this.state.isAuthorized) {
      if (this.state.isAuthorized) {
        this.props.openUserProfile();
      }
    }

    if (prevProps.isFetchInProgress != this.props.isFetchInProgress) {
      if (!this.props.isFetchInProgress) {
        this.props.openSearchResults();
      }
    }

    if (prevProps != this.props) {
      console.log("App props updated: ");
      console.dir(this.props);
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
        {RedirectTo}
      <ThemeNavBar onHandleSignUp={()=> this.props.openSignUpForm()} isAuthorized={this.state.isAuthorized}/>
      <Main onHandleStartSearch={() => this.handleStartSearch()} 
          onHandleChange={(e) => this.handleChange(e)} 
          onHandleQueryChange={(query) => this.handleQueryChange(query)} 
          onHandleSearchClicked={(e) => this.handleStartSearch(e)} query={this.state.query} 
          isFetchInProgress={this.props.isFetchInProgress}
          onAddBookmark={(e) => this.handleAddBookmark(e)}
          linkedInID={this.state.linkedInID} faceBookID={this.state.faceBookID}
          onCloseSignUpModal={() => this.props.closeSignUpForm()}
          isSignUpFormOpen={this.props.isSignUpFormOpen}
          onAuthorizeLinkedIn={(id) => this.handleAuthorizeLinked(id)}
          onAuthorizeFaceBook={(id) => this.handleAuthorizeFaceBook(id)}/>
      <ThemeFooterContainer/>
      </div>
    );
  }
}

App.propTypes = {
  isOpenProfilePending: PropTypes.bool.isRequired,
  isOpenSearchResultsPending: PropTypes.bool.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  isSignUpFormOpen: PropTypes.bool.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  
  fetchUserProfileComplete: PropTypes.func.isRequired,
  openUserProfile: PropTypes.func.isRequired,
  openSearchResults: PropTypes.func.isRequired,
  populateJobItems: PropTypes.func.isRequired,
  populateEventItems: PropTypes.func.isRequired,
  populateCourseItems: PropTypes.func.isRequired,
  populateGigItems: PropTypes.func.isRequired,
  fetchResultsInitiate: PropTypes.func.isRequired,
  fetchResultsComplete: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  openUserProfile: bindActionCreators(openUserProfile, dispatch),
  openSearchResults: bindActionCreators(openSearchResults, dispatch),
  populateJobItems: bindActionCreators(fetchJobItemsComplete, dispatch),
  populateEventItems: bindActionCreators(fetchEventItemsComplete, dispatch),
  populateCourseItems: bindActionCreators(fetchCourseItemsComplete, dispatch),
  populateGigItems: bindActionCreators(fetchGigItemsComplete, dispatch),
  fetchUserProfileComplete: bindActionCreators(fetchUserProfileComplete, dispatch),
  fetchResultsInitiate: bindActionCreators(fetchResultsInitiate, dispatch),
  fetchResultsComplete: bindActionCreators(fetchResultsComplete, dispatch),
  addBookmark: bindActionCreators(bookmarkAdd, dispatch),
  removeAllBookmarks: bindActionCreators(bookmarkRemoveAll, dispatch),
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  closeSignUpForm: bindActionCreators(closeSignUpForm, dispatch),
})

const mapStateToProps = state => ({
  isOpenProfilePending: state.isOpenProfilePending,
  isOpenSearchResultsPending: state.isOpenSearchResultsPending,
  isFetchInProgress: state.isFetchInProgress,
  isSignUpFormOpen: state.isSignUpFormOpen,
  //TODO: entire store is not needed here, remove after more robust debugging approach is found
  store: state,
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(App)));