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

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme_new/css/common.css"
import "~/src/theme_new/css/tasksManagement.css"

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

  getTasksAssignedToMe() {
    let myTasks = [];

    if (this.props.isAuthorized) {
      const currentUserId = this.props.userProfile._id;

      let findByUserId = function(assignee) {
        return assignee.userID == currentUserId;
      }
      
      myTasks = this.props.tasks.filter(function(task) {
        return task.taskAsigneeId && task.taskAsigneeId.length > 0 && task.taskAsigneeId.findIndex(findByUserId) != -1;
      });
    }

    return myTasks;
  }

  getTasksCreatedByMe() {
    let myTasks = [];

    if (this.props.isAuthorized) {
      const currentUserId = this.props.userProfile._id;

      myTasks = this.props.tasks.filter(function(task) {
        return task.userID && task.userID == currentUserId;
      });
    }

    return myTasks;
  }

  getProjectsCreatedByMeWithTasks() {
    let projects = [];
    
    if (this.props.projects.length > 0) {
      const currentUserId = this.props.userProfile._id;

      projects = this.props.projects.filter(function(project) {
        return project.userID == currentUserId && project.milestones && project.milestones.length > 0;
      });
    }

    console.log("getProjectsCreatedByMeWithTasks projects: " + projects.length);
    
    return projects;
  }

  /*Return projects with only those milestones, assigned to current user*/
  getProjectsWithTasksAssignedToMe() {
    const tasksAssignedToMe = this.getTasksAssignedToMe();

    let projects = [];
    
    if (this.props.projects.length > 0 && tasksAssignedToMe.length > 0) {
      const currentUserId = this.props.userProfile._id;

      //1. Get all projects that contain at least one milestone
      const projectsWithMilestones = this.props.projects.filter(function(project) {
        return project.userID != currentUserId && project.milestones && project.milestones.length > 0;
      });

      //2. For each project Check if any milestone is contained in tasksAssignedToMe
      for (let i = 0; i < projectsWithMilestones.length; ++i) {
        const currentProject = projectsWithMilestones[i];

        let projectToAdd = Object.assign({}, currentProject);
        projectToAdd.milestones = [];

        for (let j = 0; j < currentProject.milestones.length; ++j) {
          let findMilestoneById = function(milestone) {
            return milestone._id == currentProject.milestones[j]._id;
          }

          if (tasksAssignedToMe.findIndex(findMilestoneById) != -1) {
            projectToAdd.milestones.push(currentProject.milestones[j]);            
          }
        }

        if (projectToAdd.milestones.length > 0) {
          projects.push(projectToAdd);
        }
      }
    }
    
    return projects;
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
      this.props.onFetchAllTasks(true);
    }
  }

  componentWillMount() {
    this.props.projectsFetch();
    this.storeAndFetchTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.userProfile._id && this.props.userProfile._id) {
      console.log("!prevProps.userProfile._id && this.props.userProfile._id");
      this.storeAndFetchTasks();
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
    this.props.onFetchAllTasks(true);
  }

  handleSaveNewTaskError(error) {
    this.props.fetchTasksComplete();
    this.props.onFetchAllTasks(true);
  }
  
  handleOpenConfirmTaskDetailsPopup(item) {
    console.log(item);
    
    if (this.props.isAuthorized) {
      let copy = Object.assign({}, this.state, {isDetailsPopupOpen: true,detailsPopupItem: item});
      this.setState(copy)
    }
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

  renderSubtasks(task) {
    if (task.milestones && task.milestones.length > 0) {
      return (
        <div id="subtasks">
        {task.milestones.map(function(milestone, i) {
              return (
                <div key={i} className="subtask">
                  <span>{milestone.name}</span>
                </div>
              );
            })}
      </div>
      );
    }
    else {
      return (<div id="subtasks">
    </div>);
    }
  }
  
  renderTasks(tasks) {
    let filteredTasks = [];

    let that = this;

    filteredTasks = tasks.filter(function(task) {
      return task.name && task.name != "";
    });

    if (filteredTasks.length > 0) {
      const DummyImages = [
        "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/medium.png",
        "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/howcast.png",
      ];

      return (
        <ul>
          {
            filteredTasks.map(function(task, i) {
              return (
              <li key={i}>
                <div className="tasks-management-my-task">
                  {!task.milestones && <img src={DummyImages[Math.floor(Math.random() * (DummyImages.length - 0)) + 0]}></img>}
                  <span>{task.name}</span>
                  {that.renderSubtasks(task)}
                </div>
              </li>
              );
            })
          }
        </ul>
      );
    }
    else {
      return (<ul></ul>);
    }
  }

  renderNetworkTasks() {
    let foundTasks = [];
    
    const scannerQuery = this.state.scannerQuery.toLowerCase();

    if (scannerQuery != "") {
      foundTasks = this.props.tasks.filter(function(task) {
        return task.name && task.name.toLowerCase().startsWith(scannerQuery);
      });
    }
    else {
      foundTasks = this.props.tasks;
    }

    let that = this;

    if (foundTasks.length > 0) {
      return (
        <ul id="tasks-scanner-list-tasks">
          {
            foundTasks.map(function(task, i) {
              return (<li key={i}>
              <div>
                <ActionLink href="#" onClick={()=>that.handleOpenConfirmTaskDetailsPopup(task)}>{task.name}</ActionLink>
              </div>
            </li>);
            })
          }
        </ul>
      );
    }
    else {
      return (<span>Nothing found</span>);
    }
  }

  renderLeftSide() {
    const tasksAssignedToMe = this.getTasksAssignedToMe().concat(this.getProjectsWithTasksAssignedToMe());
    const tasksCreatedByMe = this.getTasksCreatedByMe().concat(this.getProjectsCreatedByMeWithTasks());

    if (tasksAssignedToMe.length == 0 && tasksCreatedByMe.length == 0) {
      return <span></span>;
    }

    const myTasks = this.state.tasksCategory.type == TaskCategoryAssigned.type ? tasksAssignedToMe : tasksCreatedByMe;
    
    return (
      <div className="col-lg-9">
      <div className="content-2-columns-left">
        <div id="tasks-management-my-tasks">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-10">
                <div className="content-2-columns-left-title">My Tasks</div>
              </div>
              <div className="col-lg-2">
                <div className="content-2-columns-left-title">
                  <ActionLink href="#" onClick={()=>this.toggleMyTasksCategory()}>{this.state.tasksCategory.name}</ActionLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div id="my-tasks-container">
                  {this.renderTasks(myTasks)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  renderRightSide() {
    return (
      <div className={this.getMyTasksAll().length > 0 ? "col-lg-3" : "col-lg-12"}>
        <div className="content-2-columns-right">
          <div id="tasks-scanner-container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="content-2-columns-right-title">Network tasks scanner</div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div id="scanner-input-container">
                    <input type="text" autoComplete="off" id="scanner_trees" placeholder="" onChange={(e) => this.handleChange(e)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <p>Complete network quests to earn tokens</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  {this.renderNetworkTasks()}
                </div>
              </div>
            </div>
          </div>
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
  projects: PropTypes.array.isRequired,
  isTasksFetchInProgress: PropTypes.bool.isRequired,

  openSignUpForm: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  fetchTasksInitiate: PropTypes.func.isRequired,
  fetchTasksComplete: PropTypes.func.isRequired,
  projectsFetch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  isAuthorized: state.isAuthorized,
  tasks: state.tasks,
  projects: state.projects,
  isTasksFetchInProgress: state.isTasksFetchInProgress,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  setTasks: bindActionCreators(setTasks, dispatch),
  projectsFetch: bindActionCreators(projectsFetch, dispatch),
  fetchTasksInitiate: bindActionCreators(fetchTasksInitiate, dispatch),
  fetchTasksComplete: bindActionCreators(fetchTasksComplete, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement)));