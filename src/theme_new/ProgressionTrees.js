/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import "~/src/theme_new/css/common.css"
import "~/src/theme_new/css/progressionTrees.css"

import {
  fetchRoadmaps
} from '~/src/redux/actions/roadmaps'

class ProgressionTrees extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scannerQuery: "",
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({scannerQuery: e.target.value});
  }

  componentWillMount() {
    this.props.fetchRoadmaps();
  }

  renderUserProgressionTrees() {
    const progressValueNow = 25;
    const progressValueNow1 = 41;

    let userRoadmaps = [];

    /*if (this.props.isAuthorized) {
      userRoadmaps = this.props.roadmaps.data.filter(function(roadmap) {
        return roadmap.us
      });
    }
    else {
      
    }*/

    userRoadmaps = this.props.roadmaps.data;

    return (
      <div id="progression-trees-trees">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-2-columns-left-title">My Progress</div>
            </div>
          </div>
          <div id="my-progress-list">
          {
            userRoadmaps.map(function(roadmap, i) {
            return (
            <div key={i} className="row">
              <div className="col-lg-12">
                <div className="progress">
                  <span className="col-lg-12" id="progress-bar-text">
                    <h4 id="progress-bar-roadmap-name">{roadmap.name}</h4>
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
            );
          })}
          </div>
        </div>
      </div>
    );
  }

  renderTreesScannerTrees() {
    const DummyTrees = [
      {name: "AI for Beginners", secondaryInfo: {
        image_1: "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/matthewicon.png", 
        image_2: "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/Mathildaicon.png"
        , text: "and 1282 others"}
      }, 
      {name: "AI for Intermediates", secondaryInfo: {image_1: null, image_2: null, text: "256 learners"}}, 
      {name: "AI for advanced learners", secondaryInfo: {image_1: null, image_2: null, text: "32 learners"}}, 
      {name: "AI for corporations", secondaryInfo: {
        image_1: "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/johnicon.png", 
        image_2: null, text: "and 10 others"}
      }, 
    ];

    let foundRoadmaps = [];

    const scannerQuery = this.state.scannerQuery.toLowerCase();
    
    if (scannerQuery != "") {
      foundRoadmaps = this.props.roadmaps.data.filter(function(roadmap) {
        return roadmap.name && roadmap.name.toLowerCase().startsWith(scannerQuery);
      });
    }
    else {
      foundRoadmaps = this.props.roadmaps.data;
    }

    return (
      <ul id="trees-scanner-list-trees">
        {
          foundRoadmaps.map(function(roadmap, i) {
            let tree = DummyTrees[Math.floor(Math.random() * (DummyTrees.length - 0)) + 0];
            return (<li key={i}>
            <div className="tree-list-item">
              <a href="#">{roadmap.name}</a>
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
    return (
        <div className="content-2-columns-wrapper" id="progression-trees">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9">
              <div className="content-2-columns-left">
                {this.renderUserProgressionTrees()}
              </div>
              </div>
              <div className="col-lg-3">
                <div className="content-2-columns-left" id="progression-trees-scanner">
                <div id="progression-trees-scanner-container">
                  <div className="container-fluid">
                    <div className="row">
                       <div className="col-lg-12">
                         <div className="content-2-columns-right-title">Tree scanner</div>
                       </div>
                    </div>
                    <div className="row">
                       <div className="col-lg-12">
                         <div id="scanner-input-container">
                           <input type="text" autoComplete="off" id="scanner_trees" placeholder="" onChange={(e) => this.handleChange(e)}/>
                         </div>
                       </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div id="trees-scanner-container">
                          {this.renderTreesScannerTrees()}
                        </div>
                      </div>
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
  fetchRoadmaps: PropTypes.func.isRequired,
  roadmaps: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  roadmaps: state.roadmaps,
})

const mapDispatchToProps = dispatch => ({
  fetchRoadmaps: bindActionCreators(fetchRoadmaps, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionTrees);