/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

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
      <ul id="tasks-scanner-list-tasks">
        {
          foundTasks.map(function(task, i) {
            return (<li key={i}>
            <div>
              <ActionLink href="#" onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>{task.name}</ActionLink>
            </div>
          </li>);
          })
        }
      </ul>
    );
  }
  else {
    return null;
  }
}

export default NetworkTasks;