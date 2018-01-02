/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import TaskTypes from "~/src/common/TaskTypes"

const DayFromNumber = (dayNum)=> {
  const DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return DayNames[dayNum];
}

const MonthFromNumber = (monthNum)=> {
  const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];

  return MonthNames[monthNum];
}

const Hours12 = (date) => { return (date.getHours() + 24) % 12 || 12; }

const RenderSingleTask = (task, i, props)=> {
  if (task.type == TaskTypes.HANGOUT) {
    const date = new Date(task.metaData.time);

    const dateNow = new Date(Date.now());
    const dateTomorrow = new Date(Date.now() + (60 * 60 * 24));

    const Noon = new Date(date.getFullYear(), date.getMonth(),date.getDate(), 12, 0, 0);
    const AmPm = (date.getTime() < Noon.getTime()) ? 'am' : 'pm';

    const Hours = String(Hours12(date)) + AmPm;
    let time = "";

    if (dateNow.getDay() == date.getDay() && dateNow.getMonth() == date.getMonth() && dateNow.getFullYear() == date.getFullYear()) {
      time = `${Hours} today`;
    }
    else if (dateTomorrow.getDay() == date.getDay() && dateTomorrow.getMonth() == date.getMonth() && dateTomorrow.getFullYear() == date.getFullYear()) {
      time = `${Hours} tomorrow`;
    }
    else {
      time = `${Hours} on ${DayFromNumber(date.getUTCDay())} (${date.getDay() + 1} ${MonthFromNumber(date.getMonth())})`; 
    }

    
    return (
      <li key={i}>
        <div>
        <span className="hangout-text">{task.creator.firstName} is looking to Hangout for roadmap: {task.metaData.subject.roadmap.name} at {time}</span>
          <ActionLink href="#" onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
            Accept
          </ActionLink>
        </div>
      </li>
    );
  }
  else {
    return (
      <li key={i}>
        <div>
          <ActionLink href="#" onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>{task.name}</ActionLink>
        </div>
      </li>
    );
  }
};

const NetworkTasks = (props) => {
    
  let foundTasks = [];
  
  const scannerQuery = props.scannerQuery.toLowerCase();

  if (scannerQuery != "") {
    foundTasks = props.tasks.filter(function(task) {
      return (props.currentUserID == undefined || task.userID != props.currentUserID) 
        && task.name && task.name.toLowerCase().startsWith(scannerQuery);
    });
  }
  else {
    foundTasks = props.tasks;
  }

  let that = this;

  if (foundTasks.length > 0) {
    return (
      <div id="tasks-scanner-list-container">
        <ul id="tasks-scanner-list-tasks">
        {
          foundTasks.map(function(task, i) {
            return RenderSingleTask(task, i, props);
            })
          }
        </ul>
      </div>
    );
  }
  else {
    return null;
  }
}

export default NetworkTasks;