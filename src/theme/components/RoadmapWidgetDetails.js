/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { Redirect} from 'react-router-dom'

import "~/src/css/roadmapWidgetDetails.css"

class RoadmapsWidgetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
    }
    console.log("Roadmap details");
  }

  componentDidMount() {
    this.props.setExactLocation("RoadmapsWidgetDetails");
  }

  componentWillUnmount() {
    this.props.setExactLocation("");
  }

  handleFindMentor() {
    if (!this.props.isAuthorized) {
      this.props.openSignUpForm();
    }
    else {
      let copy = Object.assign({}, this.state, {redirectTo: <Redirect to="/taskManagement" push />});
      this.setState(copy);
    }
  }

  handleFindFriends() {
    if (!this.props.isAuthorized) {
      this.props.openSignUpForm();
    }
  }

  render() {
    return(
    <div className="container roadmap_details_widget">
      {this.state.redirectTo}
      <div>
      <div className="col-lg-9">
        <div className="roadmapDetailsDescription">
          <div className="roadmapDetailsDescriptionHeader">
          <h4>Roadmap: {this.props.currentRoadmap.name}</h4>
          </div>
          <div className="container roadmapDetailsDescriptionContent">
          <div className="row">
      <div className="col-lg-1">
        <div className="roadmapStartContainer">
      <div className="roadmapStart">Start</div>
      </div>
      </div>
      <div className="col-lg-11">
      <div className="detailsArrow"><span className="detailsSkills">
      <hr/>
        {this.props.currentRoadmap.skills.map(function(skill, i) {
            return<span className="detailsSkill"key={i}>{skill}</span>;
        })}
      </span></div>
        </div>
          </div>
          </div>
          <div className="roadmapDetailsDescriptionFooter">
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="roadmapDetailsControls">
        <div className="detailsButtons">
          <button type="button" className="btn btn-lg btn-outline-inverse detailsButton" 
          onClick={()=>this.handleFindMentor()}>Find a Mentor</button>
          <button type="button" className="btn btn-lg btn-outline-inverse detailsButton" 
          onClick={()=>this.handleFindFriends()}>Find friends</button>
      </div>
      <span className="glyphicon glyphicon-remove detailsClose" onClick={()=> this.props.onViewDefault()}></span>
        </div>
      </div>
     </div>
    </div>);
  }
}

RoadmapsWidgetDetails.propTypes = {
  currentRoadmap: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  onViewDefault: PropTypes.func.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  setExactLocation: PropTypes.func.isRequired,
}

export default withRouter(RoadmapsWidgetDetails);