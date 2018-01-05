/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/organizer.css"

const RenderList = (props) => {
  const Hangouts = props.tasks.filter(function(task, i) {
    return task.type == "hangout";
  });

  return (
    <div id="organizer-list">
      <h2>Your Organizer</h2>
      <ul>
        {
          Hangouts.map(function(hangout, i) {
            return (
              <li key={i}>
                <span className="organizer-list-item-text">Your Hangout for skill {hangout.metaData.subject.skill.name}</span>
                {hangout.creator._id == props.currentUserID && <span className="organizer-list-item-actions pull-right">
                  <ActionLink href="#" className="organizer-action-link" 
                    onClick={()=>props.onHangoutActionPerform("start", hangout)}>Start</ActionLink>
                  <ActionLink href="#" className="organizer-action-link" 
                    onClick={()=>props.onHangoutActionPerform("reschedule", hangout)}>Reschedule</ActionLink>
                  <ActionLink href="#" className="organizer-action-link" 
                    onClick={()=>props.onHangoutActionPerform("cancel", hangout)}>Cancel</ActionLink>
                </span>}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const RenderStatusBox = (props) => {
  return (
    <div id="organizer-status-box">
      <h2>You are now meeting John</h2>
      <div id="actions">
        <ActionLink href="#" className="organizer-action-link">Cancel</ActionLink>
        <ActionLink href="#" className="organizer-action-link">Reschedule</ActionLink>
        <div><ActionLink href="#" className="organizer-action-link">Answer Questions</ActionLink></div>
      </div>
    </div>
  );
}

const Organizer = (props) => {
    return (
      <div className="row">
        <div className="col-lg-8">
          {RenderList(props)}
        </div>
        <div className="col-lg-4">
          {RenderStatusBox(props)}
        </div>
      </div>
    );
}

export default Organizer;