/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

const ProgressiontreesMyProgress = (props) => {
  return (
    <div className="row" id="my-progress-list">
          {
            props.trees.map(function(roadmap, i) {
            return (
              <div key={i} className="col-lg-12">
                <ActionLink onClick={()=> props.openSingleTree(roadmap._id)}>
                  <h4>{roadmap.name}</h4>
                </ActionLink>
              </div>
            );
          })}
    </div>
  );

  /*
  return (
    <div id="my-progress-list">
          {
            userRoadmaps.map(function(roadmap, i) {
              const RandomProgressValueNow = DummyProgressValues[Math.floor(Math.random() * (DummyProgressValues.length - 0)) + 0];
            return (
            <div key={i} className="row">
              <div className="col-lg-12">
                <div className="progress">
                  <span className="col-lg-12" id="progress-bar-text">
                    <h4 id="progress-bar-roadmap-name">{roadmap.name}</h4>
                    <span className="progress-bar-skills-weightage">Core</span>
                    {
                      roadmap.weightage1.map(function(skill, i) {
                        return (<span key={i} className="progress-bar-skill-name">{skill}</span>);
                      })
                    }
                    <span className="progress-bar-skills-weightage">Bonus</span>
                    {
                      roadmap.weightage2.map(function(skill, i) {
                        return (<span key={i} className="progress-bar-skill-name">{skill}</span>);
                      })
                    }
                    <span className="progress-bar-skills-weightage">Good to Have</span>
                    {
                      roadmap.weightage3.map(function(skill, i) {
                        return (<span key={i} className="progress-bar-skill-name">{skill}</span>);
                      })
                    }
                    <span className="progress-bar-skill-name"><span className="glyphicon glyphicon-info-sign"></span></span>
                  </span>
                  <div className="progress-bar" role="progressbar" style={{'width': RandomProgressValueNow + '%'}} 
                    aria-valuenow={RandomProgressValueNow} aria-valuemin="0" aria-valuemax="100">
                  </div>
                  <sup id="progress-percents-sup">{RandomProgressValueNow}%</sup>
                </div>
              </div>
            </div>
            );
          })}
    </div>
  );
  */
}

export default ProgressiontreesMyProgress;