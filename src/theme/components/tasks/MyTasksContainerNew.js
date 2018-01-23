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
  let Partner = GetHangoutPartner(hangout, props);

  if (!Partner) {
    Partner = {user: {firstName: "Dummy"}};
  }

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
      HangoutText = <div id="title">Confirmed Deepdive with <span id="partner-name">{Partner.user.firstName}</span></div>
      break;
    }

  return HangoutText;
}
/**************** */

const CategorySelection = (props) => {
  return (
    <DropdownMenu triggerType='icon' trigger='glyphicon glyphicon-menu-down'>
        <MenuItem text='All' onClick={()=>{}}/>
        <MenuItem text='Confirmed' onClick={()=>{}}/>
        <MenuItem text='My Deepdive' onClick={()=>{}}/>
        <MenuItem text='Sent requests' onClick={()=>{}}/>
    </DropdownMenu>
  );
}

const RenderTasks = (props) => {
  return (
    <div className="row">
      <div className="my-tasks-container-new-tasks-list">
        {
          props.tasks.map((task, i) => {
            if (task.type == "hangout") {
              const FirstLine = GenerateHangoutText(task, props);
              const SecondLine = `Skill: ${task.metaData.subject.skill.name}`;
              const ThirdLine = `Time: ${GenerateDateString(task.timeStatusChanged, props)}`

              return (
                <div className="col-lg-4" key={i}>
                  <div className="my-tasks-task">
                    <div className="my-tasks-task-text">
                      {FirstLine}
                      <div id="description">{SecondLine}</div>
                      <div id="description_1">{ThirdLine}</div>
                    </div>
                    <div className="task-actions-container">
                      <button type="button" className="btn btn-sm btn-outline-inverse" 
                         onClick={()=>props.onHangoutActionPerform("reschedule", task)}>Reschedule</button>
                      <button type="button" className="btn btn-sm btn-outline-inverse" 
                         onClick={()=>props.onHangoutActionPerform("cancel", task)}>Cancel</button>
                      <button type="button" className="btn btn-sm btn-outline-inverse" disabled={true}
                         onClick={()=>props.onHangoutActionPerform("start", task)}>Start</button>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div className="col-lg-4" key={i}>
                  <div className="my-tasks-task">
                    <div id="title">{task.name}</div>
                    <div id="description">{task.description}</div>
                  </div>
                </div>
            )
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