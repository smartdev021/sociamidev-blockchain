/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';

import RoadmapWidgetDetails from './RoadmapWidgetDetails'
import ConfigMain from '~/configs/main'
import "~/src/css/roadmapsWidget.css"

//TODO: remove, as soon as layout is fixed
const MAX_SKILLS_AMOUNT = 4;

class RoadmapsWidget extends React.Component {
  constructor(props) {
    super(props);

    this.renderRoadmaps = this.renderRoadmaps.bind(this);

    this.state = {isViewingDetails: false, currentRoadmapSelected: {}};
  }

  componentWillMount() {
      if (this.props.addedRoadmaps.length == 0) {
        const savedRoadmaps = this.props.cookies.get('addedRoadmaps');
        
        if (savedRoadmaps && savedRoadmaps.length > 0) {
             this.props.setRoadmaps(savedRoadmaps);
        }
      }
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.props.isFetchInProgress != prevProps.isFetchInProgress) {
          if (this.props.isFetchInProgress) {
              this.handleViewDefault();
          }
      }

      console.log("props updated prevProps.addedRoadmaps: ");
      console.dir(prevProps.addedRoadmaps);

      console.log("props updated this.props.addedRoadmaps: ");
      console.dir(this.props.addedRoadmaps);

      const { cookies } = this.props;
      
      const savedRoadmaps = cookies.get('addedRoadmaps');
      
      console.log("componentDidUpdate roadmaps amount has changed!!!");
      
      //only add roadmaps to cookies if they differ in length or not set yet
      let dateExpire = new Date();
      dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());  
      
      let options = { path: '/', expires: dateExpire};
      
      cookies.set('addedRoadmaps', this.props.addedRoadmaps, options); //will expire in 'lifetimeMinutes' minutes
  }

  toggleAdd(e) {
    let roadmapId = e.target.id;

    if (this.props.addedRoadmaps.indexOf(roadmapId) != -1) {
        this.props.removeRoadmap(roadmapId);
    }
    else {
        this.props.addRoadmap(roadmapId);
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
      const addControlClassName = this.props.addedRoadmaps.indexOf(String(roadmapId)) != -1 ? "	glyphicon glyphicon-ok roadmapControl" 
      : "glyphicon glyphicon-plus roadmapControl";
      return (<p className="roadmapControls">
          <span className="glyphicon glyphicon-eye-open roadmapControl" id={roadmapId} onClick={(e)=> this.handleViewDetails(e)}></span>
          <span className={addControlClassName} id={roadmapId} onClick={(e)=> this.toggleAdd(e)}></span>
      </p>);
  }
  
  renderRoadmaps() {
    if (this.props.roadmaps.length > 0 && !this.props.isFetchInProgress) {
        let that = this;
        return (
          <div className="carousel-inner">
           {this.state.roadmaps.map(function(roadmap, i) {
             let roadmapControls = that.renderRoadmapsControls(roadmap._id);
             return (<div className={i == 0 ? 'item active roadMap' : 'item roadMap'} key={i}>
             <div className="carousel-text-content">
                
               <img src="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/transp-image1.png" className="icon" alt="Lorem Ipsum"/>
               <h2 className="title">{roadmap.name}</h2>
               
               
               <p className="roadmapSkillsParagraph">{roadmap.skills.map(function(skill, i) {
                                    if (i < 4) {
                                        return<span className="skillTagContainer"><span className="skillTag" key={i}>{skill}</span></span>;
                                    }
                                    else {
                                        return null;
                                    }
                                })}</p>
             </div>
           </div>);
           })}
        </div>
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
  roadmaps: PropTypes.array.isRequired,
  addedRoadmaps: PropTypes.array.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired,
}

export default withRouter(withCookies(RoadmapsWidget));