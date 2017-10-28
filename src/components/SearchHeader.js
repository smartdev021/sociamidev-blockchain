/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Axios from 'axios'
import ConfigMain from '../../configs/main'

import ActionLink from './ActionLink'

import {
  selectResultsCategory,
  openSignUpForm,
} from '../redux/actions/actions'
import "../css/searchHeader.css"

import DemoCarousel from './DemoCarousel'

import RoadmapsWidget from './RoadmapsWidget';

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {searchQuery : this.props.searchQuery, roadmaps: []}
  }

  onStartSearch(e) {
    e.preventDefault();
    if (!this.props.isFetchInProgress) {
      this.fetchRoadmapsFromBackend();
      this.props.onHandleStartSearch();
    }
  }

  componentWillMount() {
    this.fetchRoadmapsFromBackend();
  }

  handleValueChange(e) {
    let copy = Object.assign({}, this.state, {searchQuery: e.target.value});
    this.setState(copy);

    this.props.onHandleQueryChange(e.target.value);
  }

  handleSelectCategory(e) {
    this.props.selectResultsCategory(e.currentTarget.id);
  }

  handleSaveRoadmaps() {
    if (!this.props.isAuthorized) {
      this.props.openSignUpForm();
    }
    else {
      console.log("Saving roadmaps to backend...");

      this.saveUserRoadmapsToDatabase();
    }
  }

  /*parseRoadmapsForURL() {
    let result = "";

    let roadmaps = this.state.roadmaps;

    if (roadmaps.length > 0) {
      for (let i = 0; i < roadmaps.length; ++i) {
        result += "roadmaps=" + JSON.stringify(roadmaps[i]);
        if (i < roadmaps.length - 1) {
          result += '&';
        }
      }
    }

    return result;
  }*/

  parseRoadmapsForURL() {
    let result = "";

    let roadmaps = this.props.addedRoadmaps;

    if (roadmaps.length > 0) {
      for (let i = 0; i < roadmaps.length; ++i) {
        result += "roadmaps=" + roadmaps[i]._id;
        if (i < roadmaps.length - 1) {
          result += '&';
        }
      }
    }

    return result;
  }

  saveUserRoadmapsToDatabase() {
    let url = `${ConfigMain.getBackendURL()}/saveUserRoadmaps?userId=${this.props.userProfile._id}`;

    let parsedRoadmaps = this.parseRoadmapsForURL();

    if (parsedRoadmaps != "") {
      url += '&' + parsedRoadmaps;
    }

    console.log("saveUserRoadmapsToDatabase");
    console.log(url);

    Axios.get(url)
    .then((response) =>this.handlesaveUserRoadmapsToDatabase(response))
    .catch((error) =>this.handlesaveUserRoadmapsToDatabaseError(error));
  }

  handlesaveUserRoadmapsToDatabase(response) {
    console.log("handlesaveUserRoadmapsToDatabase: " + response.status);
  }
    
  handlesaveUserRoadmapsToDatabaseError(error) {
    console.log("handlesaveUserRoadmapsToDatabaseError: " + error);
  }

  renderForm() {
    const waitingText = (this.props.isFetchInProgress) ? <b>(Wait...)</b> : "";
    const inputPlaceHolder = "Key in a job or a skill you are exploring";
    const buttonText = "Check out the future!";

    const liClassNameJobs = "glyphicon glyphicon-briefcase text-center glyphicon-big li-with-spacing";
    const liClassNameEvents = "glyphicon glyphicon-calendar text-center glyphicon-big li-with-spacing";
    const liClassNameTraining = "glyphicon glyphicon-education text-center glyphicon-big li-with-spacing";
    const liClassNameGigs = "glyphicon glyphicon-list-alt text-center glyphicon-big li-with-spacing";

    const linkJobsClassName = this.props.currentCategory == "RESULTS_CATEGORY_JOBS" ? 'customLinkActive' : "customLink";
    const linkEventsClassName = this.props.currentCategory == "RESULTS_CATEGORY_EVENTS" ? 'customLinkActive' : "customLink";
    const linkCoursesClassName = this.props.currentCategory == "RESULTS_CATEGORY_COURSES" ? 'customLinkActive' : "customLink";
    const linkGigsClassName = this.props.currentCategory == "RESULTS_CATEGORY_GIGS" ? 'customLinkActive' : "customLink";

    return (
    <form className="form-inline" action="#" onSubmit={(e) => this.onStartSearch(e)}>
      <div className="form-group">
        <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" placeholder={inputPlaceHolder} 
        value={this.state.searchQuery} onChange={(e) => this.handleValueChange(e)}/>
      </div>
      <ul className="nav navbar-nav pull-right nav_results_categories">
        <ActionLink className={linkJobsClassName} id="RESULTS_CATEGORY_JOBS" onClick={(e) => this.handleSelectCategory(e)}>
          <li className={liClassNameJobs}><p className="glyphicon-text">Jobs</p></li>
        </ActionLink>
        
        <ActionLink className={linkEventsClassName} id="RESULTS_CATEGORY_EVENTS" onClick={(e) => this.handleSelectCategory(e)}>
          <li className={liClassNameEvents}><p className="glyphicon-text">Events</p></li>
        </ActionLink>
        
        <ActionLink className={linkCoursesClassName} id="RESULTS_CATEGORY_COURSES" onClick={(e) => this.handleSelectCategory(e)}>
          <li className={liClassNameTraining}><p className="glyphicon-text">Training</p></li>
        </ActionLink>
        
        <ActionLink className={linkGigsClassName} id="RESULTS_CATEGORY_GIGS" onClick={(e) => this.handleSelectCategory(e)}>
          <li className={liClassNameGigs}><p className="glyphicon-text">Gigs</p></li>
        </ActionLink>
      </ul>
      <button type="button" className="btn btn-warning btn-lg" onClick={(e) => this.onStartSearch(e)}>{buttonText}{waitingText}</button>
    </form>)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numBookmarks != this.props.numBookmarks && this.props.numBookmarks > 0) {
      let latestBookmark = this.props.bookmarks[this.props.bookmarks.length-1];

      this.fetchBookmarkRoadmapFromBackend(latestBookmark);
    }
  }

  renderSaveRoadmaps() {
    if (this.props.addedRoadmaps.length > 0) {
      return (
        <div className="col-lg-12">
          <div className="saveRoadmaps">
            <button type="button" className="btn btn-warning btn-lg" onClick={()=>this.handleSaveRoadmaps()}>Save</button>
          </div>
        </div>);
    }
    else {
      return null;
    }
  }

  renderRoadmaps() {
    return (<div>
      <div className="col-lg-12">
        <h2>Roadmaps</h2>
         <div className="row">
         <RoadmapsWidget roadmaps={this.state.roadmaps} isFetchInProgress={this.props.isFetchInProgress} 
         openSignUpForm={this.props.openSignUpForm} addedRoadmaps={this.props.addedRoadmaps}/>
         </div>
         <div className="row">
           {this.renderSaveRoadmaps()}
          </div>
      </div>
      </div>);
  }

  render() {
    return (<span className="results_header">
    <div className="row">
      <div className="col-lg-12">
       {this.renderForm()}
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12">
      <span className="glyphicon glyphicon-book text-center glyphicon-big pull-right"><p className="glyphicon-text">Bookmarks({this.props.numBookmarks})</p></span>
      </div>
    </div>
    <div className="row">
      {this.renderRoadmaps()}
    </div>
    </span>
    );
  }
  
  fetchRoadmapsFromBackend() {
    if (this.props.searchQuery) {
      Axios.get(`${ConfigMain.getBackendURL()}/findRoadmaps?query=${this.props.searchQuery}`)
      .then((response) =>this.handleRoadmapsFetch(response))
      .catch((error) =>this.handleRoadmapsFetchError(error));
    }
  }

  handleRoadmapsFetch(response) {
    const matchingRoadmaps = response.data.results;

    let copy = Object.assign({}, this.state, {roadmaps: matchingRoadmaps});
    this.setState(copy);
  }
    
  handleRoadmapsFetchError(error) {
    let copy = Object.assign({}, this.state, {roadmaps: []});
    this.setState(copy);
  }

  fetchBookmarkRoadmapFromBackend(bookmark) {
    if (bookmark.type == "indeed_job") {
      if (this.props.searchQuery) {
        Axios.get(`${ConfigMain.getBackendURL()}/roadmapFromBookmark?bookmarkType=${bookmark.type}&jobKey=${bookmark._id}`)
        .then((response) =>this.handleFetchBookmarkRoadmap(response))
        .catch((error) =>this.handleFetchBookmarkRoadmapError(error));
      }
    }
  }

  handleFetchBookmarkRoadmap(response) {
    const roadmap = response.data;
  }
    
  handleFetchBookmarkRoadmapError(error) {
    console.log("handleFetchBookmarkRoadmapError: " + error);
  }

  handleRoadmapsFetch(response) {
    const matchingRoadmaps = response.data.results;

    let copy = Object.assign({}, this.state, {roadmaps: matchingRoadmaps});
    this.setState(copy);
  }
    
  handleRoadmapsFetchError(error) {
    let copy = Object.assign({}, this.state, {roadmaps: []});
    this.setState(copy);
  }

}
const mapDispatchToProps = dispatch => ({
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch),
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
})

SearchHeader.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  numBookmarks: PropTypes.number.isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  userProfile: PropTypes.object.isRequired,
  addedRoadmaps: PropTypes.arrayOf(PropTypes.object).isRequired,

  openSignUpForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentCategory: state.currentCategory,
  numJobs: state.searchResults.numJobs,
  numCourses: state.searchResults.numCourses,
  numEvents: state.searchResults.numEvents,
  numGigs: state.searchResults.numGigs,
  isFetchInProgress: state.isFetchInProgress,
  numBookmarks: state.bookmarks.amount,
  bookmarks: state.bookmarks.bookmarks,
  searchQuery: state.searchQuery,
  userProfile: state.userProfile,
  addedRoadmaps: state.userRoadmaps.roadmaps,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchHeader));