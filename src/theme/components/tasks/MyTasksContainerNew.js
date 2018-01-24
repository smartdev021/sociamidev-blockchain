/*
    author: Alexander Zolotov
*/
import React from 'react';

import MyTasks from './MyTasks'

import Organizer from '~/src/theme/components/tasks/Organizer'

import ActionLink from '~/src/components/common/ActionLink'

import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

import "~/src/theme/css/myTasksContainerNew.css"

/*Helper functions*/
const DayFromNumber = (dayNum)=> {
  const DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return DayNames[dayNum];
}

const MonthFromNumber = (monthNum)=> {
  const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];

  return MonthNames[monthNum];
}

const GetHangoutPartner = (hangout, props) => {
  let Partner = hangout.metaData.participants.find(function(participant) {
    return participant.user._id != props.currentUserID;
  });

  if (!Partner) {
    //TODO: Fix and remove thise
    console.log("%cFix And Remove This!!!", "color: red;");
    Partner = {user: {firstName: "Dummy"}};
  }
  return Partner;
}

const GetFirstPendingParticipant = (hangout, props) => {
  const FirstPendingParticipant = hangout.metaData.participants.find(function(participant){
    return participant.status == "pending";
  });

  return FirstPendingParticipant;
}

const FirstAcceptedParticipants = (hangout, props) => {
  const FirstAcceptedParticipant = hangout.metaData.participants.find(function(participant){
    return participant.user._id != props.currentUserID && participant.status == "accepted";
  });

  return FirstAcceptedParticipant;
}

const GetCurrentUserAsParticipant = (hangout, props) => {
  return hangout.metaData.participants.find(function(participant){
    return participant.user._id == props.currentUserID;
  });
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

  let HangoutText = <div id="title">Not Available</div>;

  switch (hangout.status) {
    case "started": {
      HangoutText = <div id="title">
      Your Hangout on skill {hangout.metaData.subject.skill.name} with
      <span id="partner-name"> {Partner.user.firstName}</span>
      {` has been started`}
      </div>;
      
      break;
    }
    case "finished": {
      const DateString = GenerateDateString(hangout.timeStatusChanged, props);

      HangoutText = <div id="title">
        You met <span id="partner-name">{`${Partner.user.firstName} `}</span>
        {`for ${hangout.metaData.subject.skill.name}. How was it?.`}
        </div>;

      break;
    }
    case "cancelled": {
      HangoutText = <div id="title">
        Your Deepdive on {hangout.metaData.subject.skill.name} with <span id="partner-name">{Partner.user.firstName} </span>
        has been cancelled.
        </div>
      break;
    }
    case "complete": {
      HangoutText = <div id="title">
        Your Deepdive on {hangout.metaData.subject.skill.name} with <span id="partner-name">{Partner.user.firstName} </span>
        is complete.
        </div>
      break;
    }
    default:
      let isRequestAccepted = false;

      //current user is hangout creator
      if (hangout.creator._id == props.currentUserID) {
        const FirstPendingParticipant = GetFirstPendingParticipant(hangout, props);

        if (FirstPendingParticipant) {
          HangoutText = <div id="title"><span id="partner-name">{FirstPendingParticipant.user.firstName} </span>
        {`wants to join your ${hangout.metaData.subject.skill.name} Deepdive`}
        </div>
        }
        else {
          HangoutText = <div id="title">
          No new requests
        </div>
        }
      }
      else {
        //current user is possible participant
        for (let i = 0; i < hangout.metaData.participants.length; ++i) {
          if (hangout.metaData.participants[i].user._id == props.currentUserID) {
            if (hangout.metaData.participants[i].status == "accepted") {
              isRequestAccepted = true;
            }
          }
        }
  
        if (isRequestAccepted) {
          HangoutText = <div id="title">Confirmed Deepdive with <span id="partner-name">{Partner.user.firstName}</span></div>
        }
        else {
          HangoutText = <div id="title">Your request too Deepdive with <span id="partner-name">{Partner.user.firstName}</span></div>
        }
      }

      break;
    }

  return HangoutText;
}
/**************** */

const CategorySelection = (props) => {
  return (
    <span className="dropdown">
      <span className="glyphicon glyphicon-menu-down dropdown-toggle" type="button" data-toggle="dropdown"></span>
        <ul className="dropdown-menu">
          {
            props.filters.map((filter, i) => {
            const ClassName = props.filterCurrent.type == filter.type ? "tasks-category-entry" : "tasks-category-entry active"
            return (
              <li key={i} className={props.filterCurrent.type == filter.type ? "active" : ""}>
                <ActionLink href="#" className={ClassName} onClick={()=>props.onFilterChange(filter)}>{filter.label}</ActionLink>
              </li>
            )
          })
        }
      </ul>
    </span>
  );
}

const RenderActions = (hangout, props) => {
  if (hangout.status == "complete") {
    return (
      <div className="task-actions-container">
      </div>
    )  
  }
  else if (hangout.status == "finished") {
    const Partner = GetHangoutPartner(hangout, props);

    return (
      <div className="task-actions-container">
        <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-owner" 
          onClick={()=>props.onHangoutRate(hangout, Partner.user._id, "good")}>Good</button>
        <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-owner"
          onClick={()=>props.onHangoutRate(hangout, Partner.user._id, "bad")}>Bad</button>
      </div>);
  }

  if (hangout.creator._id == props.currentUserID) {
    const FirstPendingParticipant = GetFirstPendingParticipant(hangout, props);

    if (FirstPendingParticipant) {
      return (
        <div className="task-actions-container">
          <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-owner" 
            onClick={()=>props.onHangoutRequestAccept(hangout, FirstPendingParticipant.user)}>Accept</button>
          <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-owner" 
            onClick={()=>{}}>Open Chat</button>
          <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-owner"
            onClick={()=>props.onHangoutRequestAccept(hangout, FirstPendingParticipant.user)}>Reject</button>
        </div>);
    }
  }

  const FirstAcceptedParticipant = FirstAcceptedParticipants(hangout, props);

  return (
  <div className="task-actions-container">
    <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-default" 
      onClick={()=>props.onHangoutActionPerform("reschedule", hangout)}>Reschedule</button>
    <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-default" 
      onClick={()=>props.onHangoutActionPerform("cancel", hangout)}>Cancel</button>
    {(hangout.creator._id == props.currentUserID && hangout.status != "started") && 
    <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-default" 
      disabled={!FirstAcceptedParticipant || props.timeNow < hangout.metaData.time}
        onClick={()=>props.onHangoutActionPerform("start", hangout)}>Start</button>}
    {
      hangout.status == "started" &&
      <button type="button" className="btn btn-sm btn-outline-inverse hangout-action-button-default" 
      disabled={!FirstAcceptedParticipant || props.timeNow < hangout.metaData.time}
        onClick={()=>props.onHangoutActionPerform("answer_questions", hangout)}>Answer Questions</button>
    }
  </div>);
}

const HangoutTitleFromStatus = (task, Partner) => {
  let result = <div id="title"></div>;

  switch (task.status) {
    case "cancelled": {
      result = (
        <div id="title">
          Deepdive with <span id="partner-name">
            {` ${Partner.user.firstName}`}
          </span> has been cancelled
        </div>
        );
      break;
    }
    case "started": {
      result = (
        <div id="title">
          Deepdive with <span id="partner-name">
            {`${Partner.user.firstName}`}
          </span> is in progress
        </div>
        );
      break;
    }
    case "finished": {
      result = (
        <div id="title">
          Finished Deepdive with <span id="partner-name">
            {`${Partner.user.firstName}`} </span>
        </div>
        );
      break;
    }
    case "complete": {
      result = (
        <div id="title">
          Completed Deepdive with <span id="partner-name">
            {`${Partner.user.firstName}`} </span>
        </div>
        );
      break;
    }
    default: {
        result = (
          <div id="title">
            Deepdive with <span id="partner-name">
              {`${Partner.user.firstName}`}
            </span> has been cancelled
          </div>
          );
        break;
    }
  }

  return result;
}

const RenderTaskTitle = (task, props) => {
  let result = <div id="title"></div>;

  if (task.type == "hangout") {
    const Partner = GetHangoutPartner(task, props);

    //Current user has created this hangout
    if (task.creator._id == props.currentUserID) {
      result = HangoutTitleFromStatus(task, Partner);
    }
    else {
      const CurrentUserAsParticipant = GetCurrentUserAsParticipant(task, props);

      //Why is this possible???
      if (!CurrentUserAsParticipant) {
        result = <div id="title">Undefined</div>;
      }
      else {
        //for Sent Requests
        switch (CurrentUserAsParticipant.status) {
          case "pending": {
            result = (
              <div id="title">
                Your request to Deepdive with
                <span id="partner-name">
                  {` ${Partner.user.firstName}`}
                </span>
              </div>
            );
            break;
          }
          case "rejected": {
            result = (
              <div id="title">
                <span id="partner-name">
                  {`${Partner.user.firstName} `}
                </span>
                has not confirmed your request to join theirs Deepdive
              </div>
            );
            break;
          }
          default: {
            //request 'accepted'
            result = HangoutTitleFromStatus(task, Partner);
            break;
          }
        }
      }
    }
  }
  else {
    result = <div id="title">{task.name}</div>;
  }

  return result;
}

const RenderTask = (task, i, props) => {
  const Title = RenderTaskTitle(task, props);

  if (task.type == "hangout") {
    const SecondLine = `Skill: ${task.metaData.subject.skill.name}`;
    const ThirdLine = `Time: ${GenerateDateString(task.timeStatusChanged, props)}`

    return (
      <div className="col-lg-4" key={i}>
        <div className="my-tasks-task">
          <div className="my-tasks-task-text">
            {Title}
            <div id="description">{SecondLine}</div>
            <div id="description_1">{ThirdLine}</div>
          </div>
          {RenderActions(task, props)}
        </div>
      </div>
    )
  }

  return (
    <div className="col-lg-4" key={i}>
        <div className="my-tasks-task">
          {Title}
          <div id="description">{task.description}</div>
        </div>
      </div>
  )
}

const RenderTasks = (props) => {
  console.log("RenderTasks");
  console.dir(props.tasks);
  return (
    <div className="row">
      <div className="my-tasks-container-new-tasks-list">
        {
          props.tasks.map((task, i) => {
           return RenderTask(task, i, props)
          })
        }
      </div>
    </div>
  );
}

const MyTasksContainerNew = (props) => {

  if (props.isCollapsed) {
    if ((props.isAuthorized && props.tasks.length > 0)) {
      return (
        <div id="tasks-management-my-tasks">
          <ActionLink id="user-prog-tree-collapse" href="#" onClick={()=> props.onSetTreeScannerExpanded(false)}>
            <span className="glyphicon glyphicon-menu-right"></span>
          </ActionLink>
        </div>
      );
    }
    else {
      return (
        <div id="tasks-management-my-tasks">
          <h1>Coming soon...</h1>
        </div>
      );
    }
  }
    return(
    <div id="tasks-management-my-tasks" className="my-tasks-container-new">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-title">
              <span className="content-2-columns-left-title">Deepdive</span>
              {CategorySelection(props)}
            </div>
          </div>
        </div>
        {RenderTasks(props)}
      </div>
    </div>);
}

export default MyTasksContainerNew;