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

import DetailsPopup from '~/src/components/common/DetailsPopup';

import ActionLink from '~/src/components/common/ActionLink'

import MyTasksContainer from '~/src/theme/components/tasks/MyTasksContainer'
import NetworkTasks from '~/src/theme/components/tasks/NetworkTasks'

import TasksScannerContainer from '~/src/theme/components/tasks/TasksScannerContainer'

import "~/src/theme/css/common.css"
import "~/src/theme/css/tasksManagement.css"

import {
  setTasks,
  fetchTasksInitiate,
  fetchTasksComplete,
} from '~/src/redux/actions/tasks'

import {
  openSignUpForm,
} from '~/src/redux/actions/authorization'

import {
  projectsFetch,
} from '~/src/redux/actions/projects'

import {
  fetchUserTasks,
} from '~/src/redux/actions/authorization'

const BackendURL = ConfigMain.getBackendURL();

const TaskCategoryYour = {
  type: "my_tasks",
  name: "Created tasks"
};

const TaskCategoryAssigned = {
  type: "assign_tasks",
  name: "Assigned tasks"
};

class TaskManagement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasksCategory: TaskCategoryAssigned,
      scannerQuery: "",
    }
  }

  groupTasksByProjects(tasks) {
    let results = [];

    let projects = {};

    for (let i = 0; i < tasks.length; ++i) {
      if (tasks[i].type == "project_milestone") {
        if (!projects.hasOwnProperty(tasks[i].metaData.projectId)) {
          projects[tasks[i].metaData.projectId] = {_id: tasks[i].metaData.projectId, name: tasks[i].metaData.projectName, milestones: []};
        }

        projects[tasks[i].metaData.projectId].milestones.push(tasks[i]);
      }
      else {
        results.push(tasks[i]);
      }
    }

    for (let tasksGrouped in projects) {
      results.push(projects[tasksGrouped]);
    }

    return results;
  }

  getTasksAssignedToMe() {
    const tasksGroupedByProjects = this.groupTasksByProjects(this.props.tasksAssignedToCurrentUser);
    return tasksGroupedByProjects;
  }

  getTasksCreatedByMe() {
    const tasksGroupedByProjects = this.groupTasksByProjects(this.props.tasksCreatedCurrentUser);
    return tasksGroupedByProjects;
  }

  getMyTasksAll() {
    const tasksAssignedToMe = this.getTasksAssignedToMe();
    const tasksCreatedByMe = this.getTasksCreatedByMe();

    console.log("TasksAssignedToMe.length: " + tasksAssignedToMe.length + "TasksCreatedByMe.length: " + tasksCreatedByMe.length);

    return tasksAssignedToMe.concat(tasksCreatedByMe);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({scannerQuery: e.target.value});
  }

  storeAndFetchTasks() {
    const { cookies } = this.props;
    const lastViewedRoadmap = cookies.get('lastViewedRoadmap');

    if (this.props.userProfile._id && lastViewedRoadmap) {

      this.createAndSaveNewTask(lastViewedRoadmap);
      cookies.remove('lastViewedRoadmap');
    }
    else {
      this.props.onFetchAllTasks(false);
    }
  }

  fetchUserTasks() {
    if (this.props.isAuthorized && !this.props.isUserTasksLoading) {
      this.props.fetchUserTasks(this.props.userProfile._id);
    }
  }

  componentWillMount() {
    // this.storeAndFetchTasks();
    this.fetchUserTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.userProfile._id && this.props.userProfile._id) {
      console.log("!prevProps.userProfile._id && this.props.userProfile._id");
      this.storeAndFetchTasks();
    }

    if (!prevProps.isAuthorized && this.props.isAuthorized) {
      this.fetchUserTasks();
    }
  }

  toggleMyTasksCategory() {
    let newCategory = {};

    if (this.state.tasksCategory.type == TaskCategoryYour.type) {
      newCategory = TaskCategoryAssigned;
    }
    else {
      newCategory = TaskCategoryYour;
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
    this.props.onFetchAllTasks(false);
  }

  handleSaveNewTaskError(error) {
    this.props.fetchTasksComplete();
    this.props.onFetchAllTasks(false);
  }
  
  handleOpenConfirmTaskDetailsPopup(item) {
    console.log(item);
    
    if (this.props.isAuthorized && item.userID != this.props.userProfile._id) {
      let copy = Object.assign({}, this.state, {isDetailsPopupOpen: true,detailsPopupItem: item});
      this.setState(copy)
    }
  }

  handleCloseConfirmTaskDetailsPopup(item) {
    let copy = Object.assign({}, this.state, {isDetailsPopupOpen: false});
    this.setState(copy)
    this.props.onFetchAllTasks(false);
    this.fetchUserTasks();
  }

  handleAcceptConfirm(item){
    let userID = this.props.userProfile ? this.props.userProfile._id : undefined; //"59fdda7f82fff92dc7527d28";
    var params={
      _id:this.state.detailsPopupItem._id,
      taskAsigneeId:userID
    }

    const body = {
      _id: this.state.detailsPopupItem._id, 
      assignee: {
        _id: this.props.userProfile._id,
        firstName: this.props.userProfile.firstName,
        lastName: this.props.userProfile.lastName,
      }
    };

    Axios.post(`${ConfigMain.getBackendURL()}/taskAssign`, body)
    .then((response) =>this.handleCloseConfirmTaskDetailsPopup(response))
    .catch((error) =>this.handleCloseConfirmTaskDetailsPopup(error));
  }

  handleOpenCancelTaskDetailsPopup(item){
    console.log(item);

    if (this.props.isAuthorized && item.userID != this.props.userProfile._id) {
      let copy = Object.assign({}, this.state, {isDetailsPopupOpenCancelTask: true,detailsPopupItem: item});
      this.setState(copy)
    }
  }

  handleCloseCancelTaskDetailsPopup(item) {
    let copy = Object.assign({}, this.state, {isDetailsPopupOpenCancelTask: false});
    this.setState(copy)
    this.props.onFetchAllTasks(false);
    this.fetchUserTasks();
  }

  handleAcceptCancel(item){
    let userID = this.props.userProfile ? this.props.userProfile._id : undefined; //"59fdda7f82fff92dc7527d28";
    var params={
      _id:this.state.detailsPopupItem._id,
      taskAsigneeId:userID
    }
    const body = {
      _id: this.state.detailsPopupItem._id
    };

    Axios.post(`${ConfigMain.getBackendURL()}/taskCancel`, body)
    .then((response) =>this.handleCloseCancelTaskDetailsPopup(response))
    .catch((error) =>this.handleCloseCancelTaskDetailsPopup(error));
  }

  renderLeftSide() {
    const tasksAssignedToMe = this.getTasksAssignedToMe();
    const tasksCreatedByMe = this.getTasksCreatedByMe();

    if (tasksAssignedToMe.length == 0 && tasksCreatedByMe.length == 0) {
      return <span></span>;
    }

    const myTasks = this.state.tasksCategory.type == TaskCategoryAssigned.type ? tasksAssignedToMe : tasksCreatedByMe;
    
    return (
      <div className="col-lg-9">
      <div className="content-2-columns-left">
        <MyTasksContainer 
          tasks={myTasks}
          tasksCategoryName={this.state.tasksCategory.name}
          toggleMyTasksCategory={()=>this.toggleMyTasksCategory()}
          handleOpenCancelTaskDetailsPopup={(task)=>this.handleOpenCancelTaskDetailsPopup(task)}
        />
      </div>
    </div>
    );
  }

  renderRightSide() {
    let tasksFiltered = [];

    const currentUserId = this.props.userProfile._id;

    if (this.props.isAuthorized) {
      tasksFiltered = this.props.tasks.filter(function(task) {
        return task.userID != currentUserId && (!task.assignee || task.assignee._id != currentUserId);
      });
    }
    else {
      tasksFiltered = this.props.tasks;
    }

    return (
      <div className={this.getMyTasksAll().length > 0 ? "col-lg-3" : "col-lg-12"}>
        <div className="content-2-columns-right">
          <TasksScannerContainer tasks={tasksFiltered} scannerQuery={this.state.scannerQuery} 
            currentUserID={this.props.userProfile._id}
            handleOpenConfirmTaskDetailsPopup={(task)=>this.handleOpenConfirmTaskDetailsPopup(task)}
            handleChange={(e)=>this.handleChange(e)}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
        <div className="content-2-columns-wrapper">
        <DetailsPopup modalIsOpen={this.state.isDetailsPopupOpen} onConfirm={(item)=>this.handleAcceptConfirm(item)} 
          onCloseModal={()=>this.handleCloseConfirmTaskDetailsPopup()} item={this.state.detailsPopupItem} item="accept_confirmation" />   
        <DetailsPopup modalIsOpen={this.state.isDetailsPopupOpenCancelTask} onConfirm={(item)=>this.handleAcceptCancel(item)} 
          onCloseModal={()=>this.handleCloseCancelTaskDetailsPopup()} item={this.state.detailsPopupItem} item="cancel_confirmation" />   
          <div className="container-fluid">
            <div className="row">
              {this.renderLeftSide()}
              {this.renderRightSide()}
            </div>
          </div>
        </div>
    );
  }
}

TaskManagement.propTypes = {
  tasks: PropTypes.array.isRequired,

  tasksCreatedCurrentUser: PropTypes.array.isRequired,
  tasksAssignedToCurrentUser: PropTypes.array.isRequired,
  isUserTasksLoading: PropTypes.bool.isRequired,

  projects: PropTypes.array.isRequired,
  isTasksFetchInProgress: PropTypes.bool.isRequired,

  openSignUpForm: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  fetchTasksInitiate: PropTypes.func.isRequired,
  fetchTasksComplete: PropTypes.func.isRequired,
  fetchUserTasks: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile.profile,
  isAuthorized: state.userProfile.isAuthorized,
  tasks: state.tasks,

  userTasks: state.userProfile.tasks,

  tasksCreatedCurrentUser: state.userProfile.tasks.created,
  tasksAssignedToCurrentUser: state.userProfile.tasks.assigned,
  isUserTasksLoading: state.userProfile.tasks.isLoading,

  projects: state.projects,
  isTasksFetchInProgress: state.isTasksFetchInProgress,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  setTasks: bindActionCreators(setTasks, dispatch),
  fetchTasksInitiate: bindActionCreators(fetchTasksInitiate, dispatch),
  fetchTasksComplete: bindActionCreators(fetchTasksComplete, dispatch),
  fetchUserTasks: bindActionCreators(fetchUserTasks, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement)));