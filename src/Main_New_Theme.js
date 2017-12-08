/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
//THEME NEW
import HomePageThemeNew from '~/src/theme_new/HomePage.js';
import SignUpFormPopup from  '~/src/authentication/SignUpForm';

//<Route exact path='/howItWorks' render={routeProps => <HowItWorks {...routeProps}{...this.props}/>} />

class Main extends React.Component {
  render() {
    return (
      <div>
      {this.props.isSignUpFormOpen ? <SignUpFormPopup 
          modalIsOpen={this.props.isSignUpFormOpen}
          isAuthorized={this.props.isAuthorized}
          onCloseModal={() => this.props.onCloseSignUpModal()}
          onHandleSignUpFacebook={()=>this.props.onHandleSignUpFacebook()}
          onHandleSignUpLinkedIn={()=>this.props.onHandleSignUpLinkedIn()}
          pathname={this.props.pathname}
      />: null}
      <Switch>
        <Route path='/' render={routeProps => <HomePageThemeNew {...routeProps}{...this.props}/>} />)}/>
  )}/>

      </Switch>
    </div>
    );
  }

}

export default Main;