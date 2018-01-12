/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'
import {Link} from 'react-router-dom'

import "~/src/theme/css/organizer.css"

const DayFromNumber = (dayNum)=> {
  const DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return DayNames[dayNum];
}

const MonthFromNumber = (monthNum)=> {
  const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];

  return MonthNames[monthNum];
}

const GetHangoutPartner = (hangout, props) => {
  const Partner = hangout.metaData.participants.find(function(participant) {
    return participant.user._id != props.currentUserID;
  });

  return Partner;
}

const GenerateHangoutText = (hangout, props)=> {
  const Partner = GetHangoutPartner(hangout, props);

  const HangoutDate = new Date(hangout.metaData.time);

  const Hours12 = (date) => { return (date.getHours() + 24) % 12 || 12; }

  const Noon = new Date(HangoutDate.getFullYear(), HangoutDate.getMonth(),HangoutDate.getDate(), 12, 0, 0);
  const AmPm = (HangoutDate.getTime() < Noon.getTime()) ? 'am' : 'pm';

  const Hours = String(Hours12(HangoutDate)) + AmPm;

  const DateString = props.timeNow >= hangout.metaData.time ? ` at ${Hours}` 
  : `${HangoutDate.getDate()} ${MonthFromNumber(HangoutDate.getMonth())} at ${Hours}`;

  const HangoutText = hangout.status != "started" 
    ? `You have an upcoming Hangout on skill ${hangout.metaData.subject.skill.name} with ${Partner.user.firstName} ${DateString}`
    : `Your Hangout on skill ${hangout.metaData.subject.skill.name} with ${Partner.user.firstName} has been started`;

  return HangoutText;
}

const RenderList = (props) => {
  const Hangouts = props.tasks.filter(function(task) {
    return task.type == "hangout";
  });

  return (
    <div id="organizer-list">
      <ul>
        {
          Hangouts.map(function(hangout, i) {

            const StartActionClass = props.timeNow >= hangout.metaData.time ? "organizer-action-link" : "organizer-action-link-disabled";

            if (hangout.metaData.participants.length > 1) {
              return (
                <li key={i}>
                  <span className="organizer-list-item-text">{GenerateHangoutText(hangout, props)}</span>
                  {RenderHangoutActions(hangout, props)}
                </li>
              );
            }
          })
        }
      </ul>
    </div>
  );
}

const RenderStatusBox = (activeTask, props) => {
  return (
    <div id="organizer-status-box" className={activeTask ? "" : "invisible"}>
      <h3>You are now meeting {activeTask && activeTask.partnerName}</h3>
      <div id="actions">
        <ActionLink href="#" onClick={()=>props.onHangoutActionPerform("cancel", activeTask)} 
          className="organizer-action-link">Cancel</ActionLink>
        <ActionLink href="#" onClick={()=>props.onHangoutActionPerform("reschedule", activeTask)} 
          className="organizer-action-link">Reschedule</ActionLink>
        {(activeTask && activeTask.status == "started") 
          && <div><Link className="organizer-action-link" to={`/taskBrowser?id=${activeTask._id}`}>Answer Questions</Link></div>
        }
      </div>
    </div>
  );
}

const RenderHangoutActions = (hangout, props) => {
  if (hangout.status == "finished") {
    return (
      <span className="organizer-list-item-actions pull-right">
          <ActionLink href="#" 
            className="organizer-action-link" onClick={()=>props.onHangoutRate(hangout, "good")}>Good</ActionLink>
          <ActionLink href="#" 
            className="organizer-action-link" onClick={()=>props.onHangoutRate(hangout, "bad")}>Bad</ActionLink>
      </span>
    );
  }
  const StartActionClass = props.timeNow >= hangout.metaData.time ? "organizer-action-link" : "organizer-action-link-disabled";
  return (
  <span className="organizer-list-item-actions pull-right">
                  {(hangout.status != "started" && hangout.creator._id == props.currentUserID) && <ActionLink href="#" 
                    className={StartActionClass}
                      onClick={()=>props.onHangoutActionPerform("start", hangout)}>Start</ActionLink>}
                    {hangout.status == "started" && <ActionLink href="#" className="organizer-action-link" 
                      onClick={()=>props.onHangoutActionPerform("reschedule", hangout)}>Reschedule</ActionLink>}
                    {hangout.creator._id == props.currentUserID ? hangout.status == "started" && <ActionLink href="#" 
                      className="organizer-action-link" 
                      onClick={()=>props.onHangoutActionPerform("cancel", hangout)}>Cancel</ActionLink>
                    :
                    hangout.status == "started" && <ActionLink href="#" className="organizer-action-link" 
                      onClick={()=>props.onHangoutActionPerform("leave", hangout)}>Leave</ActionLink>}
                  </span>
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
        return (hangout2.timeStarted - hangout1.timeStarted);
      });

      console.log("StartedHangouts");
      console.dir(StartedHangouts);

      activeTask = StartedHangouts[0];

      let partner = activeTask.metaData.participants.find(function(participant) {
        return participant.user._id != props.currentUserID;
      });

      if (partner) {
        activeTask.partnerName = partner.user.firstName;
      }
    }
  }

    return (
      <div className="row">
        <div className="col-lg-8">
          <div>
            <h3>Your Organizer</h3>
            {RenderList(props)}
          </div>
        </div>
        <div className="col-lg-4">
          {RenderStatusBox(activeTask, props)}
        </div>
      </div>
    );
}

export default Organizer;