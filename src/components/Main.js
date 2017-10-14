/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import HomePage from './HomePage';
import SearchPage from './SearchPage';
import UserProfile from './UserProfile';
import Authorize from './Authorize';
import SignUpFormPopup from  '../authentication/SignUpForm';
import {Route, Switch} from 'react-router-dom'


class Main extends React.Component { 
  render() {
    return (
      <main>
      <SignUpFormPopup modalIsOpen={this.props.isSignUpFormOpen} onCloseModal={() => this.props.onCloseSignUpModal()} 
    onFaceBookLoginResponse = {(response) => this.props.onHandleFaceBookLoginResponse(response)}/>
      <Switch>
        <Route exact path='/' render={routeProps => <HomePage {...routeProps}{...this.props}/>} />
        <Route path='/searchResults' render={routeProps => <SearchPage {...routeProps}{...this.props}/>} />
        <Route path='/userProfile' render={routeProps => <UserProfile {...routeProps}{...this.props}/>} />)}/>
        <Route path='/authorize' render={routeProps => <Authorize {...routeProps}{...this.props}/>} />)}/>
  )}/>

      </Switch>
    </main>
    );
  }

}

export default Main;