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

  renderTreesScannerTrees() {
    const DummyFriendImage = "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/dummy_friend_image.png";

    const dummyTrees = [
      {name: "AI for Beginners", secondaryInfo: {image_1: DummyFriendImage, image_2: DummyFriendImage, text: "and 1282 others"}}, 
      {name: "AI for Intermediates", secondaryInfo: {image_1: null, image_2: null, text: "256 learners"}}, 
      {name: "AI for advanced learners", secondaryInfo: {image_1: null, image_2: null, text: "32 learners"}}, 
      {name: "AI for corporations", secondaryInfo: {image_1: DummyFriendImage, image_2: null, text: "and 10 others"}}, 
    ];

    return (
      <ul id="trees-scanner-list-trees">
        {
          dummyTrees.map(function(tree, i) {
            return (<li key={i}>
            <div className="tree-list-item">
              <a href="#">{tree.name}</a>
              {tree.secondaryInfo ? 
              <div className="pull-right">
                <span>
                  <span>{tree.secondaryInfo.image_1 ? <img src={tree.secondaryInfo.image_1}/> : null}</span>
                  <span>{tree.secondaryInfo.image_2 ? <img src={tree.secondaryInfo.image_2}/> : null}</span>
                </span>
                {tree.secondaryInfo.text ? <div id="tree-list-item-secondary-text">{tree.secondaryInfo.text}</div> : null}
              </div> : null}
            </div>
          </li>);
          })
        }
      </ul>
    );
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
                    <div className="row">
                       <div className="col-lg-12">
                         <div id="scanner-input-container">
                           <input type="text" autoComplete="off" id="scanner_trees" placeholder=""/>
                         </div>
                       </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        {this.renderTreesScannerTrees()}
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