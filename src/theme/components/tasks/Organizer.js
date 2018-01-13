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

const Hours12 = (date) => { return (date.getHours() + 24) % 12 || 12; }

const GenerateDateString = (time, props) => {
  const DateFromTime = new Date(time);
  
  const Noon = new Date(DateFromTime.getFullYear(), 
                        DateFromTime.getMonth(),
                        DateFromTime.getDate()
                        , 12, 0, 0);

  const AmPm = (DateFromTime.getTime() < Noon.getTime()) ? 'am' : 'pm';

  const Hours = String(Hours12(DateFromTime)) + AmPm;

  const DateString = props.timeNow >= time ? ` today at ${Hours}` 
         : `${DateFromTime.getDate()} ${MonthFromNumber(DateFromTime.getMonth())} at ${Hours}`;

  return DateString;
}

const GenerateHangoutText = (hangout, props)=> {
  const Partner = GetHangoutPartner(hangout, props);

  let HangoutText = "Not available";

  switch (hangout.status) {
    case "started": {
      HangoutText = `Your Hangout on skill ${hangout.metaData.subject.skill.name} with ${Partner.user.firstName} has been started`;
      break;
    }
    case "finished": {
      const DateString = GenerateDateString(hangout.timeStatusChanged, props);

      HangoutText = `You met ${Partner.user.firstName} ${DateString} for ${hangout.metaData.subject.skill.name}. How was it?`;
      break;
    }
    case "cancelled": {
      HangoutText = `Your Hangout on ${hangout.metaData.subject.skill.name} with ${Partner.user.firstName} has been cancelled.`;
      break;
    }
    case "complete": {
      HangoutText = `Your Hangout on ${hangout.metaData.subject.skill.name} with ${Partner.user.firstName} is complete.`;
      break;
    }
    default: {
      const DateString = GenerateDateString(hangout.metaData.time, props);
      HangoutText = `You have an upcoming Hangout on skill ${hangout.metaData.subject.skill.name} with ${Partner.user.firstName} ${DateString}`;
      break;
    }
  }

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
    const Partner = GetHangoutPartner(hangout, props);

    if (!hangout.metaData.ratings || hangout.metaData.ratings.findIndex(function(rating) {
      return rating.fromUser == props.currentUserID && rating.toUser == Partner.user._id;
    }) == -1) {
      return (
        <span className="organizer-list-item-actions pull-right">
            <ActionLink href="#" 
              className="organizer-action-link" onClick={()=>props.onHangoutRate(hangout, Partner.user._id, "good")}>Good</ActionLink>
            <ActionLink href="#" 
              className="organizer-action-link" onClick={()=>props.onHangoutRate(hangout, Partner.user._id, "bad")}>Bad</ActionLink>
        </span>
      );
    }
    else {
      return (<span className="organizer-list-item-actions pull-right">
        <ActionLink href="#" 
          className="organizer-action-link-disabled" onClick={()=>{}}>Thanks for rating</ActionLink>
      </span>);
    }
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
        return (hangout2.timeStatusChanged - hangout1.timeStatusChanged);
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