/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect} from 'react-router-dom'
//THEME NEW
import SignUpFormPopup from  '~/src/authentication/SignUpForm';

import SidebarLeft from '~/src/theme_new/SidebarLeft.js';
import NavTop from '~/src/theme_new/NavTop.js';
import ThemeHeader from '~/src/theme_new/ThemeHeader.js';

//routes
import Authorize from '~/src/authentication/Authorize';

import HomePage from '~/src/theme_new//HomePage.js';
import TrendScanner from '~/src/theme_new/TrendScanner.js';
import Roadmap from '~/src/theme/routes/Roadmap.js'; //Progression trees
import TaskManagement from '~/src/theme/routes/TaskManagement';
import ProjectManagement from '~/src/theme/routes/ProjectManager';
import About from '~/src/theme/routes/About.js';
import ICO from '~/src/theme/routes/ICO.js';

//<Route exact path='/howItWorks' render={routeProps => <HowItWorks {...routeProps}{...this.props}/>} />

class Main extends React.Component {

  getRedirectLocation() {
    let RedirectTo = null;
    if (this.props.isOpenSearchResultsPending) {
      if (this.props.location.pathname != '/searchResults') {
        RedirectTo = <Redirect to="/searchResults" push />;
      }
    }
    else if (this.props.isOpenProfilePending) {
      if (this.props.location.pathname != '/userProfile') {
        RedirectTo = <Redirect to="/userProfile" push />;
      }
    }

    console.log("RedirectTo: " + RedirectTo);

    return RedirectTo;
  }

  render() {
    const RedirectTo = this.getRedirectLocation();

    return (
      <div id="wrapper">
      {RedirectTo}
      {this.props.isSignUpFormOpen ? <SignUpFormPopup 
          modalIsOpen={this.props.isSignUpFormOpen}
          isAuthorized={this.props.isAuthorized}
          onCloseModal={() => this.props.onCloseSignUpModal()}
          onHandleSignUpFacebook={()=>this.props.onHandleSignUpFacebook()}
          onHandleSignUpLinkedIn={()=>this.props.onHandleSignUpLinkedIn()}
          pathname={this.props.pathname}
      />: null}
        <ThemeHeader openSignUpForm={this.props.openSignUpForm} isAuthorized={this.props.isAuthorized}/>
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
                        <NavTop location = {this.props.location}/>
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
                            <Route exact path='/roadmap' render={routeProps => <Roadmap {...routeProps}{...this.props}/>} />
                            <Route path='/taskManagement' render={routeProps => <TaskManagement {...routeProps}{...this.props}/>}/>
                            <Route path='/projectManagement' render={routeProps => <ProjectManagement {...routeProps}{...this.props}/>}/>
                            <Route exact path='/about' render={routeProps => <About {...routeProps}{...this.props}/>} />
                            <Route exact path='/ico' render={routeProps => <ICO {...routeProps}{...this.props}/>} />

                            <Route path='/authorize' render={routeProps => <Authorize {...routeProps}{...this.props}/>} />)}/>
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

export default withRouter(Main);