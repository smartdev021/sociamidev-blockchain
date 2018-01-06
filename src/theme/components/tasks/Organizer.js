/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/organizer.css"

const RenderList = (props) => {
  const Hangouts = props.tasks.filter(function(task) {
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
                {hangout.status != "started" && <ActionLink href="#" className="organizer-action-link" 
                    onClick={()=>props.onHangoutActionPerform("start", hangout)}>Start</ActionLink>}
                  {hangout.status == "started" && <ActionLink href="#" className="organizer-action-link" 
                    onClick={()=>props.onHangoutActionPerform("reschedule", hangout)}>Reschedule</ActionLink>}
                  {hangout.status == "started" && <ActionLink href="#" className="organizer-action-link" 
                    onClick={()=>props.onHangoutActionPerform("cancel", hangout)}>Cancel</ActionLink>}
                </span>}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const RenderStatusBox = (activeTask, props) => {
  return (
    <div id="organizer-status-box" className={activeTask ? "" : "invisible"}>
      <h2>You are now meeting {activeTask && activeTask.partnerName}</h2>
      <div id="actions">
        <ActionLink href="#" onClick={()=>props.onHangoutActionPerform("cancel", activeTask)} 
          className="organizer-action-link">Cancel</ActionLink>
        <ActionLink href="#" onClick={()=>props.onHangoutActionPerform("reschedule", activeTask)} 
          className="organizer-action-link">Reschedule</ActionLink>
        <div><ActionLink href="#" onClick={()=>props.onHangoutActionPerform("answer_questions", activeTask)} 
          className="organizer-action-link">Answer Questions</ActionLink></div>
      </div>
    </div>
  );
}

const Organizer = (props) => {
  const Hangouts = props.tasks.filter(function(task) {
    return task.type == "hangout";
  });

  let activeTask = undefined;

  if (Hangouts.length > 0) {
    let StartedHangouts = Hangouts.filter(function(hangout) {
      return hangout.status == "started";
    });

    if (StartedHangouts.length > 0) {
      StartedHangouts.sort(function(hangout1, hangout2) {
        return (hangout1.timeStarted - hangout2.timeStarted);
      });

      activeTask = StartedHangouts[0];

      let partner = activeTask.metaData.participants.find(function(participant) {
        return participant.user._id != props.currentUserID;
      });

      console.log("%cOrganizer", "color: black; background: purple;");
      console.dir(activeTask);
      console.dir(activeTask.metaData.participants);
      console.dir(partner);

      if (partner) {
        activeTask.partnerName = partner.user.firstName;
      }
    }
  }

    return (
      <div className="row">
        <div className="col-lg-8">
          {RenderList(props)}
        </div>
        <div className="col-lg-4">
          {RenderStatusBox(activeTask, props)}
        </div>
      </div>
    );
}

export default Organizer;