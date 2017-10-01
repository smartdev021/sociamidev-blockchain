/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import "../css/searchHeader.css"

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {query : this.props.query};
  }

  handleValueChange(e) {
    let copy = Object.assign({}, this.state, {query: e.target.value});
    this.setState(copy);

    this.props.onHandleQueryChange(e.target.value);
  }

  renderForm() {
    const waitingText = (this.props.isSearchInProgress) ? <b>(Wait...)</b> : "";
    const inputPlaceHolder = "Key in a job or a skill you are exploring";
    const buttonText = "Check out the future!";

    return (
    <form className="form-inline" action="#" onSubmit={this.props.onHandleSearchClicked}>
      <div className="form-group">
        <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" placeholder={inputPlaceHolder} 
        value={this.state.query} onChange={(e) => this.handleValueChange(e)}/>
      </div>
      <button type="button" className="btn btn-warning btn-lg" onClick={this.props.onHandleSearchClicked}>{buttonText}{waitingText}</button>
    </form>)
  }

  renderResultsNavigation() {
    const selectedCategory = this.props.selectedCategory;
    console.log("selectedCategory: " + selectedCategory);
    return (<span>
      <div className="col-lg-6">
         <div className="trend_widget">
         Trend Rating
         </div>
      </div>
       <div className="col-lg-2">
         <div className="navigation_button" id="category_jobs" onClick={this.props.onSelectCategory}>
         Jobs
         <hr></hr>
         <h1>{this.props.numJobs}</h1>
         <hr></hr>
         </div>
      </div>
      <div className="col-lg-2">
      <div className="navigation_button" id="category_events" onClick={this.props.onSelectCategory}>
      Events
      <hr></hr>
      <h1>{this.props.numEvents}</h1>
      <hr></hr>
         </div>
      </div>
      <div className="col-lg-2">
      <div className="navigation_button" id="category_courses" onClick={this.props.onSelectCategory}>
         Courses
         <hr></hr>
         <h1>{this.props.numCourses}</h1>
         <hr></hr>
         </div>
      </div>
      </span>);
  }

  render() {
    return (<span>
    <div className="row mt left">
      <div className="col-lg-12">
       {this.renderForm()}
      </div>
    </div>
    <div className="row mt left">
      {this.renderResultsNavigation()}
    </div>
    </span>
    );
  }

  

}

export default SearchHeader;