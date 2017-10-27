/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';

import RoadmapWidgetDetails from './RoadmapWidgetDetails'

import "../css/roadmapsWidget.css"

//TODO: remove, as soon as layout is fixed
const MAX_SKILLS_AMOUNT = 4;

class RoadmapsWidget extends React.Component {
  constructor(props) {
    super(props);

    this.renderRoadmaps = this.renderRoadmaps.bind(this);

    this.state = {addedRoadmaps: [], isViewingDetails: false, currentRoadmapSelected: {}};
  }

  componentWillMount() {
    const savedRoadmaps = this.props.cookies.get('addedRoadmaps');

    if (savedRoadmaps && savedRoadmaps.length > 0) {
        //if user was adding roadmaps previously - set them to state
        let copy = Object.assign({}, this.state, {addedRoadmaps: savedRoadmaps});
        this.setState(copy);
    }
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.props.isFetchInProgress != prevProps.isFetchInProgress) {
          if (this.props.isFetchInProgress) {
              this.handleViewDefault();
          }
      }

      if (prevState.addedRoadmaps.length != this.state.addedRoadmaps.length) {
        const { cookies } = this.props;

        const savedRoadmaps = cookies.get('addedRoadmaps');

        //only add roadmaps to cookies if they differ in length or not set yet
        if (!savedRoadmaps || savedRoadmaps.length != this.state.addedRoadmaps.length) {
            let lifetimeMinutes = 10;
            let dateExpire = new Date();
            dateExpire.setTime(dateExpire.getTime() + (lifetimeMinutes*60*1000));  
            
            let options = { path: '/', expires: dateExpire};
            
            cookies.set('addedRoadmaps', this.state.addedRoadmaps, options); //will expire in 'lifetimeMinutes' minutes
        }
      }
  }

  toggleAdd(e) {
      let roadmapId = e.target.id;

      let indexFound = this.state.addedRoadmaps.indexOf(roadmapId);

      if (indexFound == -1) {
        let copy = Object.assign({}, this.state, {addedRoadmaps: this.state.addedRoadmaps.concat(roadmapId)});
        this.setState(copy);
      }
      else {
        let copy = Object.assign({}, this.state, {addedRoadmaps: this.state.addedRoadmaps.filter(function(id) 
            {
                return id != roadmapId})
            }
        );
        
        this.setState(copy);
      }
  }

  handleViewDetails(e) {
    if (this.props.roadmaps && this.props.roadmaps.length > 0) {
        for (let i = 0; i < this.props.roadmaps.length; ++i) {
            if (this.props.roadmaps[i]._id == e.target.id) {
                let copy = Object.assign({}, this.state, {isViewingDetails: true, currentRoadmapSelected: this.props.roadmaps[i]});
                this.setState(copy);
                break;
            }
        }
    }
  }

  handleViewDefault() {
    let copy = Object.assign({}, this.state, {isViewingDetails: false});
    this.setState(copy);
  }

  renderRoadmapsControls(roadmapId) {
      const addControlClassName = this.state.addedRoadmaps.indexOf(String(roadmapId)) != -1 ? "	glyphicon glyphicon-ok roadmapControl" 
      : "glyphicon glyphicon-plus roadmapControl";
      return (<span className="roadmapControls">
          <span className="glyphicon glyphicon-eye-open roadmapControl" id={roadmapId} onClick={(e)=> this.handleViewDetails(e)}></span>
          <span className={addControlClassName} id={roadmapId} onClick={(e)=> this.toggleAdd(e)}></span>
      </span>);
  }
  
  renderRoadmaps() {
    if (this.props.roadmaps.length > 0 && !this.props.isFetchInProgress) {
        let that = this;
        return (
            <span>
              {this.props.roadmaps.map(function(roadmap){
                  let roadmapControls = that.renderRoadmapsControls(roadmap._id);
                  return (
                  <div className="col-lg-2" key={roadmap._id}> 
                      <div className="container roadMap">
                          <h4>{roadmap.name}</h4>
                          {roadmapControls}
                          <div className="row">
                            {roadmap.skills.map(function(skill, i) {
                                if (i < MAX_SKILLS_AMOUNT) {
                                    return<div className="col-lg-2 skillTag" key={i}>{skill}</div>;
                                }
                                else {
                                    return null;
                                }
                            })}
                          </div>
                      </div>
                  </div>);
                })}
            </span>
            );
    }
    else {
        if (this.props.isFetchInProgress) {
            return <h2>Searching for roadmaps...</h2>;
        }
        else {
            return <h2>No roadmaps found yet...</h2>;
        }
    }
  }

  render() {
      if (this.state.isViewingDetails) {
        return(<div className="col-lg-12"><RoadmapWidgetDetails onViewDefault={()=> this.handleViewDefault()} 
        currentRoadmap = {this.state.currentRoadmapSelected}
        openSignUpForm = {this.props.openSignUpForm}/></div>);
      }
      else {
        return(<div className="roadmaps_widget">
        {this.renderRoadmaps()}
        </div>);
    }
  }
}

RoadmapsWidget.propTypes = {
  roadmaps: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired,
}

export default withRouter(withCookies(RoadmapsWidget));