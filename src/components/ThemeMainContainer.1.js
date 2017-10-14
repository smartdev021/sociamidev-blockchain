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
    <h1>The Social Learning Economy</h1>
    <h3>Make every step in your journey count.</h3>
  </div>
</div>

<div className="row mt centered">
  <div className="col-lg-4">
    <img src="https://sociamibucket.s3.amazonaws.com/assets/images/ser01.png" width="180" alt="ser01.png"/>
    <h4>Get more awareness</h4>
    <p>Find out more about whats happening around you</p>
  </div>

  <div className="col-lg-4">
    <img src="https://sociamibucket.s3.amazonaws.com/assets/images/ser02.png" width="180" alt="ser02.png"/>
    <h4>Meaningful Networks</h4>
    <p>Connect with others to share information and learn together.</p>

  </div>

  <div className="col-lg-4">
    <img src="https://sociamibucket.s3.amazonaws.com/assets/images/ser03.png" width="180" alt="ser03.png"/>
    <h4>Incentives to take action</h4>
    <p>Get motivated with rewards and track your journey.</p>

  </div>
</div>
</div>
    );
  }

}

export default ThemeMainContainer;