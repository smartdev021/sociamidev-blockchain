/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import HomePage from './HomePage';
import SearchPage from './SearchPage';

class Main extends React.Component {
  render() {
    /*return (
      <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/>
      </Switch>
    </main>
    )*/;

    return (<div>
      {this.props.currentPage != "search_results_page" &&
      <HomePage
      onHandleStartSearch={(e) => this.props.onHandleStartSearch(e)} onHandleChange={(e) => this.props.onHandleChange(e)}/>}
      <SearchPage onHandleQueryChange={(query) => this.props.onHandleQueryChange(query)} 
onHandleSearchClicked={(e) => this.props.onHandleStartSearch(e)} query={this.props.query} 
isSearchInProgress={this.props.isSearchInProgress}
numJobs={this.props.numJobs} numEvents={this.props.numEvents} numCourses={this.props.numCourses}
onSelectCategory={(e) => this.props.onSelectCategory(e)} selectedCategory={this.props.selectedCategory}
  selectedCategory={this.props.selectedCategory}
  jobItems={this.props.jobItems}
  eventBriteItems={this.props.eventBriteItems}
  udemyItems={this.props.udemyItems}
  freelancerProjectItems={this.props.freelancerProjectItems}
  onHandleAddJobToFavorites={(e) => this.props.onHandleAddJobToFavorites(e)}
  onHandleAddEventToFavorites={(e) => this.props.onHandleAddEventToFavorites(e)}
  onHandleAddCourseToFavorites={(e) => this.props.onHandleAddCourseToFavorites(e)}
  onHandleAddFreelancerProjectToFavorites={(e) => this.props.onHandleAddFreelancerProjectToFavorites(e)}/>

      />
     </div>
    );
  }

}

export default Main;