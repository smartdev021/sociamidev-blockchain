/*
    author: Alexander Zolotov
*/
import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import Axios from 'axios'
import ConfigMain from '~/configs/main'

import "~/src/theme/css/treebrowser.css"

import {
  selectResultsCategory,
} from '~/src/redux/actions/fetchResults'

import {
  fetchResults,
  setSearchQuery,
} from '~/src/redux/actions/fetchResults'

import TrendScannerComponent from '~/src/theme/components/trends/TrendScannerComponent';

class SkillBreakdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     skillInfo: undefined, 
    }
  }

  componentWillMount() {
    const url = `${ConfigMain.getBackendURL()}/skillGet?name=${this.props.skillName}`;
    const that = this;
    Axios.get(url)
      .then(function(response) {
        that.setState( {skillInfo: response.data} );
        console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
      that.setState( {skillInfo: undefined} );
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.skillInfo != this.state.skillInfo) {
      if (this.state.skillInfo) {
        this.props.setSearchQuery(this.state.skillInfo.skill);

        this.props.fetchResults("jobs_indeed", this.state.skillInfo.skill);
        this.props.fetchResults("events_eventbrite", searchQuery.skill);
        this.props.fetchResults("courses_udemy", searchQuery.skill);
        this.props.fetchResults("gigs_freelancer", searchQuery.skill);
      }
    }
  }

  handleSelectCategory(e) {
    this.props.selectResultsCategory(e.currentTarget.id);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="content-2-columns-left-title">
            <span>Skill Breakdown</span>
            <ActionLink className="skill-breakdown-control pull-right" id="button-arrow-back" onClick={()=> this.props.onCloseSkillBreakdown()}>
              <span className="glyphicon glyphicon-arrow-left"></span>
            </ActionLink>
            <button type="button" className="btn btn-md btn-outline-inverse skill-breakdown-control pull-right" 
                    onClick={()=> {} }>Hangout</button>
          </div>
        </div>
        {!this.state.skillInfo &&
          <div className="row">
            <div className="col-lg-12">
              <h3>Skill not Found!!!</h3>
            </div>
          </div>
        }
        <div className="row">
          <div className="col-lg-12">
            <p>{this.state.skillInfo && this.state.skillInfo.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>Related Sub-Skills</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>{this.state.skillInfo && this.state.skillInfo.relatedTopics}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div id="skill-breakdown-trend-scanner">
              <TrendScannerComponent onHandleSelectCategory={(e) => this.handleSelectCategory(e)}
                resultsSelectedCategory={this.props.resultsSelectedCategory}
                  isFetchInProgress={this.props.isFetchInProgress}
                    searchResults={this.props.searchResults}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SkillBreakdown.propTypes = {
  selectResultsCategory: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  resultsSelectedCategory: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  resultsSelectedCategory: state.resultsSelectedCategory,
  searchResults : state.searchResults,
  isFetchInProgress : state.isFetchInProgress,
});

const mapDispatchToProps = dispatch => ({
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch),
  fetchResults: bindActionCreators(fetchResults, dispatch),
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillBreakdown);