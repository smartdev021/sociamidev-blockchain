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
    console.log("TaskManagement::storeAndFetchTasks");
    const { cookies } = this.props;
    const lastViewedRoadmapId = cookies.get('lastViewedRoadmapId');

    if (this.props.userProfileID && lastViewedRoadmapId) {
      console.log("TaskManagement::storeAndFetchTasks lastViewedRoadmapId: " + lastViewedRoadmapId);

      this.createAndSaveNewTask(lastViewedRoadmapId);
      cookies.remove('lastViewedRoadmapId');
    }
    else {
      this.fetchAllTasks();
    }
  }

  componentWillMount() {
    console.log("TaskManagement::componentWillMount");
    this.storeAndFetchTasks();
  }

  omponentDidUpdate(prevProps, prevState) {
    if (!prevProps.userProfileID && this.props.userProfileID) {
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
    console.log("TaskManagement::fetchAllTasks");
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
    console.log("TaskManagement::handleFetchAllTasks");
  }

  handleFetchAllTasksError(error) {
    console.log("Fetch tasks error: " + error);
    this.setLoading(false);
    console.log("TaskManagement::handleFetchAllTasksError");
  }

  createAndSaveNewTask(roadmapID) {
    const url = `${BackendURL}/taskSave?userID=${this.props.userProfileID}&type=${'find_mentor'}&roadmapID=${roadmapID}`;

    console.log("TaskManagement::createAndSaveNewTask url: " + url);

    Axios.get(url)
    .then((response) =>this.handleSaveNewTaskSuccess(response))
    .catch((error) =>this.handleSaveNewTaskError(error));
  }

  handleSaveNewTaskSuccess(response) {
    console.log("Task save success");

    this.fetchAllTasks();

    console.log("TaskManagement::handleSaveNewTaskSuccess");
  }

  handleSaveNewTaskError(error) {
    console.log("Save task error: " + error);

    this.fetchAllTasks();
  }
  
  render() {
    console.log("userProfileID: " + this.props.userProfileID);
    if (this.state.isLoading) {
      return (<p>Fetching data. Please wait...</p>);
    }

    return (<TasksWidget cookies={this.props.cookies}
    tasksCategory={this.state.tasksCategory}
    onSelectCategory={(categoryType)=>this.selectCategory(categoryType)}
    allTasks={this.state.allTasks}
    userProfileID={this.props.userProfileID}
    onOpenSignUpForm={() => this.props.openSignUpForm()}
    createAndSaveNewTask={(userID, roadmapID)=>this.createAndSaveNewTask(userID, roadmapID)}/>);
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