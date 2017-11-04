/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import TasksWidget from '~/src/theme/components/TasksWidget'

class TaskManagement extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (<TasksWidget cookies={this.props.cookies}/>);
  }
}

export default withCookies(TaskManagement);