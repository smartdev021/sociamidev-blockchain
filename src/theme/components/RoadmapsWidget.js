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

  renderCarouselTabs() {
    return (
      <ol className="carousel-indicators title-indicators">
        {
           this.props.roadmaps.map(function(roadmap, i) {
           return<li data-target="#features-carousel" data-slide-to={String(i)} className="" key={i}>{roadmap.name}</li>;
          })
        }
      </ol>);
  }

  renderRoadmapsControls(roadmapId) {
    const addControlClassName = this.props.addedRoadmaps.indexOf(String(roadmapId)) != -1 ? "	glyphicon glyphicon-ok roadmapControl" 
    : "glyphicon glyphicon-plus roadmapControl";

    return (
      <span className="roadmapControls">
        <span className="glyphicon glyphicon-eye-open roadmapControl" id={roadmapId} 
          onClick={(e)=> this.props.onHandleViewDetails(e.target.id)}></span>
        <span className={addControlClassName} id={roadmapId} onClick={(e)=> this.toggleAdd(e)}></span>
      </span>
    );
  }

  renderSkills(roadmap) {
    return (
      <p className="roadmapSkillsParagraph">
        {
          roadmap.skills.map(function(skill, j) {
            if (j < MAX_SKILLS_AMOUNT) {
              return<span key={j} className="skillTagContainer"><span className="skillTag">{skill}</span></span>;
            }
            else {
              return null;
            }
          })
        }
      </p>
    );
  }

  renderCarouselItems() {
    let that = this;
    return (
      <div className="carousel-inner">
       {
         this.props.roadmaps.map(function(roadmap, i) {
           return (
             <div className={i == 0 ? 'item active roadMap' : 'item roadMap'} key={i}>
               <div className="carousel-text-content">
                 <img src="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/transp-image1.png" 
                   className="icon" alt="Lorem Ipsum"/>
                 <h2 className="title">{roadmap.name}</h2>
                 {that.renderRoadmapsControls(roadmap._id)}
                 {that.renderSkills(roadmap)}
               </div>
             </div>);
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div id="features-carousel" className="carousel slide with-title-indicators max-height" data-height-percent="70" data-ride="carousel">
        {this.renderCarouselTabs()}
        {this.renderCarouselItems()}
        
        <a className="left carousel-control" href="#features-carousel" data-slide="prev"></a>
        <a className="right carousel-control" href="#features-carousel" data-slide="next"></a>
      </div>
    );
  }
}

export default withRouter(withCookies(RoadmapsWidget));