/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/navbarTop.css"

class NavTop extends React.Component {

  constructor(props) {
    super(props);
  }

  renderConnectionsView() {
    let ConnectionsViewLink = '';
    if (this.props.isAuthorized) {
      ConnectionsViewLink = <Link to='/connectionsView'><a href="#">
                    <img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/add-friend.png"/>
                    </a></Link>;
    }
    return ConnectionsViewLink;
  }


  render() {
    const ButtonClassName = "top-nav-btn";

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
                      <Link to='/searchResults' className={this.props.location.pathname == "/searchResults" 
                      ? ButtonClassName + " active" : ButtonClassName}>Trends Scanner</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                    <Link to='/progressionTrees' className={this.props.location.pathname == "/progressionTrees" 
                      ? ButtonClassName + " active" : ButtonClassName}>Progression Trees</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                      <Link to='/projectManagement' className={this.props.location.pathname == "/projectManagement" 
                      ? ButtonClassName + " active" : ButtonClassName}>Project Management</Link>
                    </p>
                  </li>
                  <li>
                    <p className="navbar-btn">
                      <Link to='/taskManagement' className={this.props.location.pathname == "/taskManagement" 
                      ? ButtonClassName + " active" : ButtonClassName}>Tasks Manager</Link>
                    </p>
                  </li>
                  {/*<li>
                    <p className="navbar-btn">
                      <Link to='/ico' className={this.props.location.pathname == "/ico" 
                      ? ButtonClassName + " active" : ButtonClassName}>ICO</Link>
                    </p>
                  </li>*/}
                  <li>
                    <p className="navbar-btn">
                      <Link to='/about' className={this.props.location.pathname == "/about" 
                      ? ButtonClassName + " active" : ButtonClassName}>About</Link>
                    </p>
                  </li>
                  <li className="nav-user-profile-control">
                    <a href="#"><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/close-envelope.png"/></a>
                  </li>
                  <li className="nav-user-profile-control">
                    <a href="#"><img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/notification.png"/></a>
                  </li>
                  <li className="nav-user-profile-control">
                  {this.renderConnectionsView()}
                  </li>
                </ul> 
             </div>
          </div>                              
        </nav>
      </div>
    );
  }
}

NavTop.PropTypes = {
  location: PropTypes.object.isRequired,
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(NavTop);