/*
    author: Alexander Zolotov
*/
import React from 'react';

import MyTasks from './MyTasks'
import MyHangouts from './MyHangouts'

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
          {(props.selectedCategory.type == "requested_hangouts" || props.selectedCategory.type == "requests_sent_hangouts") ?
             <MyHangouts tasks={props.tasks} handleOpenCancelTaskDetailsPopup={(task)=>props.handleOpenCancelTaskDetailsPopup(task)}/>
             :
             <MyTasks tasks={props.tasks} handleOpenCancelTaskDetailsPopup={(task)=>props.handleOpenCancelTaskDetailsPopup(task)}/>
          }
        </div>
      </div>
    </div>);
}

export default MyTasksContainer;