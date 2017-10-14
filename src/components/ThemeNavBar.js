/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import ActionLink from './ActionLink'

class ThemeNavBar extends React.Component {
  render() {
const SettingsButton = (this.props.isAuthorized) ? <li><button className="btn btn-lg btn-info btn-block" type="button" 
onClick = {() => this.props.onHandleOpenSettings()}>Settings</button></li> : null;

    return (
        <div className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className='navbar-brand' to='/'>Sociami</Link>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><ActionLink text='Already a member?' onClick={(e)=> this.props.onHandleSignUp()}/></li>
          {SettingsButton}
        </ul>
    </div>
  </div>
  </div>
    );
  }

}

export default ThemeNavBar;