/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import JobsList from './containers/JobsList';
import EventBriteItemList from './containers/EventBriteItemList';
import UdemyItemList from './containers/UdemyItemList';
import FreelancerProjectItemList from './containers/FreelancerProjectItemList';

class SearchResults extends React.Component {
  render() {
    const jobsList = (this.props.currentCategory == "RESULTS_CATEGORY_JOBS") 
    ? <JobsList items={this.props.jobItems} onAddToFavorites={(e) => this.props.onHandleAddJobToFavorites(e)}/> : null;
    
    const eventsList = (this.props.currentCategory == "RESULTS_CATEGORY_EVENTS") 
    ? <EventBriteItemList items={this.props.eventBriteItems} onAddToFavorites={(e) => this.props.onHandleAddEventToFavorites(e)}/> : null;
    
    const udemyCoursesList = (this.props.currentCategory == "RESULTS_CATEGORY_COURSES") 
    ? <UdemyItemList items={this.props.udemyItems} onAddToFavorites={(e) => this.props.onHandleAddCourseToFavorites(e)}/> : null;
    
    const freelancerProjectList = (this.props.currentCategory == "RESULTS_CATEGORY_GIGS") 
    ? <FreelancerProjectItemList items={this.props.freelancerProjectItems} 
        onAddToFavorites={(e) => this.props.onHandleAddFreelancerProjectToFavorites(e)}/> : null;
    
    return (
        <div className="row mt left">
        <div className="col-lg-12">
            {jobsList}    
            {eventsList}
            {udemyCoursesList}
            {freelancerProjectList}
        </div>
      </div>
    );
  }

}

SearchResults.propTypes = {
  currentCategory: PropTypes.string.isRequired,
}
  
const mapStateToProps = state => ({
  currentCategory: state.currentCategory
})
  
//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps)(SearchResults));