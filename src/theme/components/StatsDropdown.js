/*
    author: Akshay Menon
*/
require('~/src/css/StatsDropdown.css');

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class StatsDropdown extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li className="dropdown stats stats-menu">
          <a href="#" className="dropdown-toggle" 
          data-toggle="dropdown" aria-expanded="false">
          <i className="fa fa-trophy"></i>
          <span className="label label-danger">5</span>
            
          </a>
          <ul className="dropdown-menu pull-right">
            
            <li className="stats-body">
              <div className="row">
                <div className="col-xs-6 text-center">
                <span className="fa-stack fa-2x">
                  <i className="fa fa-star fa-stack-2x header-fa"></i>
                  <span  className="fa fa-stack-1x hd-white"><b>35</b></span>
                </span>
                  <p className="text-center desc">
                    EXP
                  </p>
                </div>
                <div className="col-xs-6 text-center">
                <span className="fa-stack fa-2x">
                  <i className="fa fa-database fa-stack-2x header-fa"></i>
                  <span  className="fa fa-stack-1x hd-white"><b>72</b></span>
                </span>
                  <p className="text-center desc">
                    SOQQ
                  </p>
                </div>
              </div>
            </li>
            <hr className="separator-hr" />
            <li className="stats-body">
              <div className="row">
                <p className="text-center">
                <strong>
                CRYPTOGRAPHY ENGINEERING
                </strong>
                </p>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-certificate fa-stack-2x white"></i>
                  <span className="fa fa-stack-1x certi-num"><b>3</b></span>
                </span>
                  <p className="small text-center white">
                  LEVEL
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-star fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x star-num"><b>0.5</b></span>
                </span>
                  <p className="small text-center white">
                  /10 XP
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-trophy fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x trophy-num"><b>13</b></span>
                </span>
                  <p className="small text-center white">
                  TOTAL XP
                  </p>
                </div>
              </div>
            </li>
            <hr className="separator-hr" />
            <li className="stats-body">
              <div className="row">
              <p className="text-center">
              <strong>
              MATERIAL SCIENCE
              </strong>
              </p>
              
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-certificate fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x certi-num"><b>1</b></span>
                </span>
                  <p className="small text-center white">
                  LEVEL
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-star fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x star-num"><b>3</b></span>
                </span>
                  <p className="small text-center white">
                  /10 XP
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-trophy fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x trophy-num"><b>4</b></span>
                </span>
                  <p className="small text-center white">
                  TOTAL XP
                  </p>
                </div>
              </div>
            </li>
            <hr className="separator-hr" />
            <li className="stats-body">
              <div className="row">
              <p className="text-center">
              <strong>
              PATTERN RECOGNITION AND CLASSIFICATION
              </strong>
              </p>
              <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-certificate fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x certi-num"><b>2</b></span>
                </span>
                  <p className="small text-center white">
                  LEVEL
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-star fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x star-num"><b>6</b></span>
                </span>
                  <p className="small text-center white">
                  /10 XP
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-trophy fa-stack-2x white"></i>
                  <span  className="fa fa-stack-1x trophy-num"><b>11</b></span>
                </span>
                  <p className="small text-center white">
                  TOTAL XP
                  </p>
                </div>
              </div>
            </li>
            <hr className="separator-hr" />
            <li className="stats-body">
              <div className="row">
              <p className="text-center">
              <strong>
              DEEP LEARNING
              </strong>
              </p>
              <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style">
                  <i className="fa fa-certificate fa-stack-2x darkgrey"></i>
                  <span  className="fa fa-stack-1x certi-num"><b className="grey">0</b></span>
                </span>
                  <p className="small text-center navajowhite">
                  LEVEL
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style darkgrey">
                  <i className="fa fa-star fa-stack-2x"></i>
                  <span  className="fa fa-stack-1x star-num"><b className="grey">0</b></span>
                </span>
                  <p className="small text-center navajowhite">
                  /10 XP
                  </p>
                </div>
                <div className="col-xs-4 text-center">
                <span className="fa-stack fa-2x fa-style darkgrey">
                  <i className="fa fa-trophy fa-stack-2x"></i>
                  <span  className="fa fa-stack-1x trophy-num"><b className="grey">0</b></span>
                </span>
                  <p className="small text-center navajowhite">
                  TOTAL XP
                  </p>
                </div>
              </div>
              <div className="col-sm-12 btn-row">
                <button className="btn btn-block btn-flat btn-style text-center">
                  VIEW ALL STATS
                </button>
              </div>
            </li>

            
            
          </ul>
      </li>
                  
    );
  }
}

// StatsDropdown.propTypes = {

// }

export default StatsDropdown