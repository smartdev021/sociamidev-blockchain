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

class TrendScanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="trend-scanner">
        <div id="navbar-trend-scanner">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Gigs</a></li>
            <li><a href="#">Trainings</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Soqqle Campaigns</a></li>
            <li><a href="#">Bookmarks <span id="bookmark-chevron" className="glyphicon glyphicon-menu-down"></span></a></li>
          </ul>
        </div>
        <div id="trend-scanner-results">
          <ul>
            <li>
              <div className="list-item">
                <div id="icons">
                  <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                  <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
                </div>
                <a href="#" id="text">
                  <div>WED, 6 DEC 6:30 PM (free)</div>
                  <div>LAToken Blockchain Reception: Hong Kong</div>
                  <div>Hong Kong</div>
                </a>
              </div>
            </li>
            <li>
              <div className="list-item">
                <div id="icons">
                  <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                  <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
                </div>
                <a href="#" id="text">
                  <div>WED, 6 DEC 6:30 PM (free)</div>
                  <div>LAToken Blockchain Reception: Hong Kong</div>
                  <div>Hong Kong</div>
                </a>
              </div>
            </li>
            <li>
              <div className="list-item">
                <div id="icons">
                  <a href="#"><span className="glyphicon glyphicon-tag"></span></a>
                  <a href="#"><div><i className="fa fa-share-alt" aria-hidden="true"></i></div></a>
                </div>
                <a href="#" id="text">
                  <div>WED, 6 DEC 6:30 PM (free)</div>
                  <div>LAToken Blockchain Reception: Hong Kong</div>
                  <div>Hong Kong</div>
                </a>
              </div>
            </li>            
          </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(TrendScanner);