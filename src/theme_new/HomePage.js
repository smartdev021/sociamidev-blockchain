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
                <aside>
                  <div id="sidebar-left">
                    <div id="user-status-widget">
                      <div className="user-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          Good Morning Dan, update your status here
                        </div>
                      </div>
                      <hr></hr>
                      <div id="status-input-container">
                        <input type="text" autoComplete="off" id="status-input" placeholder="Testing"/>
                      </div>
                    </div>
                    <div id="list-friends">
                      <div className="friend-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          <div className="user-text-name">Annalisa</div>
                          Mobile app testing 50 mutual friends
                        </div>
                      </div>
                      <div className="friend-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          <div className="user-text-name">Annalisa</div>
                          Mobile app testing 50 mutual friends
                        </div>
                      </div>
                      <div className="friend-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          <div className="user-text-name">Annalisa</div>
                          Mobile app testing 50 mutual friends
                        </div>
                      </div>
                      <div className="friend-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          <div className="user-text-name">Annalisa</div>
                          Mobile app testing 50 mutual friends
                        </div>
                      </div>
                      <div className="friend-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          <div className="user-text-name">Annalisa</div>
                          Mobile app testing 50 mutual friends
                        </div>
                      </div>
                      <div className="friend-widget">
                        <img src='./images/dummy_friend_image.png'/>
                        <div id="user-text">
                          <div className="user-text-name">Annalisa</div>
                          Mobile app testing 50 mutual friends
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-lg-10">
                <main className>
                  <div className="container-fluid content-top">
                    <div className="row">
                      <div className="col-lg-12">
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
                                      <a href="#" className="btn btn-primary btn-lg top-nav-btn active">Trends Scanner</a>
                                    </p>
                                  </li>
                                  <li>
                                    <p className="navbar-btn">
                                      <a href="#" className="btn btn-primary btn-lg top-nav-btn">Progression Trees</a>
                                    </p>
                                  </li>
                                  <li>
                                    <p className="navbar-btn">
                                      <a href="#" className="btn btn-primary btn-lg top-nav-btn">Projects Manager</a>
                                    </p>
                                  </li>
                                  <li>
                                    <p className="navbar-btn">
                                      <a href="#" className="btn btn-primary btn-lg top-nav-btn">Tasks Manager</a>
                                    </p>
                                  </li>
                                  <li className="nav-user-profile-control">
                                    <a href="#"><img src="./images/close-envelope.png"/></a>
                                  </li>
                                    <li className="nav-user-profile-control">
                                      <a href="#"><img src="./images/notification.png"/></a>
                                    </li>
                                  <li className="nav-user-profile-control">
                                      <a href="#"><img src="./images/add-friend.png"/></a>
                                  </li>
                                </ul> 
                              </div>
                            </div>
                          </nav>
                        </div>
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
                          <div id="trend-scanner">
                            <div id="navbar-trend-scanner">
                              <ul className="nav navbar-nav">
                                <li className="active"><a href="#">Gigs</a></li>
                                <li><a href="#">Trainings</a></li>
                                <li><a href="#">Events</a></li>
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Soqqle Campaigns</a></li>
                                <li><a href="#">Bookmarks <span id="bookmark-chevron" 
                                  className="glyphicon glyphicon-menu-down"></span></a></li>
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