/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme_new/appearance.css"
import "~/src/theme_new/layout.css"

class ThemeHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <header>
      <div id="soqqle_logo" className="pull-left"><a href="#"><img src='./images/soqqle.png'/></a></div>
      <div id="profile_link" className="pull-right"><a href="#"><span><img src="./images/profilesetting.png"/>logout</span></a></div>
    </header>);
  }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeHeader);