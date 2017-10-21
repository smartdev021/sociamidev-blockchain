/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import {selectResultsCategory} from '../redux/actions/actions'
import "../css/searchHeader.css"

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {query : this.props.query}
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
    return (<div className="container search_results" >
      <div className="col-lg-4">
         <div className="trend_widget">
         Trend Rating
         <div>
         <span className="glyphicon glyphicon-star"></span>
         <span className="glyphicon glyphicon-star"></span>
         <span className="glyphicon glyphicon-star-empty"></span>
         <span className="glyphicon glyphicon-star-empty"></span>
           </div>
         </div>
      </div>
       <div className="col-lg-2">
         <div className={"navigation_button " + (this.props.currentCategory == "RESULTS_CATEGORY_JOBS" ? 'active_category' : '')}
          id="RESULTS_CATEGORY_JOBS" onClick={(e) => this.handleSelectCategory(e)}>
         Jobs
         <div className="category_items_count">
         <hr></hr>
         <h1>{this.props.numJobs}</h1>
         <hr></hr>
         </div>
         </div>
      </div>
      <div className="col-lg-2">
      <div className={"navigation_button " + (this.props.currentCategory == "RESULTS_CATEGORY_EVENTS" ? 'active_category' : '')}
      id="RESULTS_CATEGORY_EVENTS" onClick={(e) => this.handleSelectCategory(e)}>
      Events
      <div className="category_items_count">
      <hr></hr>
      <h1>{this.props.numEvents}</h1>
      <hr></hr>
      </div>
         </div>
      </div>
      <div className="col-lg-2">
      <div className={"navigation_button " + (this.props.currentCategory == "RESULTS_CATEGORY_COURSES" ? 'active_category' : '')}
       id="RESULTS_CATEGORY_COURSES" onClick={(e) => this.handleSelectCategory(e)}>
         Courses
         <div className="category_items_count">
         <hr></hr>
         <h1>{this.props.numCourses}</h1>
         <hr></hr>
         </div>
         </div>
      </div>
      <div className="col-lg-2">
      <div className={"navigation_button " + (this.props.currentCategory == "RESULTS_CATEGORY_GIGS" ? 'active_category' : '')}
       id="RESULTS_CATEGORY_GIGS" onClick={(e) => this.handleSelectCategory(e)}>
         Freelancer Projects
         <div className="category_items_count">
         <hr></hr>
         <h1>{this.props.numGigs}</h1>
         <hr></hr>
         </div>
         </div>
      </div>
      </div>);
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

const mapDispatchToProps = dispatch => ({
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch)
})

SearchHeader.propTypes = {
  currentCategory: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  currentCategory: state.currentCategory,
  numJobs: state.searchResults.numJobs,
  numCourses: state.searchResults.numCourses,
  numEvents: state.searchResults.numEvents,
  numGigs: state.searchResults.numGigs,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchHeader));