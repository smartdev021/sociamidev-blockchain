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

    const ProgressionTreeLevels = this.props.userProfile.progressionTreeLevels

    const listItems = ProgressionTreeLevels.map((item,index) => (
      <li className="stats-body" key={index}>
        <hr className="separator-hr" />
            <div className="row">
              <p className="text-center">
              <strong>
                {item.name.toUpperCase()}
              </strong>
              </p>
              <div className="col-xs-4 text-center">
              <span className="fa-stack fa-2x fa-style">
                <i className="fa fa-certificate fa-stack-2x white"></i>
                <span className="fa fa-stack-1x certi-num"><b>{item.level}</b></span>
              </span>
                <p className="small text-center white">
                LEVEL
                </p>
              </div>
              <div className="col-xs-4 text-center">
              <span className="fa-stack fa-2x fa-style">
                <i className="fa fa-star fa-stack-2x white"></i>
                <span  className="fa fa-stack-1x star-num"><b>{item.currentLevelXP}</b></span>
              </span>
                <p className="small text-center white">
                /10 XP
                </p>
              </div>
              <div className="col-xs-4 text-center">
              <span className="fa-stack fa-2x fa-style">
                <i className="fa fa-trophy fa-stack-2x white"></i>
                <span  className="fa fa-stack-1x trophy-num"><b>{item.totalXP}</b></span>
              </span>
                <p className="small text-center white">
                TOTAL XP
                </p>
              </div>
            </div>
          </li>
    ))

    
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

            {listItems}
            
            <div className="col-sm-12 btn-row">
              <Link className="btn btn-block btn-flat btn-style text-center" 
              to='/progressionTrees'>
                VIEW ALL STATS
              </Link>
            </div> 
            
          </ul>
      </li>
                  
    );
  }
}

// StatsDropdown.propTypes = {
// }

export default StatsDropdown