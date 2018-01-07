/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/appearance.css"
import "~/src/theme/layout.css"
import "~/src/theme/css/taskBrowser.css"

class TaskBrowser extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main-content_1">
      </div>
    );
  }
}

TaskBrowser.propTypes = {
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(TaskBrowser);