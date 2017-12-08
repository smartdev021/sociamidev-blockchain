/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme_new/appearance.css"
import "~/src/theme_new/layout.css"

class NavTop extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="nav-top">
        <nav className="navbar navbar-default navbar-right">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-content-top">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                                                        
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-content-top">
                <ul className="nav navbar-nav">
                  <li>
                    <p className="navbar-btn">
                      <Link to='/searchResults' className="btn btn-primary btn-lg top-nav-btn">Trends Scanner</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                    <Link to='/roadmap' className="btn btn-primary btn-lg top-nav-btn">Progression Trees</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                      <Link to='/projectManagement' className="btn btn-primary btn-lg top-nav-btn">Project Management</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                      <Link to='/taskManagement' className="btn btn-primary btn-lg top-nav-btn">Tasks Manager</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                      <Link to='/ico' className="btn btn-primary btn-lg top-nav-btn">ICO</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                      <Link to='/about' className="btn btn-primary btn-lg top-nav-btn">About</Link>
                    </p>
                  </li>
                  <li className="nav-user-profile-control">
                    <a href="#"><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/close-envelope.png"/></a>
                  </li>
                  <li className="nav-user-profile-control">
                    <a href="#"><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/notification.png"/></a>
                  </li>
                  <li className="nav-user-profile-control">
                    <a href="#"><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/add-friend.png"/></a>
                  </li>
                </ul> 
             </div>
          </div>                              
        </nav>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(NavTop);