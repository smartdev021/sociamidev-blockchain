/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

import {Icon} from 'react-fa'

import {
  setSearchQuery,
  selectResultsCategory,
} from '~/src/redux/actions/actions'

class SearchPageNavigation extends React.Component {
    handleSelectCategory(e) {
        this.props.selectResultsCategory(e.currentTarget.id);
      }

  render() {

    const jobClassName = this.props.currentCategory == "RESULTS_CATEGORY_JOBS" ? "active" : "";
    const eventClassName = this.props.currentCategory == "RESULTS_CATEGORY_EVENTS" ? "active" : "";
    const trainingClassName = this.props.currentCategory == "RESULTS_CATEGORY_COURSES" ? "active" : "";
    const gigClassName = this.props.currentCategory == "RESULTS_CATEGORY_GIGS" ? "active" : "";
      
    return (
        <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className={jobClassName}>
              <ActionLink href="#tabs-tab1" aria-controls="tabs-tab1" role="tab" 
                data-toggle="tab" id="RESULTS_CATEGORY_JOBS" onClick={(e) => this.handleSelectCategory(e)}>
                   <Icon className="icon" name="diamond"/><span>Job</span>
              </ActionLink>
            </li>
            <li role="presentation" className={eventClassName}>
              <ActionLink href="#tabs-tab2" aria-controls="tabs-tab2" role="tab" 
                data-toggle="tab" id="RESULTS_CATEGORY_EVENTS" onClick={(e) => this.handleSelectCategory(e)}>
                   <Icon className="icon" name="train"/><span>Event</span>
              </ActionLink>
            </li>
            <li role="presentation" className={trainingClassName}>
              <ActionLink href="#tabs-tab3" aria-controls="tabs-tab3" role="tab" 
                data-toggle="tab" id="RESULTS_CATEGORY_COURSES" onClick={(e) => this.handleSelectCategory(e)}>
                   <Icon className="icon" name="coffee"/><span>Training</span>
              </ActionLink>
            </li>
            <li role="presentation" className={gigClassName}>
              <ActionLink href="#tabs-tab3" aria-controls="tabs-tab3" role="tab" 
                data-toggle="tab" id="RESULTS_CATEGORY_GIGS" onClick={(e) => this.handleSelectCategory(e)}>
                   <Icon className="icon" name="comment"/><span>Gigs</span>
              </ActionLink>
            </li>
        </ul>);
  }
}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  isAuthorized: state.isAuthorized,
  currentCategory: state.currentCategory,
})

SearchPageNavigation.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  selectResultsCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(SearchPageNavigation)));