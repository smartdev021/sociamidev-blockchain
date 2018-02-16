/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import TaskScanner from './TaskScanner';
import TasksMy from './TasksMy';
import HeaderTaskManager from './HeaderTaskManager';

class TaskManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 expand-deep">
          <HeaderTaskManager />
          <TasksMy />
        </div>
        <div className="col-md-4 expand-tokens">
          <TaskScanner />
        </div>
      </div>
    );
  }
}

export default TaskManager;