/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import "~/src/css/tasksWidget.css"

class TasksWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container-fluid tasksContainer">
            <h2>Your tasks</h2>
              <div className="list-group">
                <li className="list-group-item">Find a mentor<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
                <li className="list-group-item">Another task<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
                <li className="list-group-item">Yet another task<span className="glyphicon glyphicon-bitcoin taskIcon pull-right"></span></li>
            </div>
        </div>
    );
  }
}

export default TasksWidget;