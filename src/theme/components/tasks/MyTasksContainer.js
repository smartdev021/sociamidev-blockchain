/*
    author: Alexander Zolotov
*/
import React from 'react';

import MyTasks from './MyTasks'

import ActionLink from '~/src/components/common/ActionLink'

const MyTasksContainer = (props) => {
    return(
    <div id="tasks-management-my-tasks">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10">
            <div className="content-2-columns-left-title">My Tasks</div>
          </div>
          <div className="col-lg-2">
            <div className="content-2-columns-left-title">
              <ActionLink href="#" onClick={()=>props.toggleMyTasksCategory()}>{props.tasksCategoryName}</ActionLink>
            </div>
          </div>
        </div>
        <div id="my-tasks-container">
           <MyTasks tasks={props.tasks} handleOpenCancelTaskDetailsPopup={(task)=>props.handleOpenCancelTaskDetailsPopup(task)}/>
        </div>
      </div>
    </div>);
}

export default MyTasksContainer;