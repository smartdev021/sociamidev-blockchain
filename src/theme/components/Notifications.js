/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/notifications.css"

class Notifications extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClickOutside() {
    console.log("HANGLE CLICK OUTSIDE");
    this.props.onClose();
  }

  render() {
    return (
        <div id="notifications-widget">
        </div>
    );
  }
}

Notifications.PropTypes = {
    isAuthorized: PropTypes.bool.isRequired,
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(require('react-click-outside')(Notifications));