/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

import "../css/roadmapWidgetDetails.css"

//TODO: remove, as soon as layout is fixed
const MAX_SKILLS_AMOUNT = 4;

class RoadmapsWidgetDetails extends React.Component {
  constructor(props) {
    super(props);

    console.log("Roadmap details");
    console.dir(this.props.currentRoadmap);
  }

  render() {
    return(<div className="col-lg-12">
    <div className="roadmap_details_widget">
      <h4>Roadmap: {this.props.currentRoadmap.name}</h4>
      <div className="roadmapStart">Start</div><span className="skillsArrow"/>
      <div className="detailsSkills">
        {this.props.currentRoadmap.skills.map(function(skill, i) {
            return<span className="detailsSkill"key={i}>{skill}</span>;
        })}
      </div>
      <ul className="detailsButtons">
          <li><button type="button" className="btn btn-primary btn-lg detailsButton" onClick={()=>this.props.openSignUpForm()}>Find a Mentor</button></li>
          <li><button type="button" className="btn btn-warning btn-lg detailsButton" onClick={()=>this.props.openSignUpForm()}>Find friends</button></li>
      </ul>
      <span className="glyphicon glyphicon-remove detailsClose" onClick={()=> this.props.onViewDefault()}></span>
    </div>
    </div>);
  }
}

RoadmapsWidgetDetails.propTypes = {
  currentRoadmap: PropTypes.object.isRequired,
  onViewDefault: PropTypes.func.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
}

export default withRouter(RoadmapsWidgetDetails);