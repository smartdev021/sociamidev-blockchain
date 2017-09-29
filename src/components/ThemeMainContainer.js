/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

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
    <img src="https://sociamibucket.s3.amazonaws.com/assets/images/ser01.png" width="180" alt="ser01.png"/>
    <h4>1 - Browser Compatibility</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
  </div>

  <div className="col-lg-4">
    <img src="https://sociamibucket.s3.amazonaws.com/assets/images/ser02.png" width="180" alt="ser02.png"/>
    <h4>2 - Email Campaigns</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>

  </div>

  <div className="col-lg-4">
    <img src="https://sociamibucket.s3.amazonaws.com/assets/images/ser03.png" width="180" alt="ser03.png"/>
    <h4>3 - Gather Your Notes</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>

  </div>
</div>
</div>
    );
  }

}

export default ThemeMainContainer;