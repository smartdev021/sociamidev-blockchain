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

//twilli_air
import HomePageTwilliAir from '../twilli_air/HomePage.js';
import AboutTwilliAir from '../twilli_air/About.js';
import HowItWorksTwilliAir from '../twilli_air/HowItWorks.js';
import ICOTwilliAir from '../twilli_air/ICO.js';
import RoadmapTwilliAir from '../twilli_air/Roadmap.js';
import SearchPageTwilliAir from '../twilli_air/SearchPage.js'


class Main extends React.Component {
  render() {
    return (
      <main>
      <SignUpFormPopup modalIsOpen={this.props.isSignUpFormOpen} 
          onCloseModal={() => this.props.onCloseSignUpModal()}
          onHandleSignUpFacebook={()=>this.props.onHandleSignUpFacebook()}
          onHandleSignUpLinkedIn={()=>this.props.onHandleSignUpLinkedIn()}
      />
      <Switch>
        <Route exact path='/' render={routeProps => <HomePageTwilliAir {...routeProps}{...this.props}/>} />
        <Route exact path='/about' render={routeProps => <AboutTwilliAir {...routeProps}{...this.props}/>} />
        <Route exact path='/howItWorks' render={routeProps => <HowItWorksTwilliAir {...routeProps}{...this.props}/>} />
        <Route exact path='/ico' render={routeProps => <ICOTwilliAir {...routeProps}{...this.props}/>} />
        <Route exact path='/roadmap' render={routeProps => <RoadmapTwilliAir {...routeProps}{...this.props}/>} />
        <Route path='/searchResults' render={routeProps => <SearchPageTwilliAir {...routeProps}{...this.props}/>} />
        <Route path='/userProfile' render={routeProps => <UserProfile {...routeProps}{...this.props}/>} />)}/>
        <Route path='/authorize' render={routeProps => <Authorize {...routeProps}{...this.props}/>} />)}/>
  )}/>

      </Switch>
    </main>
    );
  }

}

export default Main;