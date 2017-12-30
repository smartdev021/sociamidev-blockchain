/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/appearance.css"
import "~/src/theme/layout.css"
import "~/src/theme/css/trendScanner.css"

import {
  selectResultsCategory,
} from '~/src/redux/actions/fetchResults'

import {openSearchResultsComplete} from '~/src/redux/actions/fetchResults'

import ResultCategory from '~/src/common/ResultCategoryNames'

import TrendScannerNavigation from '~/src/theme/components/trends/TrendScannerNavigation'

class TrendScanner extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.openSearchResultsComplete();
  }

  handleSelectCategory(e) {
    this.props.selectResultsCategory(e.currentTarget.id);
  }

  trimmedString(original, limit) {
    let trimmed = original.substr(0, limit);
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
    return trimmed;
  }

  renderJobs() {
    return (
      <ul>
        {
          this.props.searchResults.jobs.map(function(job, i) {

            let title = job.jobtitle;
            let company = job.company ? job.company: "N/A";

            return (<li key={i}>
            <div className="list-item">
              <div id="icons">
                <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
              </div>
              <a href={job.url} target="_blank" id="text">
                <div>{title}</div>
                <div>{company}</div>
                <div>{job.country}</div>
              </a>
            </div>
          </li>);
          })
        }
      </ul>
    );
  }

  renderTrainings() {
    return (
      <ul>
        {
          this.props.searchResults.courses.map(function(course, i) {
            return (<li key={i}>
            <div className="list-item">
              <div id="icons">
                <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
              </div>
              <a href={course.url} target="_blank" id="text">
                <div>{course.title}</div>
                <div>{course.price}</div>
              </a>
            </div>
          </li>);
          })
        }
      </ul>
    );
  }

  renderEvents() {
    let that = this;
    return (
      <ul>
        {
          this.props.searchResults.events.map(function(event, i) {

            let title = that.trimmedString(event.name, 60);
            let description = that.trimmedString(event.description, 120);

            return (<li key={i}>
            <div className="list-item">
              <div id="icons">
                <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
              </div>
              <a href={event.url} target="_blank" id="text">
                <div>{title}</div>
                <div>{description}</div>
              </a>
            </div>
          </li>);
          })
        }
      </ul>
    );
  }

  renderGigs() {
    return (
      <ul>
        {
          this.props.searchResults.gigs.map(function(gig, i) {
            return (<li key={i}>
            <div className="list-item">
              <div id="icons">
                <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
              </div>
              <a href={gig.url} target="_blank" id="text">
                <div>{gig.title}</div>
                <div>{gig.description}</div>
                <div>Hong Kong</div>
              </a>
            </div>
          </li>);
          })
        }
      </ul>
    );
  }

  renderResults() {
    if (this.props.isFetchInProgress) {
      return <h3>Searching... <Icon spin name="spinner"/></h3>;
    }
    else {
      switch (this.props.resultsSelectedCategory) {
        case ResultCategory.GIGS_FREELANCER: {
          return this.renderGigs();
        }
        case ResultCategory.COURSES_UDEMY: {
          return this.renderTrainings();
        }
        case ResultCategory.EVENTS_EVENTBRITE: {
          return this.renderEvents();
        }
        default:
          return this.renderJobs();
      }
    }
  }

  render() {
    const ScannerResults = this.renderResults();

    return (
      <div id="main-content_1">
        <div id="trend-scanner">
          <TrendScannerNavigation onHandleSelectCategory={(e) => this.handleSelectCategory(e)} 
            resultsSelectedCategory={this.props.resultsSelectedCategory}/>
        <div id="trend-scanner-results">
          {ScannerResults}
        </div>
      </div>
    </div>
    );
  }
}

TrendScanner.propTypes = {
  selectResultsCategory: PropTypes.func.isRequired,
  resultsSelectedCategory: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  openSearchResultsComplete: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  resultsSelectedCategory: state.resultsSelectedCategory,
  searchResults : state.searchResults,
  isFetchInProgress : state.isFetchInProgress,
})

const mapDispatchToProps = dispatch => ({
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch),
  openSearchResultsComplete: bindActionCreators(openSearchResultsComplete, dispatch),
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(TrendScanner);