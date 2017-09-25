/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import Image_Ser01 from '../../assets/img/ser01.png'
import Image_Ser02 from '../../assets/img/ser02.png'
import Image_Ser03 from '../../assets/img/ser03.png'

class ThemeMainContainer extends React.Component {
  render() {
    return (
      <div className="container">
<div className="row mt centered">
  <div className="col-lg-6 col-lg-offset-3">
    <h1>Your Landing Page<br/>Looks Wonderful Now.</h1>
    <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
  </div>
</div>

<div className="row mt centered">
  <div className="col-lg-4">
    <img src={Image_Ser01} width="180" alt="ser01.png"/>
    <h4>1 - Browser Compatibility</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
  </div>

  <div className="col-lg-4">
    <img src={Image_Ser02} width="180" alt="ser02.png"/>
    <h4>2 - Email Campaigns</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>

  </div>

  <div className="col-lg-4">
    <img src={Image_Ser03} width="180" alt="ser03.png"/>
    <h4>3 - Gather Your Notes</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>

  </div>
</div>
</div>
    );
  }

}

export default ThemeMainContainer;