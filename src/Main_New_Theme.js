/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
//THEME NEW
import SignUpFormPopup from  '~/src/authentication/SignUpForm';

import SidebarLeft from '~/src/theme_new/SidebarLeft.js';
import NavTop from '~/src/theme_new/NavTop.js';
import ThemeHeader from '~/src/theme_new/ThemeHeader.js';

import HomePage from '~/src/theme/routes/HomePage.js';
import TrendScanner from '~/src/theme_new/TrendScanner.js';

//<Route exact path='/howItWorks' render={routeProps => <HowItWorks {...routeProps}{...this.props}/>} />

class Main extends React.Component {
  render() {
    return (
      <div id="wrapper">
      {this.props.isSignUpFormOpen ? <SignUpFormPopup 
          modalIsOpen={this.props.isSignUpFormOpen}
          isAuthorized={this.props.isAuthorized}
          onCloseModal={() => this.props.onCloseSignUpModal()}
          onHandleSignUpFacebook={()=>this.props.onHandleSignUpFacebook()}
          onHandleSignUpLinkedIn={()=>this.props.onHandleSignUpLinkedIn()}
          pathname={this.props.pathname}
      />: null}
        <ThemeHeader/>
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
                          <Switch>
                            <Route exact path='/' render={routeProps => <HomePage {...routeProps}{...this.props}/>} />
                            <Route path='/searchResults' render={routeProps => <TrendScanner {...routeProps}{...this.props}/>} />
                          </Switch>
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

export default Main;