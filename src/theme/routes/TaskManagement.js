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
  setTasks,
  fetchTasksInitiate,
  fetchTasksComplete,
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
      tasksCategory: TaskCategoryYour,
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

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate prevProps.userProfile._id: " + prevProps.userProfile._id);
    console.dir(this.props.userProfile);
    if (!prevProps.userProfile._id && this.props.userProfile._id) {
      console.log("!prevProps.userProfile._id && this.props.userProfile._id");
      this.selectCategory("my_tasks");
      this.storeAndFetchTasks();
    }
  }

  selectCategory(newCategoryType) {
    let newCategory = {};

    if (newCategoryType == "my_tasks") {
      newCategory = TaskCategoryYour;
    }
    else {
      newCategory = TaskCategoryOther;
    }

    let copy = Object.assign({}, this.state, {tasksCategory: newCategory});
    this.setState(copy);
  }

  fetchAllTasks() {
    if (!this.props.isTasksFetchInProgress) {
      this.props.fetchTasksInitiate();
      const url = `${BackendURL}/tasksGet`;
      
      Axios.get(url)
      .then((response) =>this.handleFetchAllTasks(response))
      .catch((error) =>this.handleFetchAllTasksError(error));
    }
  }

  handleFetchAllTasks(response) {
    let tasks = response.data;

    console.log("response.data: ");
    console.dir(response.data);
    this.props.setTasks(tasks);

    this.props.fetchTasksComplete();
  }

  handleFetchAllTasksError(error) {
    this.props.fetchTasksComplete()
  }

  createAndSaveNewTask(roadmap) {
    this.props.fetchTasksInitiate();
    let userName = `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`;
    const url = `${BackendURL}/taskSave?userID=${this.props.userProfile._id}&userName=${userName}&type=${'find_mentor'}&roadmapID=${roadmap.id}&roadmapName=${roadmap.name}`;

    Axios.get(url)
    .then((response) =>this.handleSaveNewTaskSuccess(response))
    .catch((error) =>this.handleSaveNewTaskError(error));
  }

  handleSaveNewTaskSuccess(response) {
    this.props.fetchTasksComplete();
    this.fetchAllTasks();
  }

  handleSaveNewTaskError(error) {
    this.props.fetchTasksComplete();
    this.fetchAllTasks();
  }
  
  render() {
    console.log("TaskManagement::render");
    console.dir(this.state);
    if (this.props.isTasksFetchInProgress) {
      return (<p>Loading tasks. Please wait...</p>);
    }

    return (<TasksWidget cookies={this.props.cookies}
    tasksCategory={this.state.tasksCategory}
    onSelectCategory={(categoryType)=>this.selectCategory(categoryType)}
    allTasks={this.props.tasks}
    userProfile={this.props.userProfile}
    onOpenSignUpForm={() => this.props.openSignUpForm()}/>);
  }
}

TaskManagement.propTypes = {
  tasks: PropTypes.array.isRequired,
  isTasksFetchInProgress: PropTypes.bool.isRequired,

  openSignUpForm: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  fetchTasksInitiate: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  isAuthorized: state.isAuthorized,
  tasks: state.tasks,
  isTasksFetchInProgress: state.isTasksFetchInProgress,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  setTasks: bindActionCreators(setTasks, dispatch),
  fetchTasksInitiate: bindActionCreators(fetchTasksInitiate, dispatch),
  fetchTasksComplete: bindActionCreators(fetchTasksComplete, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement));