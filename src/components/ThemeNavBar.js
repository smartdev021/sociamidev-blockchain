/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import FaceBookLoginComponent from './FaceBookLogin';
import LinkedInLoginComponent from './LinkedInLogin';

class ThemeNavBar extends React.Component {
  render() {
    const FaceBookLoginButton =
    <span className>
      <FaceBookLoginComponent/>
    </span>;

    return (
        <div className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#"><b>Sociami</b></a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Already a member?</a></li>
          <li>{FaceBookLoginButton}</li>
          <li><LinkedInLoginComponent/></li>
        </ul>
    </div>
  </div>
  </div>
    );
  }

}

export default ThemeNavBar;