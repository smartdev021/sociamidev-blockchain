/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PropTypes from 'prop-types';

import Axios from 'axios'

import ConfigMain from '~/configs/main'

import TasksWidget from '~/src/theme/components/TasksWidget'

import {
  openSignUpForm,
} from '~/src/redux/actions/actions'

const BackendURL = ConfigMain.getBackendURL();

const TaskCategoryYour = {
  type: "my_tasks",
  name: "Your tasks"
};

const TaskCategoryOther = {
  type: "other_tasks",
  name: "Other tasks"
};

class TaskManagement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasksCategory: this.props.isAuthorized ? TaskCategoryYour : TaskCategoryOther,
      allTasks: [],
    }
  }

  componentWillMount() {
    this.fetchAllTasks();
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

  fetchAllTasks() {
    const url = `${BackendURL}/tasksGet`;

    Axios.get(url)
    .then((response) =>this.handleFetchAllTasks(response))
    .catch((error) =>this.handleFetchAllTasksError(error));
  }

  handleFetchAllTasks(response) {
    let tasks = response.data;

    let copy = Object.assign({}, this.state, {allTasks: tasks});
    this.setState(copy);
  }

  handleFetchAllTasksError(error) {
    console.log("Fetch tasks error: " + error);
  }
  
  render() {
    return (<TasksWidget cookies={this.props.cookies}
    tasksCategory={this.state.tasksCategory}
    onSelectCategory={(categoryType)=>this.selectCategory(categoryType)}
    allTasks={this.state.allTasks}
    userProfileID={this.props.userProfileID}
    onOpenSignUpForm={() => this.props.openSignUpForm()}/>);
  }
}

TaskManagement.propTypes = {
  openSignUpForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userProfileID: state.userProfile._id,
  isAuthorized: state.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement));