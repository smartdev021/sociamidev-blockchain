/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import TasksWidget from '~/src/theme/components/TasksWidget'

class TaskManagement extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (<TasksWidget/>);
  }
}

export default TaskManagement;