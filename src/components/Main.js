/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import HeadWrap from './HeadWrap';
import ThemeMainContainer from './ThemeMainContainer';
import ThemeInviteMeContainer from './ThemeInviteMeContainer';
import ThemeMeetTheTeamContainer from './ThemeMeetTheTeamContainer';
import ThemeCarouselContainer from './ThemeCarouselContainer';

class Main extends React.Component {
  render() {
    /*return (
      <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/>
      </Switch>
    </main>
    )*/;

    return (<div>
      <HeadWrap onHandleStartSearch={(e) => this.props.onHandleStartSearch(e)} onHandleChange={(e) => this.props.onHandleChange(e)}/>
      <ThemeMainContainer/>
      <ThemeCarouselContainer/>
      <ThemeInviteMeContainer/>
      <ThemeMeetTheTeamContainer/></div>
    );
  }

}

export default Main;