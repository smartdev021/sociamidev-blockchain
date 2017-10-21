/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import ActionLink from './ActionLink'

class ThemeNavBar extends React.Component {
  render() {
let ProfileLink = '';
if (this.props.isAuthorized) {
  ProfileLink = <Link className='navbar-brand' to='/userProfile'>Your account</Link>;
}
else
{
  ProfileLink = <ActionLink onClick={()=> this.props.onHandleSignUp()}>Already a member?</ActionLink>;
}

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
          <li>{ProfileLink}</li>
        </ul>
    </div>
  </div>
  </div>
    );
  }

}

export default ThemeNavBar;