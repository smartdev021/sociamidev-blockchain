/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import '~/src/theme/css/achievement.css';

class Achievement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="achievement-wrapper">
        <div className="center-wrapper">
          <div className="content-wp">
            <span className="numbering-heading">10</span>
            <h5>achievement completion</h5>
            <h2>DEEP DIVER</h2>
          </div>
        </div>
      </div>
    );
  }
}

Achievement.propTypes = {};

export default Achievement;
