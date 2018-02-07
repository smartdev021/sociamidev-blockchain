/*
    author: Alexander Zolotov
    Main application class.
    It is bound to JobsList class to SearchHeader by callbacks.
    It uses JobsList to display information, received from DataProvider.
    It requests data from DataProvider, each time country or query is changed in state.
*/

import React, { Component } from 'react';
import WebFont from 'webfontloader';
import { withRouter } from 'react-router-dom'
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {Link} from 'react-router-dom'
import io from 'socket.io-client';
import PubSub from 'pubsub-js';
import ReactGA from 'react-ga'

import Main from './Main';
import ChatApp from '~/src/components/chat/ChatApp';
import ConfigMain from '~/configs/main'
import ActionLink from '~/src/components/common/ActionLink'

import LandingPage from '~/src/theme/new_ui/LandingPage'

import {
  fetchUserProfile,
  openUserProfile,
  openSignUpForm,
  closeSignUpForm,
} from '~/src/redux/actions/authorization'

import {
  fetchAllTasks
} from '~/src/redux/actions/tasks'

import {
  fetchResultsInitiate,
  fetchResultsComplete,
  fetchResults,
  setSearchQuery,

  openSearchResults,
} from '~/src/redux/actions/fetchResults'


let DataProviderIndeed = require("~/src/data_providers/indeed/DataProvider");
let DataProviderEventBrite = require("~/src/data_providers/event_brite/DataProvider");
let DataProviderUdemy = require("~/src/data_providers/udemy/DataProvider");
let DataProviderFreelancer = require("~/src/data_providers/freelancer/DataProvider");

const BackendURL = ConfigMain.getBackendURL();
var socketConn;

//test commit

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faceBookID: null,
      linkedInID: null,
      verfiedSocketConnection: false,
    };
    
    var uuid = this.uuidv1();
    this.state.anonymousUserId = uuid;
    this.socket = io(BackendURL, { query: `userID=${uuid}` }).connect();
    socketConn = this.socket;

   this.socket.on('newUser', user => {
      var chatObj = {
        eventType: 'newUser',
        data: user
      }
      PubSub.publish('ChatStartPoint', chatObj);
    });

    this.socket.on('server:user', userObj => {
      var chatObj = {
        eventType: 'server:user',
        data: userObj
      }
      PubSub.publish('ChatStartPoint', chatObj);
    });

    this.socket.on('server:message', message => {
      var chatObj = {
        eventType: 'server:message',
        data: message
      }
      PubSub.publish('ChatStartPoint', chatObj);
    });

    this.socket.on('chatbotServer:message', message => {
      var chatObj = {
        eventType: 'chatbotServer:message',
        data: message
      }
      PubSub.publish('ChatStartPoint', chatObj);
    });

    this.socket.on('EVENT', eventObj => {
      PubSub.publish(eventObj.eventType, eventObj);
    });

    ReactGA.initialize('UA-113317436-1');
  }

  uuidv1() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  componentWillMount() {
    this.props.cookies.getAll();
    this.token_chat_token = PubSub.subscribe('ChatEndPoint', this.chatEndListener.bind(this));

    this.token_tasks_update = PubSub.subscribe("tasks_update", this.serverEventTasksUpdate.bind(this));

    console.log(`%cSubscribed to event: ${this.token_tasks_update}`, "background:blue; color:red");
    console.dir(this.token_tasks_update);
  }

  serverEventTasksUpdate(msg, data) {
    console.log(`%cServer Event Received: ${msg}`, "color:green;background:grey;");
    console.dir(data);

    if (data.eventType == "tasks_update") {
      this.props.fetchAllTasks(true);
    }
  };

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

  storeCurrentLocationInCookies() {
    const { cookies } = this.props;

    let dateExpire = new Date();
    dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());  
        
    let options = { path: '/', expires: dateExpire};
    
    let lastLocation = Object.assign({}, this.props.history.location);

    console.log("lastLocation: " + lastLocation);

     //TODO: need more robust way for redirection. Maybe store rediret path to backend session?
     if (this.props.exactLocation && this.props.exactLocation == "RoadmapsWidgetDetails") {
      lastLocation.pathname = '/taskManagement';
    }


    console.log("lastLocation1: " + lastLocation);

    cookies.set('lastLocation', lastLocation, options);
  }

  HandleSignUpFacebook() {
    this.props.closeSignUpForm();

    this.storeCurrentLocationInCookies();

    window.location.href = `${BackendURL}/auth/facebook`;
  }

  HandleSignUpLinkedIn() {
    this.props.closeSignUpForm();
    
    this.storeCurrentLocationInCookies();

    window.location.href = `${BackendURL}/auth/linkedin`;
  }

  handleStartSearch() {
    this.startNewSearch(this.props.searchQuery);
  }

  startNewSearch(searchQuery) {
    if (!this.props.isFetchInProgress && searchQuery != "") {
      let dateExpire = new Date();
      dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());
      let options = { path: '/', expires: dateExpire};
       
      this.props.cookies.set('searchQuery', searchQuery, options);

      this.props.fetchResults("jobs_indeed", searchQuery);
      this.props.fetchResults("events_eventbrite", searchQuery);
      this.props.fetchResults("courses_udemy", searchQuery);
      this.props.fetchResults("gigs_freelancer", searchQuery);
    }
  }
  
  resetAuthentication() {
    let copy = Object.assign({}, this.state, {linkedInID: "", faceBookID: "", profule: null});
    this.setState(copy);
  }

  fetchUserInfoFromDataBase() {
    if (this.state.faceBookID || this.state.linkedInID) {
      this.props.fetchUserProfile(this.state.faceBookID, this.state.linkedInID);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchResults != this.props.searchResults) {

      const wasFetchingResults = prevProps.searchResults.isFetchingJobs || prevProps.searchResults.isFetchingEvents 
      || prevProps.searchResults.isFetchingCourses || prevProps.isFetchingGigs;

      const isFetchingResults = this.props.searchResults.isFetchingJobs || this.props.searchResults.isFetchingEvents 
      || this.props.searchResults.isFetchingCourses || this.props.isFetchingGigs;

      if (!isFetchingResults && wasFetchingResults) {
        this.props.fetchResultsComplete();
      }
      else {
        if (!wasFetchingResults && isFetchingResults) {
          this.props.fetchResultsInitiate();
        }
      }
    }

    if (prevState.linkedInID != this.state.linkedInID || prevState.faceBookID != this.state.faceBookID) {
      console.log("componentDidUpdate this.state.linkedInID: " + this.state.linkedInID + " this.state.faceBookID: " + this.state.faceBookID);
    if(this.state.linkedInID || this.state.faceBookID) {
        this.fetchUserInfoFromDataBase();
      }
    }

    if (prevProps.isFetchInProgress != this.props.isFetchInProgress) {
      if (!this.props.isFetchInProgress) {
        //TODO: Fix this
        if (this.props.history.location.pathname != "/searchResults" && this.props.history.location.pathname != "/progressionTrees") {
          this.props.openSearchResults();
        }
      }
    }

    if (prevProps.userProfile != this.props.userProfile) {

      let copy = Object.assign({}, this.state, 
        {
          userID: this.props.userProfile._id,
          firstName: this.props.userProfile.firstName, 
          lastName: this.props.userProfile.lastName,
      });

      this.setState(copy);
    }

    if (prevProps != this.props) {
      console.log("App props updated: ");
      console.dir(this.props);
    }

    if (this.props.cookies != prevProps.cookies) {
      console.log("Cookies has been changed");
    }

    if(this.state.userID && this.state.verfiedSocketConnection == false){
      let copy = Object.assign({}, this.state, {verfiedSocketConnection: true});
      this.setState(copy);
    }

    if (prevProps.isAuthorized != this.props.isAuthorized) {
      if (this.props.isAuthorized) {
        this.token_tasks_update = PubSub.subscribe("tasks_update", this.serverEventTasksUpdate.bind(this));

        console.log(`%cSubscribed to event: ${this.token_tasks_update}`, "background:blue; color:red");
        console.dir(this.token_tasks_update);
      }
      else {
        PubSub.unsubscribe(this.token_tasks_update);

        console.log(`%cUnsubscribed to event: ${this.token_tasks_update}`, "background:blue; color:red");
        console.dir(this.token_tasks_update);
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

  renderProfileLink() {
    let ProfileLink = '';
    if (this.props.isAuthorized) {
      ProfileLink = <Link className='btn btn-lg btn-outline-inverse pull-right' to='/userProfile'>Your account</Link>;
    }
    else
    {
      ProfileLink = <ActionLink className="btn btn-lg btn-outline-inverse pull-right loginButton" 
          onClick={()=> this.props.openSignUpForm()}>Connect with...</ActionLink>;
    }

    return ProfileLink;
  }

  chatEndListener(event,data){
    socketConn.emit(data.eventType, data.data);
  }
  render() {
    let RedirectTo = this.getRedirectLocation();    
    let ChatAppLink = '';
    var username = "";
    var userType = "";
    if(this.state.faceBookID){
      username = this.state.faceBookID;
      userType = "facebook";
    }
    else if(this.state.linkedInID){
      username = this.state.linkedInID;
      userType = "linkedin";
    }
    
    ChatAppLink = <ChatApp loggedin={this.props.isAuthorized} userID={this.state.anonymousUserId}/>;

    if(this.state.userID && this.state.verfiedSocketConnection == false){
      var userData = {
        username: username,
        userType: userType,
        userID: this.state.userID,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
      socketConn.emit('UserLoggedIn', userData);      
    }

    if (!this.props.isAuthorized) {
      return (<LandingPage onCloseSignUpModal={() => this.props.closeSignUpForm()}
                 onHandleSignUpFacebook={()=>this.HandleSignUpFacebook()} 
                   onHandleSignUpLinkedIn={()=>this.HandleSignUpLinkedIn()}
                     isSignUpFormOpen={this.props.isSignUpFormOpen}
                       pathname={this.props.history.location.pathname}/>
      );
    }

    return (
      <div className="outer-container">
        <Main onHandleStartSearch={() => this.handleStartSearch()} onHandleChange={(e) => this.handleChange(e)}
        onHandleSearchClicked={() => this.handleStartSearch()} isFetchInProgress={this.props.isFetchInProgress}
        onCloseSignUpModal={() => this.props.closeSignUpForm()} isSignUpFormOpen={this.props.isSignUpFormOpen}
        onAuthorizeLinkedIn={(id) => this.handleAuthorizeLinked(id)} onAuthorizeFaceBook={(id) => this.handleAuthorizeFaceBook(id)}
        onHandleSignUpFacebook={()=>this.HandleSignUpFacebook()} onHandleSignUpLinkedIn={()=>this.HandleSignUpLinkedIn()}
        onFetchAllTasks={(publishedOnly)=>this.props.fetchAllTasks(publishedOnly)}
        isAuthorized={this.props.isAuthorized}
        pathname={this.props.history.location.pathname}
        isOpenSearchResultsPending={this.props.isOpenSearchResultsPending}
        openSignUpForm={this.props.openSignUpForm}
        searchQuery={this.props.searchQuery}
        onHandleQueryChange={this.props.setSearchQuery}
        currentUserId={this.props.userProfile._id}
        userProfile={this.props.userProfile}
        isFetchInProgress={this.props.isFetchInProgress}/>
        {ChatAppLink}
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
  searchQuery: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  exactLocation: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  
  openUserProfile: PropTypes.func.isRequired,
  openSearchResults: PropTypes.func.isRequired,
  fetchResultsInitiate: PropTypes.func.isRequired,
  fetchResultsComplete: PropTypes.func.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  closeSignUpForm: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  fetchAllTasks: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  openUserProfile: bindActionCreators(openUserProfile, dispatch),
  openSearchResults: bindActionCreators(openSearchResults, dispatch),
  fetchResultsInitiate: bindActionCreators(fetchResultsInitiate, dispatch),
  fetchResultsComplete: bindActionCreators(fetchResultsComplete, dispatch),
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  closeSignUpForm: bindActionCreators(closeSignUpForm, dispatch),
  fetchUserProfile: bindActionCreators(fetchUserProfile, dispatch),
  fetchAllTasks: bindActionCreators(fetchAllTasks, dispatch),
  fetchResults: bindActionCreators(fetchResults, dispatch),
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

const mapStateToProps = state => ({
  isOpenProfilePending: state.isOpenProfilePending,
  isOpenSearchResultsPending: state.isOpenSearchResultsPending,
  isFetchInProgress: state.isFetchInProgress,
  isSignUpFormOpen: state.isSignUpFormOpen,
  searchQuery: state.searchQuery,
  isAuthorized: state.userProfile.isAuthorized,
  userProfile: state.userProfile.profile,
  exactLocation: state.exactLocation,
  searchResults: state.searchResults,
  //TODO: entire store is not needed here, remove after more robust debugging approach is found
  store: state,
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(App)));