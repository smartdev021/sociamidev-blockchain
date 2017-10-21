/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import HeadWrap from './HeadWrap';
import ThemeMainContainer from './ThemeMainContainer';
import ThemeInviteMeContainer from './ThemeInviteMeContainer';
import ThemeMeetTheTeamContainer from './ThemeMeetTheTeamContainer';
import ThemeCarouselContainer from './ThemeCarouselContainer';

class HomePage extends React.Component {
  render() {

    return (<div>
      <HeadWrap onHandleStartSearch={(e) => this.props.onHandleStartSearch(e)} 
      onHandleChange={(e) => this.props.onHandleChange(e)} 
      isFetchInProgress={this.props.isFetchInProgress}/>
      <ThemeMainContainer/>
      <ThemeCarouselContainer/>
      <ThemeInviteMeContainer/>
      <ThemeMeetTheTeamContainer/></div>
    );
  }

}

export default HomePage;