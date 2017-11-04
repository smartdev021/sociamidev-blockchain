/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import "~/src/css/tasksWidget.css"
import PropTypes from 'prop-types';

class TasksWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTasks() {
    if (this.props.tasksCategory.type == "my_tasks") {
      return (
        <div className="list-group">
          <li className="list-group-item">Find a mentor<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
          <li className="list-group-item">Another task<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
          <li className="list-group-item">Yet another task<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
        </div>
      );
    }
    else {
      return (
        <div className="list-group">
          <li className="list-group-item">Other user's task<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
          <li className="list-group-item">Yet another other user's task<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
          <li className="list-group-item">Find a mentor: other user<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
        </div>
      );
    }
  }

  render() {
    return (
        <div className="container-fluid tasksContainer">
            <h2>{this.props.tasksCategory.name}</h2>
              {this.renderTasks()}
             <button type="button" className="btn btn-lg btn-outline-inverse" 
               onClick={()=>this.props.onSelectCategory("my_tasks")}>Your Tasks</button>
             <button type="button" className="btn btn-lg btn-outline-inverse" 
               onClick={()=>this.props.onSelectCategory("other_tasks")}>Other Tasks</button>
        </div>
    );
  }
}

TasksWidget.propTypes = {
  tasksCategory: PropTypes.object.isRequired,

  onSelectCategory: PropTypes.func.isRequired,
}

export default TasksWidget;