/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import "~/src/css/tasksWidget.css"
import PropTypes from 'prop-types';

import ActionLink from '~/src/components/common/ActionLink'

const TaskTypesToNameMap = {find_mentor: "Find Mentor",};

class TasksWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  taskTypeToName(taskType) {
    return TaskTypesToNameMap[taskType];
  }

  renderTasks() {
    let userID = this.props.userProfile ? this.props.userProfile._id : undefined; //"59fdda7f82fff92dc7527d28";

    console.log("renderTasks userID: " + userID);

    let publishedTasks = [];
    
    publishedTasks = this.props.allTasks.filter(function(task) {
      return !task.isHidden;
    });

    let that = this;
    if (publishedTasks.length > 0) {
      let tasksFiltered = [];

      if (this.props.tasksCategory.type == "my_tasks") {
        if (userID) {
          tasksFiltered = publishedTasks.filter(function(task) {
            return task.userID == userID;
          });
        }
      }
      else if (this.props.tasksCategory.type == "assign_tasks") {
        if (userID) {
          this.props.allTasks.filter(function(task) {
            for(var ii=0;ii<task.taskAsigneeId.length;ii++){
              if(task.taskAsigneeId[ii].userID==userID){
                tasksFiltered.push(task);
              }
            }
            return tasksFiltered;
          });
        }
      }
      else {
        if (userID) {
          this.props.allTasks.filter(function(task) {
            var _bool=true;
            for(var ii=0;ii<task.taskAsigneeId.length;ii++){
              if(task.taskAsigneeId[ii].userID==userID){
                _bool=false;
              }
            }
            if(_bool){
              tasksFiltered.push(task);
            }
            return tasksFiltered;
          });
        }

        // tasksFiltered = this.props.allTasks.filter(function(task) {
        //   return task.userID != userID;
        // });
      }

      if (tasksFiltered.length > 0) {
        let acceptDiv = "taskTextElement hide";
        let cancelDiv= "taskTextElement hide";
        if (this.props.tasksCategory.type=="other_tasks") {
          acceptDiv = "taskTextElement taskAccept"
        }
        else if (this.props.tasksCategory.type=="assign_tasks") {
          cancelDiv= "taskTextElement taskAccept";
        }

        return (
          <div className="list-group">
            {tasksFiltered.map(function(task, i) {

              return(
                <li className="list-group-item" key={i}>
                  <span className="taskTextElement taskName">{that.taskTypeToName(task.type)}</span>
                  <span className="taskTextElement taskUserName">{task.userName}</span>
                  <span className="taskTextElement taskRoadmapName">{task.roadmapName}</span>
                  <span className={acceptDiv} onClick={()=>that.props.acceptTask(task)}>Accept</span>
                  <span className={cancelDiv} onClick={()=>that.props.cancelTask(task)}>Cancel</span>
                  <span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span>
                </li>);
            })}
          </div>
        );
      }
    }

    return (<p>No tasks yet. Go add some in "roadmap page"</p>);
  }

  render() {
    const taskSwitcherYourTasksClass = this.props.tasksCategory.type == "my_tasks" 
    ? "taskCategorySwitcherActive" : "taskCategorySwitcher";
    const taskSwitcherOtherTasksClass = this.props.tasksCategory.type == "other_tasks" 
    ? "taskCategorySwitcherActive" : "taskCategorySwitcher";
    const taskSwitcherAssignTasksClass = this.props.tasksCategory.type == "assign_tasks" 
    ? "taskCategorySwitcherActive" : "taskCategorySwitcher";

    return (
        <div className="container-fluid tasksContainer">
          <div className="row">
              <div className="col-lg-12">
            <h2>{this.props.tasksCategory.name}</h2>
            </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
            <ActionLink href="#" className={taskSwitcherYourTasksClass} onClick={()=>this.props.onSelectCategory("my_tasks")}>
            Your tasks
            </ActionLink>
            <ActionLink href="#" className={taskSwitcherOtherTasksClass} onClick={()=>this.props.onSelectCategory("other_tasks")}>
            Other tasks
            </ActionLink>
            <ActionLink href="#" className={taskSwitcherAssignTasksClass} onClick={()=>this.props.onSelectCategory("assign_tasks")}>
            Assigned tasks
            </ActionLink>
            </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {this.renderTasks()}
              </div>
            </div>
        </div>
    );
  }
}

TasksWidget.propTypes = {
  tasksCategory: PropTypes.object.isRequired,
  allTasks: PropTypes.arrayOf(PropTypes.object).isRequired,

  onSelectCategory: PropTypes.func.isRequired,
}

export default TasksWidget;