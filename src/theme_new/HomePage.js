/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import SidebarLeft from '~/src/theme_new/SidebarLeft.js';
import NavTop from '~/src/theme_new/NavTop.js';
import TrendScanner from '~/src/theme_new/TrendScanner.js';

import "~/src/theme_new/appearance.css"
import "~/src/theme_new/layout.css"

class HomePageThemeNew extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wrapper">
        <header>
          <div id="soqqle_logo" className="pull-left"><a href="#"><img src='./images/soqqle.png'/></a></div>
          <div id="profile_link" className="pull-right"><a href="#"><span><img src="./images/profilesetting.png"/>logout</span></a></div>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div id="wrapper-content">
              <div className="col-lg-2">
                <SidebarLeft/>
              </div>
              <div className="col-lg-10">
                <main className>
                  <div className="container-fluid content-top">
                    <div className="row">
                      <div className="col-lg-12">
                        <NavTop/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div id="main-content_1-status">
                          project manager / stock trading / investment banking / risk analysis
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <div id="main-content_1">
                          <TrendScanner/>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(HomePageThemeNew);