/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';

import {Icon} from 'react-fa'

import Axios from 'axios'

import ConfigMain from '~/configs/main'

import TasksWidget from '~/src/theme/components/TasksWidget'

import DetailsPopup from '~/src/components/common/DetailsPopup';

import {
  setTasks,
  fetchTasksInitiate,
  fetchTasksComplete,
} from '~/src/redux/actions/tasks'

import {
  openSignUpForm,
} from '~/src/redux/actions/authorization'


const BackendURL = ConfigMain.getBackendURL();

const TaskCategoryYour = {
  type: "my_tasks",
  name: "Your tasks"
};

const TaskCategoryOther = {
  type: "other_tasks",
  name: "Other tasks"
};

const TaskCategoryAssign = {
  type: "assign_tasks",
  name: "Assign tasks"
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
      this.props.onFetchAllTasks(true);
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
    else if (newCategoryType == "assign_tasks") {
      newCategory = TaskCategoryAssign;
    }
    else {
      newCategory = TaskCategoryOther;
    }

    let copy = Object.assign({}, this.state, {tasksCategory: newCategory});
    this.setState(copy);
  }

  createAndSaveNewTask(roadmap) {
    //TODO: Move this to Redux
    console.log("TaskManagement::createAndSaveNewTask");
    this.props.fetchTasksInitiate();
    let userName = `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`;
    const url = `${BackendURL}/taskSave?userID=${this.props.userProfile._id}
    &userName=${userName}&type=${'find_mentor'}&roadmapID=${roadmap.id}&roadmapName=${roadmap.name}&isHidden=0`;

    Axios.get(url)
    .then((response) =>this.handleSaveNewTaskSuccess(response))
    .catch((error) =>this.handleSaveNewTaskError(error));
  }

  handleSaveNewTaskSuccess(response) {
    console.log("TaskManagement::handleSaveNewTaskSuccess");
    console.dir(response.data);
    this.props.fetchTasksComplete();
    this.props.onFetchAllTasks(true);
  }

  handleSaveNewTaskError(error) {
    this.props.fetchTasksComplete();
    this.props.onFetchAllTasks(true);
  }
  
  handleOpenConfirmTaskDetailsPopup(item){
    console.log(item);
    let copy = Object.assign({}, this.state, {isDetailsPopupOpen: true,detailsPopupItem: item});
    this.setState(copy)
  }

  handleCloseConfirmTaskDetailsPopup(item) {
    let copy = Object.assign({}, this.state, {isDetailsPopupOpen: false});
    this.setState(copy)
    this.props.onFetchAllTasks(true);
  }

  handleAcceptConfirm(item){
    let userID = this.props.userProfile ? this.props.userProfile._id : undefined; //"59fdda7f82fff92dc7527d28";
    var params={
      _id:this.state.detailsPopupItem._id,
      taskAsigneeId:userID
    }
    Axios.get(`${ConfigMain.getBackendURL()}/taskAssign?_id=${this.state.detailsPopupItem._id}&taskAsigneeId=${userID}`)
    .then((response) =>this.handleCloseConfirmTaskDetailsPopup(response))
    .catch((error) =>this.handleCloseConfirmTaskDetailsPopup(error));
  }

  handleOpenCancelTaskDetailsPopup(item){
    console.log(item);
    let copy = Object.assign({}, this.state, {isDetailsPopupOpenCancelTask: true,detailsPopupItem: item});
    this.setState(copy)
  }

  handleCloseCancelTaskDetailsPopup(item) {
    let copy = Object.assign({}, this.state, {isDetailsPopupOpenCancelTask: false});
    this.setState(copy)
    this.props.onFetchAllTasks(true);
  }

  handleAcceptCancel(item){
    let userID = this.props.userProfile ? this.props.userProfile._id : undefined; //"59fdda7f82fff92dc7527d28";
    var params={
      _id:this.state.detailsPopupItem._id,
      taskAsigneeId:userID
    }
    Axios.get(`${ConfigMain.getBackendURL()}/taskCancel?_id=${this.state.detailsPopupItem._id}&taskAsigneeId=${userID}`)
    .then((response) =>this.handleCloseCancelTaskDetailsPopup(response))
    .catch((error) =>this.handleCloseCancelTaskDetailsPopup(error));
  }

  render() {
    console.log("TaskManagement::render");
    console.dir(this.state);
    if (this.props.isTasksFetchInProgress) {
      return (<h3>Loading tasks. Please wait... <Icon spin name="spinner" /></h3>);
    }

    return (
    <div>
    <TasksWidget cookies={this.props.cookies}
    tasksCategory={this.state.tasksCategory}
    onSelectCategory={(categoryType)=>this.selectCategory(categoryType)}
    allTasks={this.props.tasks}
    userProfile={this.props.userProfile}
    acceptTask={(item)=>this.handleOpenConfirmTaskDetailsPopup(item)}
    cancelTask={(item)=>this.handleOpenCancelTaskDetailsPopup(item)}
    onOpenSignUpForm={() => this.props.openSignUpForm()}/>

    <DetailsPopup modalIsOpen={this.state.isDetailsPopupOpen} onConfirm={(item)=>this.handleAcceptConfirm(item)} onCloseModal={()=>this.handleCloseConfirmTaskDetailsPopup()} item={this.state.detailsPopupItem} item="accept_confirmation" />   
    <DetailsPopup modalIsOpen={this.state.isDetailsPopupOpenCancelTask} onConfirm={(item)=>this.handleAcceptCancel(item)} onCloseModal={()=>this.handleCloseCancelTaskDetailsPopup()} item={this.state.detailsPopupItem} item="cancel_confirmation" />   
  </div>
  );
  }
}

TaskManagement.propTypes = {
  tasks: PropTypes.array.isRequired,
  isTasksFetchInProgress: PropTypes.bool.isRequired,

  openSignUpForm: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  fetchTasksInitiate: PropTypes.func.isRequired,
  fetchTasksComplete: PropTypes.func.isRequired,
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement)));