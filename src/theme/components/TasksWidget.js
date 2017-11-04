/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import "~/src/css/tasksWidget.css"
import PropTypes from 'prop-types';

const TaskTypesToNameMap = {find_mentor: "Find Mentor",};

class TasksWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  taskTypeToName(taskType) {
    return TaskTypesToNameMap[taskType];
  }

  renderTasks() {
    let userID = this.props.userProfile ? this.props.userProfile._id : undefined;

    console.log("renderTasks userID: " + userID);

    let that = this;
    if (this.props.allTasks.length > 0) {
      let tasksFiltered = [];

      if (this.props.tasksCategory.type == "my_tasks") {
        if (userID) {
          tasksFiltered = this.props.allTasks.filter(function(task) {
            return task.userID == userID;
          });
        }
        else {
          return (<p><button type="button" className="btn btn-lg btn-outline-inverse" 
        onClick={()=> this.props.onOpenSignUpForm()}>Login to see your tasks</button></p>);
        }
        
      }
      else {
        tasksFiltered = this.props.allTasks.filter(function(task) {
          return task.userID != userID;
        });
      }
      return (
        <div className="list-group">
          {tasksFiltered.map(function(task, i) {
            return(
              <li className="list-group-item" key={i}>
                <span className="taskTextElement taskName">{that.taskTypeToName(task.type)}</span>
                <span className="taskTextElement taskUserName">{task.userName}</span>
                <span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span>
              </li>);
          })}
        </div>
      );
    }
    else {
      return (<p>No tasks yet. Go add some in "Results page"</p>);
    }
  }

  render() {
    return (
        <div className="container-fluid tasksContainer">
            <h2>{this.props.tasksCategory.name}</h2>
            <button type="button" className="btn btn-lg btn-outline-inverse" 
               onClick={()=>this.props.onSelectCategory("my_tasks")}>Your Tasks</button>
             <button type="button" className="btn btn-lg btn-outline-inverse" 
               onClick={()=>this.props.onSelectCategory("other_tasks")}>Other Tasks</button>
              {this.renderTasks()}
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