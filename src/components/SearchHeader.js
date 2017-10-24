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

import {selectResultsCategory} from '../redux/actions/actions'
import "../css/searchHeader.css"

import DemoCarousel from './DemoCarousel'

import RoadmapsWidget from './RoadmapsWidget';

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {query : this.props.query, roadmaps: []}
  }

  onStartSearch(e) {
    e.preventDefault();
    if (!this.props.isFetchInProgress) {
      this.fetchRoadmapsFromBackend();
      this.props.onHandleSearchClicked();
    }
  }

  componentWillMount() {
    this.fetchRoadmapsFromBackend();
  }

  handleValueChange(e) {
    let copy = Object.assign({}, this.state, {query: e.target.value});
    this.setState(copy);

    this.props.onHandleQueryChange(e.target.value);
  }

  handleSelectCategory(e) {
    this.props.selectResultsCategory(e.currentTarget.id);
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
        value={this.state.query} onChange={(e) => this.handleValueChange(e)}/>
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

  renderResultsNavigation() {
    return (<div>
      <div className="col-lg-12">
        <h2>Roadmaps</h2>
         <div className="row">
         <RoadmapsWidget roadmaps={this.state.roadmaps} isFetchInProgress={this.props.isFetchInProgress}/>
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
      {this.renderResultsNavigation()}
    </div>
    </span>
    );
  }
  
  fetchRoadmapsFromBackend() {
    if (this.state.query) {
      Axios.get(`${ConfigMain.getBackendURL()}/findRoadmaps?query=${this.state.query}`)
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
      if (this.state.query) {
        Axios.get(`${ConfigMain.getBackendURL()}/roadmapFromBookmark?bookmarkType=${bookmark.type}&jobKey=${bookmark.jobkey}`)
        .then((response) =>this.handleFetchBookmarkRoadmap(response))
        .catch((error) =>this.handleFetchBookmarkRoadmapError(error));
      }
    }
  }

  handleFetchBookmarkRoadmap(response) {
    const roadmap = response.data;

    console.log("Found roadmap from bookmark: ");
    console.dir(roadmap);

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
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch)
})

SearchHeader.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  numBookmarks: PropTypes.number.isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
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
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchHeader));