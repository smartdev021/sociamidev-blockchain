/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/header.css"

class ThemeHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  onSignOut() {
    
  }

  renderProfileLink() {
    let ProfileLink = '';
    if (this.props.isAuthorized) {
      ProfileLink = 
      <div>
      <ActionLink onClick={() => this.onSignOut()}>
        <span><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/profilesetting.png" />logout</span>
      </ActionLink>
      <div className="rgt-setting">
        <span><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/profilesetting.png" />Setting</span>
        <ul className="setting-block">
          <li><Link to='/userProfile'>Profile</Link></li>
          <li><Link to='/' >Setting</Link></li>
          <li><Link to='/' >Help</Link></li>
        </ul>
      </div>
    </div>;
    }
    else
    {
      ProfileLink = <ActionLink onClick={()=> this.props.openSignUpForm()}>
        <span><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/profilesetting.png"/>login</span>
      </ActionLink>;
    }

    return ProfileLink;
  }

  render() {
    return (
    <header>
      <div id="soqqle_logo" className="pull-left"><Link to='/'><img src='http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/soqqle.png'/></Link></div>
      <div id="profile_link" className="pull-right">{this.renderProfileLink()}</div>
    </header>);
  }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeHeader);