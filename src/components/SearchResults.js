/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import JobsList from './containers/JobsList';
import EventBriteItemList from './containers/EventBriteItemList';
import UdemyItemList from './containers/UdemyItemList';
import FreelancerProjectItemList from './containers/FreelancerProjectItemList';

class SearchResults extends React.Component {
  render() {
    const jobsList = (this.props.selectedCategory == "category_jobs") 
    ? <JobsList items={this.props.jobItems} onAddToFavorites={(e) => this.props.onHandleAddJobToFavorites(e)}/> : null;
    
    const eventsList = (this.props.selectedCategory == "category_events") 
    ? <EventBriteItemList items={this.props.eventBriteItems} onAddToFavorites={(e) => this.props.onHandleAddEventToFavorites(e)}/> : null;
    
    const udemyCoursesList = (this.props.selectedCategory == "category_courses") 
    ? <UdemyItemList items={this.props.udemyItems} onAddToFavorites={(e) => this.props.onHandleAddCourseToFavorites(e)}/> : null;
    
    const freelancerProjectList = (this.props.selectedCategory == "category_freelancer_projects") 
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

export default SearchResults;