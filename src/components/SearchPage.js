/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';

class HomePage extends React.Component {
  render() {
    return (<div className="container search_results" >
      <SearchHeader onHandleQueryChange={(query) => this.props.onHandleQueryChange(query)} 
      onHandleSearchClicked={(e) => this.props.onHandleStartSearch(e)} query={this.props.query} 
      isSearchInProgress={this.props.isSearchInProgress}
      numJobs={this.props.numJobs} numEvents={this.props.numEvents} numCourses={this.props.numCourses}
      onSelectCategory={(e) => this.props.onSelectCategory(e)} selectedCategory={this.props.selectedCategory}/>
        <SearchResults selectedCategory={this.props.selectedCategory}
        jobItems={this.props.jobItems}
        eventBriteItems={this.props.eventBriteItems}
        udemyItems={this.props.udemyItems}
        freelancerProjectItems={this.props.freelancerProjectItems}
        onHandleAddJobToFavorites={(e) => this.props.onHandleAddJobToFavorites(e)}
        onHandleAddEventToFavorites={(e) => this.props.onHandleAddEventToFavorites(e)}
        onHandleAddCourseToFavorites={(e) => this.props.onHandleAddCourseToFavorites(e)}
        onHandleAddFreelancerProjectToFavorites={(e) => this.props.onHandleAddFreelancerProjectToFavorites(e)}/>
      </div>
    );
  }

}

export default HomePage;