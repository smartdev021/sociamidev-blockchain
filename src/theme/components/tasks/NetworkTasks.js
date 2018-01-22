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

    if (dateNow.getDate() == date.getDate() && dateNow.getMonth() == date.getMonth() && dateNow.getFullYear() == date.getFullYear()) {
      time = `${Hours} today`;
    }
    else if (dateTomorrow.getDate() == date.getDate() && dateTomorrow.getMonth() == date.getMonth() && dateTomorrow.getFullYear() == date.getFullYear()) {
      time = `${Hours} tomorrow`;
    }
    else {
      time = `${Hours} on ${DayFromNumber(date.getDay())} (${date.getDate()} ${MonthFromNumber(date.getMonth())})`; 
    }

    console.log("%cRenderSingleTask: ", "background: blue; color: white;");
    console.log(`${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${date.getDay()}`);

    
    return (
      <li className="task-scanner-task-expanded">
          <div className="hangout-text-expanded">
            <div className="hangout-text-expanded-creator">
              {task.creator.firstName }
            </div> 
            is looking to Hangout to discuss: {task.metaData.subject.roadmap.name} at {time}
            <div className="hangout-text-expanded-creator-detailed">
              {task.creator.firstName} is in your wider network
            </div> 
            <div className="hangout-text-expanded-task-reward">
              Earn up to 10 tokens completing this task
            </div> 
          </div>
          <div className="hangout-expanded-accept-button-container">
            {!task.isLocked ? 
              <ActionLink className="hangout-expanded-accept-button" href="#" 
                onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
                Accept
              </ActionLink>
              :
              <span className="tasks-scanner-task-locked-icon glyphicon glyphicon-lock">Locked</span>
            }
          </div>
        </li>
    );
  }
  else {
    return (
      <li className="task-scanner-task-expanded">
          <div className="hangout-text-expanded">
            <div className="hangout-text-expanded-creator">
              {task.name}
            </div> 
            <div className="hangout-text-expanded-creator-detailed">
              {task.creator.firstName} is in your wider network
            </div> 
            <div className="hangout-text-expanded-task-reward">
              Earn up to 10 tokens completing this task
            </div> 
          </div>
          <div className="hangout-expanded-accept-button-container">
            {!task.isLocked ? 
              <ActionLink className="hangout-expanded-accept-button" href="#" 
                onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
                Accept
              </ActionLink>
              :
              <span className="tasks-scanner-task-locked-icon glyphicon glyphicon-lock">Locked</span>
            }
          </div>
        </li>
    );
  }
};

const RenderSingleTaskExpanded = (task, i, props)=> {
  if (task.type == TaskTypes.HANGOUT) {
    const date = new Date(task.metaData.time);

    const dateNow = new Date(Date.now());
    const dateTomorrow = new Date(Date.now() + (60 * 60 * 24));

    const Noon = new Date(date.getFullYear(), date.getMonth(),date.getDate(), 12, 0, 0);
    const AmPm = (date.getTime() < Noon.getTime()) ? 'am' : 'pm';

    const Hours = String(Hours12(date)) + AmPm;
    let time = "";

    if (dateNow.getDate() == date.getDate() && dateNow.getMonth() == date.getMonth() && dateNow.getFullYear() == date.getFullYear()) {
      time = `${Hours} today`;
    }
    else if (dateTomorrow.getDate() == date.getDate() && dateTomorrow.getMonth() == date.getMonth() && dateTomorrow.getFullYear() == date.getFullYear()) {
      time = `${Hours} tomorrow`;
    }
    else {
      time = `${Hours} on ${DayFromNumber(date.getDay())} (${date.getDate()} ${MonthFromNumber(date.getMonth())})`; 
    }
    
    return (
      <div className="col-lg-4 col-md-3 col-sm-12" key={i}>
        <div className="task-scanner-task-expanded">
          <div className="hangout-text-expanded">
            <div className="hangout-text-expanded-creator">
              {task.creator.firstName }
            </div> 
            is looking to Hangout to discuss: {task.metaData.subject.roadmap.name} at {time}
            <div className="hangout-text-expanded-creator-detailed">
              {task.creator.firstName} is in your wider network
            </div> 
            <div className="hangout-text-expanded-task-reward">
              Earn up to 10 tokens completing this task
            </div> 
          </div>
          <div className="hangout-expanded-accept-button-container">
            {!task.isLocked ? 
              <ActionLink className="hangout-expanded-accept-button" href="#" 
                onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
                Accept
              </ActionLink>
              :
              <span className="tasks-scanner-task-locked-icon glyphicon glyphicon-lock">Locked</span>
            }
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="col-lg-4 col-md-3 col-sm-12" key={i}>
        <div className="task-scanner-task-expanded">
          <div className="hangout-text-expanded">
            <div className="hangout-text-expanded-creator">
              {task.name}
            </div> 
            <div className="hangout-text-expanded-creator-detailed">
              {task.creator.firstName} is in your wider network
            </div> 
            <div className="hangout-text-expanded-task-reward">
              Earn up to 10 tokens completing this task
            </div> 
          </div>
          <div className="hangout-expanded-accept-button-container">
            {!task.isLocked ? 
              <ActionLink className="hangout-expanded-accept-button" href="#" 
                onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
                Accept
              </ActionLink>
              :
              <span className="tasks-scanner-task-locked-icon glyphicon glyphicon-lock">Locked</span>
            }
          </div>
        </div>
      </div>
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
    if (props.isExpanded) {
      return (
        <div className="container-fluid" id="tasks-scanner-list-container">
          <div className="row" id="tasks-scanner-list-tasks">
          {
            foundTasks.map(function(task, i) {
              return RenderSingleTaskExpanded(task, i, props);
              })
            }
          </div>
        </div>
      );
    }
    else {
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
  }
  else {
    return null;
  }
}

export default NetworkTasks;