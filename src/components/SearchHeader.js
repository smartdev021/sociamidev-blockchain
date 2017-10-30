/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import "../css/searchHeader.css"

import DemoCarousel from './DemoCarousel'

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery : this.props.searchQuery,
    };
  }

  onStartSearch(e) {
    e.preventDefault();
    if (!this.props.isFetchInProgress) {
      this.props.onHandleStartSearch();
    }
  }

  handleValueChange(e) {
    let copy = Object.assign({}, this.state, {searchQuery: e.target.value});
    this.setState(copy);

    this.props.onHandleQueryChange(e.target.value);
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
    <form className="form-inline formSearchPage" action="#" onSubmit={(e) => this.onStartSearch(e)}>
      <div className="form-group">
        <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" placeholder={inputPlaceHolder} 
        value={this.state.searchQuery} onChange={(e) => this.handleValueChange(e)}/>
      </div>
      <button type="button" className="btn btn-lg btn-outline-inverse" onClick={(e) => this.onStartSearch(e)}>{buttonText}{waitingText}</button>
    </form>)
  }

  componentDidUpdate(prevProps, prevState) {
   /* if (prevProps.numBookmarks != this.props.numBookmarks && this.props.numBookmarks > 0) {
      let latestBookmark = this.props.bookmarks[this.props.bookmarks.length-1];

      this.fetchBookmarkRoadmapFromBackend(latestBookmark);
    }*/
  }

  render() {
    return (<span className="results_header">
      <div className="col-lg-12">
       {this.renderForm()}
      </div>
    </span>
    );
  }

  /*fetchBookmarkRoadmapFromBackend(bookmark) {
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
  }*/

}

SearchHeader.propTypes = {
  isFetchInProgress: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  isFetchInProgress: state.isFetchInProgress,
  searchQuery: state.searchQuery,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, null)(SearchHeader));