/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/treebrowser.css"

const SkillBreakdown = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="content-2-columns-left-title">
          <span>Skill Breakdown</span>
          <ActionLink className="pull-right" onClick={()=> {} }>Hangout</ActionLink>
          <ActionLink className="pull-right" onClick={()=> props.onCloseSkillBreakdown()}>Close</ActionLink>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <p>{props.skill.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <p>Related Sub-Skills</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <p>Gigs, Jobs, Training, Events</p>
        </div>
      </div>
    </div>
  );
}

export default SkillBreakdown;