import React, { Component } from 'react';
import SearchHeader from './components/SearchHeader';
import Jobs from './components/Jobs';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.css';

//load fonts
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,400,900']
  }
});

//load images
import Image_Ipad_Hand from '../assets/img/ipad-hand.png'

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

  const HeadWrap = <div id="headerwrap">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h1>Make your landing page<br/>
        look really good.</h1>
        <form className="form-inline" role="form">
          <div className="form-group">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address"/>
          </div>
          <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
        </form>					
      </div>
      <div className="col-lg-6">
        <img className="img-responsive" src={Image_Ipad_Hand} alt="ipad-hand.png"/>
      </div>
    </div>
  </div>
</div>;

    return (
      <div>
      {NavBar}
      {HeadWrap}
      <SearchHeader/>
      <Jobs/>
      </div>
    );
  }
}
