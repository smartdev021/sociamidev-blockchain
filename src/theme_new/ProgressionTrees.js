/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import "~/src/theme_new/appearance.css"
import "~/src/theme_new/layout.css"

class ProgressionTrees extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      const progressValueNow = 25;
      const progressValueNow1 = 41;
    return (
        <div id="progression-trees">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
              <div id="progression-trees-trees">
                <div className="container-fluid">
                  <div className="row">
                     <div className="col-lg-12">
                       <h3>My Progress</h3>
                     </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="progress">
                        <span id="progress-bar-text">
                          <h4 id="progress-bar-roadmap-name">Blockchain for beginners</h4>
                          <span className="progress-bar-skill-name">Basic CS concepts</span>
                          <span className="progress-bar-skill-name">Solidity</span>
                          <span className="progress-bar-skill-name">Network</span>
                          <span className="progress-bar-skill-name"><span className="glyphicon glyphicon-info-sign"></span></span>
                        </span>
                        <div className="progress-bar" role="progressbar" style={{'width': progressValueNow + '%'}} 
                          aria-valuenow={progressValueNow} aria-valuemin="0" aria-valuemax="100">
                        </div>
                        <sup id="progress-percents-sup">{progressValueNow}%</sup>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="progress">
                        <span id="progress-bar-text">
                          <h4 id="progress-bar-roadmap-name">Java for intermediates</h4>
                          <span className="progress-bar-skill-name">Basic</span>
                          <span className="progress-bar-skill-name">Building Optimization</span>
                          <span className="progress-bar-skill-name">Testing</span>
                          <span className="progress-bar-skill-name"><span className="glyphicon glyphicon-info-sign"></span></span>
                        </span>
                        <div className="progress-bar" role="progressbar" style={{'width': progressValueNow1 + '%'}} 
                          aria-valuenow={progressValueNow1} aria-valuemin="0" aria-valuemax="100">
                        </div>
                        <sup id="progress-percents-sup">{progressValueNow1}%</sup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="col-lg-4">
                <div id="progression-trees-scanner">
                  <div className="container-fluid">
                    <div className="row">
                       <div className="col-lg-12">
                         <h3>Tree scanner</h3>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

ProgressionTrees.propTypes = {
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionTrees);