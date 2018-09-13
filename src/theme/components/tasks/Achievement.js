/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ActionLink from '~/src/components/common/ActionLink';

import '~/src/theme/css/achievement.css';

class Achievement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="achievement-container">
        <div className="achievement-wrapper">
          <div className="center-wrapper">
            <ActionLink
              href="#"
              className="modal-close-button"
              onClick={() => {}}
            />
            <div className="content-wp">
              <h6 className="yellow-text">Achievement completion</h6>
              <h4>DEEP DIVER</h4>
              <p>
                The Innovator quickly flies into action and arrives at the signal. The Chief of Police is
                there and tells him that the nefarious Shadow Professor has struck again
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Achievement.propTypes = {};

export default Achievement;
