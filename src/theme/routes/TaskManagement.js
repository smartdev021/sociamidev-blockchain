/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import TasksWidget from '~/src/theme/components/TasksWidget'

class TaskManagement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasksCategory: {
        type: "my_tasks",
        name: "Your tasks"
      }
    }
  }

  selectCategory(newCategoryType) {

    let newCategory = "";

    if (newCategoryType == "my_tasks") {
      newCategory = {
        type: newCategoryType,
        name: "Your tasks"};
    }
    else {
      newCategory = {
        type: newCategoryType,
        name: "Other tasks"};
    }

    let copy = Object.assign({}, this.state, {tasksCategory: newCategory});
    this.setState(copy);
  }
  
  render() {
    return (<TasksWidget cookies={this.props.cookies}
    tasksCategory={this.state.tasksCategory}
    onSelectCategory={(categoryType)=>this.selectCategory(categoryType)}/>);
  }
}

export default withCookies(TaskManagement);