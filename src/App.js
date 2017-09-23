import React, { Component } from 'react';
import SearchHeader from './components/SearchHeader';
import Jobs from './components/Jobs';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,400,900']
  }
});

//Finish me!

export default class App extends Component {
  render() {

    /*Nav Bar*/
    const NavBar = <div className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#"><b>FLATTY</b></a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Already a member?</a></li>
        </ul>
    </div>
  </div>
  </div>;

    return (
      <div>
      {NavBar}
      <SearchHeader/>
      <Jobs/>
      </div>
    );
  }
}
