/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'


//THEME NEW
import HomePageThemeNew from '~/src/theme_new/HomePage.js';


class Main extends React.Component {
  render() {
    return (
      <main>
      <Switch>

        <Route path='/themeNew' render={routeProps => <HomePageThemeNew {...routeProps}{...this.props}/>} />)}/>
  )}/>

      </Switch>
    </main>
    );
  }

}

export default Main;