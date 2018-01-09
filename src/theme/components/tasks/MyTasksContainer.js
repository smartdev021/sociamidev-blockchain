/*
    author: Alexander Zolotov
*/
import React from 'react';

import MyTasks from './MyTasks'

import Organizer from '~/src/theme/components/tasks/Organizer'

import ActionLink from '~/src/components/common/ActionLink'

const MyTasksContainer = (props) => {
    return(
    <div id="tasks-management-my-tasks">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="content-2-columns-left-title">My Tasks</div>
          </div>
          <div className="col-lg-8">
            <div className="content-2-columns-left-title">
              <form>
                {
                  props.categories.map(function(category, i) {
                    return (
                      <label className="radio-inline" key={i}>
                        <input type="radio" name="optradio" checked={props.selectedCategory.type == category.type} 
                          value={category.type} onChange={(e)=>props.onHandleCategoryChange(e)}/>{category.name}
                      </label>
                    )
                  })
                }
              </form>
            </div>
          </div>
        </div>
        <div id="my-tasks-container">
          <Organizer onHangoutActionPerform={(action, hangout) => props.onHangoutActionPerform(action, hangout)} 
            tasks={props.assignedTasks}
              currentUserID={props.currentUserID}
                timeNow={props.timeNow}/>
          {<MyTasks tasks={props.tasks} 
               onHangoutRequestAccept={(hangout, user)=>props.onHangoutRequestAccept(hangout, user)}
               onHangoutRequestReject={(hangout, user)=>props.onHangoutRequestReject(hangout, user)}
               onHangoutActionPerform={(action, hangout) => props.onHangoutActionPerform(action, hangout)}
               currentUserID={props.currentUserID}
               selectedCategory={props.selectedCategory}
               handleOpenCancelTaskDetailsPopup={(task)=>props.handleOpenCancelTaskDetailsPopup(task)}/>
          }
        </div>
      </div>
    </div>);
}

export default MyTasksContainer;