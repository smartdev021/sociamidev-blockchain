/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'
import DetailsPopup from '~/src/theme/components/DetailsPopupLatestTask';

import ProgressionTreesLanding from '~/src/theme/ProgressionTreesLanding';
import TaskManagement from '~/src/theme/TaskManagement';

import {
  setSearchQuery,
} from '~/src/redux/actions/fetchResults'

const MAX_LATEST_TASKS = 3;
const TaskTypesToNameMap = {find_mentor: "Find Mentor",};

import "~/src/theme/css/homePage.css"

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Landing page will be here</h1>;
  }
}

LandingPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized,
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);