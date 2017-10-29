/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import {
  setSearchQuery,
} from '../redux/actions/actions'

class MainMenuTwilliAir extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //Load 'functions.js'
     const script = document.createElement("functions_js_script");
     script.src = "http://sociamibucket.s3.amazonaws.com/twilli_air/assets/js/functions.js";
     document.getElementsByTagName('head')[0].appendChild(script);
  }

  handleToggleMainMenu() {
    window.toggle_main_menu();
  }

  render() {
    if (this.props.history.location.pathname == "/") {
      return null;
    }
const waitingText = (this.props.isFetchInProgress) ? <b>(Wait...)</b> : "";
    return (
          <section id="left-sidebar">
            <div className="logo">
            <Link className='link-scroll' to='/'><h3>Soqqle</h3></Link>
            </div>
    
            <div id="mobile-menu-icon" className="visible-xs" onClick={()=>this.handleToggleMainMenu()}>
            <span className="glyphicon glyphicon-th"></span></div>

            <ul id="main-menu">
              <li id="menu-item-text" className="menu-item"><Link to='/about'>About</Link></li>
              <li id="menu-item-carousel" className="menu-item"><Link to='/howItWorks'>How it Works</Link></li>
              <li id="menu-item-grid" className="menu-item"><Link to='/ico'>ICO</Link></li>
              <li id="menu-item-featured" className="menu-item"><Link to='/searchResults'>Results</Link></li>
              <li id="menu-item-tabs" className="menu-item"><Link to='/roadmap'>Roadmap</Link></li>
            </ul>
          </section>
    );
  }

}

export default withRouter(MainMenuTwilliAir);