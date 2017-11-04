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
      isLoading: false,
    }
  }

  storeAndFetchTasks() {
    const { cookies } = this.props;
    const lastViewedRoadmap = cookies.get('lastViewedRoadmap');

    if (this.props.userProfile._id && lastViewedRoadmap) {

      this.createAndSaveNewTask(lastViewedRoadmap);
      cookies.remove('lastViewedRoadmap');
    }
    else {
      this.fetchAllTasks();
    }
  }

  componentWillMount() {
    this.storeAndFetchTasks();
  }

  omponentDidUpdate(prevProps, prevState) {
    if (!prevProps.userProfile._id && this.props.userProfile._id) {
      this.selectCategory("my_tasks");
      this.storeAndFetchTasks();
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

  setLoading(value) {
    let copy = Object.assign({}, this.state, {isLoading: value});
    this.setState(copy);
  }

  fetchAllTasks() {
    this.setLoading(true);
    const url = `${BackendURL}/tasksGet`;

    Axios.get(url)
    .then((response) =>this.handleFetchAllTasks(response))
    .catch((error) =>this.handleFetchAllTasksError(error));
  }

  handleFetchAllTasks(response) {
    let tasks = response.data;

    let copy = Object.assign({}, this.state, {allTasks: tasks});
    this.setState(copy);

    this.setLoading(false);
  }

  handleFetchAllTasksError(error) {
    this.setLoading(false);
  }

  createAndSaveNewTask(roadmap) {
    let userName = `${this.props.userProfile.firstName}" " ${this.props.userProfile.lastName}`;
    const url = `${BackendURL}/taskSave?userID=${this.props.userProfile._id}&userID=${userName}&type=${'find_mentor'}&roadmapID=${roadmap.id}&roadmapName=${roadmap.name}`;

    Axios.get(url)
    .then((response) =>this.handleSaveNewTaskSuccess(response))
    .catch((error) =>this.handleSaveNewTaskError(error));
  }

  handleSaveNewTaskSuccess(response) {
    this.fetchAllTasks();
  }

  handleSaveNewTaskError(error) {
    this.fetchAllTasks();
  }
  
  render() {

    return (<TasksWidget cookies={this.props.cookies}
    tasksCategory={this.state.tasksCategory}
    onSelectCategory={(categoryType)=>this.selectCategory(categoryType)}
    allTasks={this.state.allTasks}
    userProfile={this.props.userProfile}
    onOpenSignUpForm={() => this.props.openSignUpForm()}/>);
  }
}

TaskManagement.propTypes = {
  openSignUpForm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  isAuthorized: state.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement));