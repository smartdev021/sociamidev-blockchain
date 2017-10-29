/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
              <a href="#intro" className="link-scroll"><h2>Soqqle</h2></a>
            </div>
    
            <div id="mobile-menu-icon" className="visible-xs" onClick={()=>this.handleToggleMainMenu()}>
            <span className="glyphicon glyphicon-th"></span></div>

            <ul id="main-menu">
              <li id="menu-item-text" className="menu-item"><a href="#text">About</a></li>
              <li id="menu-item-carousel" className="menu-item"><a href="#carousel">How it Works</a></li>
              <li id="menu-item-grid" className="menu-item"><a href="#grid">ICO</a></li>
              <li id="menu-item-featured" className="menu-item"><a href="#featured">Results</a></li>
              <li id="menu-item-tabs" className="menu-item"><a href="#tabs">Roadmap</a></li>
            </ul>
          </section>
    );
  }

}

export default withRouter(MainMenuTwilliAir);