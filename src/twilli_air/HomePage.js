/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';


class HomePageTwilliAir extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //Load 'functions.js'
     const script = document.createElement("functions_js_script");
     script.src = "http://sociamibucket.s3.amazonaws.com/twilli_air/assets/js/functions.js";
     document.getElementsByTagName('head')[0].appendChild(script);
  }

  handleToggleMainMenu() {
    window.toggle_main_menu();
  }

  render() {
//<img src="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/logo.png"
    return (<div id="outer-container">
    
          <section id="left-sidebar">
            
            <div className="logo">
              <a href="#intro" className="link-scroll"><h2>Soqqle</h2></a>
            </div>
    
            <div id="mobile-menu-icon" className="visible-xs" onClick={()=>this.handleToggleMainMenu()}>
            <span className="glyphicon glyphicon-th"></span></div>
    
            <ul id="main-menu">
              <li id="menu-item-text" className="menu-item scroll"><a href="#text">Text</a></li>
              <li id="menu-item-carousel" className="menu-item scroll"><a href="#carousel">Carousel</a></li>
              <li id="menu-item-grid" className="menu-item scroll"><a href="#grid">Grid</a></li>
              <li id="menu-item-featured" className="menu-item scroll"><a href="#featured">Featured</a></li>
              <li id="menu-item-tabs" className="menu-item scroll"><a href="#tabs">Results</a></li>
              <li id="menu-item-contact" className="menu-item scroll"><a href="#contact">Contact</a></li>
            </ul>
    
          </section>
    
          <section id="main-content" className="clearfix">
            
            <article id="intro" className="section-wrapper clearfix" data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg5.jpg">
              <div className="content-wrapper clearfix wow fadeInDown" data-wow-delay="0.3s">
                <div className="col-sm-10 col-md-9 pull-right">
    
                    <section className="feature-text">
                      <h1>Say more with less with TWILLI Air</h1>
                      <p>TWILLI Air is a fully-responsive, minimalistic HTML template, designed to be ideal for websites with concise content.</p>
                      <p><a href="#text" className="link-scroll btn btn-outline-inverse btn-lg">find out more</a></p>
                    </section>
    
                </div>
              </div>
            </article>
          </section>
          </div>
    );
  }

}

export default HomePageTwilliAir;