/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import HomePage from './HomePage';
import SearchPage from './SearchPage';
import UserProfile from './UserProfile';
import {Route, Redirect, Switch} from 'react-router-dom'


class Main extends React.Component { 
  render() {
    let redirect = null;

    console.log("Props in Main");
    console.dir(this.props);
    return (
      <main>
      <Switch>
        <Route exact path='/' render={routeProps => <HomePage {...routeProps}{...this.props}/>} />
        <Route path='/searchResults' render={routeProps => <SearchPage {...routeProps}{...this.props}/>} />
        <Route path='/userProfile' render={routeProps => <UserProfile {...routeProps}{...this.props}/>} />)}/>
  )}/>

      </Switch>
    </main>
    );
  }

}

export default Main;