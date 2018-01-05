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

import TaskTypes from "~/src/common/TaskTypes"

import "~/src/theme/css/common.css"
import "~/src/theme/css/tasksManagement.css"

import {
  setTasks,
  fetchTasksInitiate,
  fetchTasksComplete,
  hangoutJoin,
  taskStatusChange,
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
  name: "Created"
};

const TaskCategoryAssigned = {
  type: "assign_tasks",
  name: "Assigned"
};

const TaskCategoryMyRequests = {
  type: "requested_hangouts",
  name: "My Requests"
};

const TaskCategoryMyOffers = {
  type: "requests_sent_hangouts",
  name: "Sent"
};

const Categories = [TaskCategoryYour, TaskCategoryAssigned, TaskCategoryMyRequests, TaskCategoryMyOffers];

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
      if (tasks[i].type == TaskTypes.PROJECT_MILESTONE) {
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

  getHangoutsAll() {
    const hangoutsAll = this.props.tasks.filter(function(task) {
      return task.type == "hangout";
    });

    return hangoutsAll;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({scannerQuery: e.target.value});
  }

  hangoutActionPerform(action, hangout) {
    switch (action) {
      case "start": {
        this.props.taskStatusChange(hangout._id, "started");
        break;
      }
      case "cancel": {
        this.props.taskStatusChange(hangout._id, "canceled");
        break;
      }
      case "reschedule": {
        this.props.taskStatusChange(hangout._id, "rescheduled");
        break;
      }
      default:
        break;
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

    if (prevProps.isTaskSaveInProgress && !this.props.isTaskSaveInProgress) {
      console.log("%cisTaskSaveInProgress", "background:red; color:green;");
      this.fetchUserTasks();
      this.props.onFetchAllTasks(false);
    }
  }

  handleCategoryChange(e) {
    console.log("handleCategoryChange: ");
    console.dir(e.target);

    const newCategory = Categories.find(function(category){
      return category.type == e.target.value;
    });

    console.log("newCategory: ");
    console.dir(newCategory);

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
      let copy = Object.assign({}, this.state, {isDetailsPopupOpen: true, detailsPopupItem: item});
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
    console.log("%c Accepting a task: ", "color: white; background: black");
    console.dir(this.state.detailsPopupItem);

    if (this.state.detailsPopupItem.type != TaskTypes.HANGOUT) {
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
    else {
      this.props.hangoutJoin(this.state.detailsPopupItem._id, {
        _id: this.props.userProfile._id, 
        firstName: this.props.userProfile.firstName, 
        lastName: this.props.userProfile.lastName
      });
      
      this.setState({isDetailsPopupOpen: false});
    }
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
      _id: this.state.detailsPopupItem._id, 
      assignee: {
        _id: this.props.userProfile._id,
        firstName: this.props.userProfile.firstName,
        lastName: this.props.userProfile.lastName,
      }
    };

    Axios.post(`${ConfigMain.getBackendURL()}/taskCancel`, body)
    .then((response) =>this.handleCloseCancelTaskDetailsPopup(response))
    .catch((error) =>this.handleCloseCancelTaskDetailsPopup(error));
  }

  handleRequestStatusChange(hangout, user, status) {
    const that = this;

    const body = { userId: user._id, hangoutID: hangout._id, status: status };

    Axios.post(`${BackendURL}/hangoutJoinStatusChange`, body)
      .then((response) => {
        that.props.onFetchAllTasks(false);
        that.fetchUserTasks();
      }).catch(function(error) {
        console.log(error);
      });
  }

  hangoutRequestAccept(hangout, user) {
    this.handleRequestStatusChange(hangout, user, "accepted");
  }

  hangoutRequestReject(hangout, user) {
    this.handleRequestStatusChange(hangout, user, "rejected");
  }

  getMyTasksAndHangouts() {
    let tasks = [];

    const CurrentUserID = this.props.userProfile._id;

    switch (this.state.tasksCategory.type) {
      case TaskCategoryAssigned.type: {
        tasks = this.getTasksAssignedToMe();
        break;
      }
      case TaskCategoryYour.type: {
        tasks = this.getTasksCreatedByMe();
        break;
      }
      case TaskCategoryMyRequests.type: {
        tasks = this.props.tasks.filter(function(task) {
          return task.type == "hangout" && task.creator._id == CurrentUserID;
        });
        break;
      }
      case TaskCategoryMyOffers.type: {
        tasks = this.props.tasks.filter(function(task) {
          return task.type == "hangout" && task.metaData.participants.findIndex(function(participant) {
            return participant.user._id == CurrentUserID && participant.status == "pending"; 
          }) != -1;
        });
        break;
      }
    }

    return tasks;
  }

  renderLeftSide() {
    const myTasks = this.getMyTasksAndHangouts();
    
    return (
      <div className="col-lg-9">
      <div className="content-2-columns-left">
        <MyTasksContainer 
          tasks={myTasks}
          tasksCategoryName={this.state.tasksCategory.name}
          onHandleCategoryChange={(e)=>this.handleCategoryChange(e)}
          handleOpenCancelTaskDetailsPopup={(task)=>this.handleOpenCancelTaskDetailsPopup(task)}
          selectedCategory={this.state.tasksCategory}
          categories={Categories}
          onHangoutActionPerform={(action, hangout) => this.hangoutActionPerform(action, hangout)}
          assignedTasks={this.props.tasksAssignedToCurrentUser}
          currentUserID={this.props.userProfile._id}

          onHangoutRequestAccept={(hangout, user)=>this.hangoutRequestAccept(hangout, user)}
          onHangoutRequestReject={(hangout, user)=>this.hangoutRequestReject(hangout, user)}
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
        return (task.userID != currentUserId && (!task.assignees || !task.assignees.find(function(assignee) {
          return assignee._id == currentUserId;
        })) &&
          (task.type != "hangout" || task.metaData.participants.findIndex(function(participant) {
            return participant.user._id == currentUserId;
          }) == -1));
      });
    }
    else {
      tasksFiltered = this.props.tasks;
    }

    return (
      <div className={this.getMyTasksAll().length > 0 || this.getHangoutsAll().length > 0 ? "col-lg-3" : "col-lg-12"}>
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
          onCloseModal={()=>this.handleCloseConfirmTaskDetailsPopup()} item={this.state.detailsPopupItem} item="accept_confirmation"
          task={this.state.detailsPopupItem} />   
        <DetailsPopup modalIsOpen={this.state.isDetailsPopupOpenCancelTask} onConfirm={(item)=>this.handleAcceptCancel(item)} 
          onCloseModal={()=>this.handleCloseCancelTaskDetailsPopup()} item={this.state.detailsPopupItem} item="cancel_confirmation" 
          task={this.state.detailsPopupItem}/>   
          <div className="container-fluid">
            <div className="row">
              {(this.getMyTasksAll().length > 0 || this.getHangoutsAll().length > 0) && this.renderLeftSide()}
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
  isTaskSaveInProgress: PropTypes.bool.isRequired,

  openSignUpForm: PropTypes.func.isRequired,
  hangoutJoin: PropTypes.func.isRequired,
  taskStatusChange: PropTypes.func.isRequired,
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
  isTaskSaveInProgress: state.isTaskSaveInProgress,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  hangoutJoin: bindActionCreators(hangoutJoin, dispatch),
  taskStatusChange: bindActionCreators(taskStatusChange, dispatch),
  setTasks: bindActionCreators(setTasks, dispatch),
  fetchTasksInitiate: bindActionCreators(fetchTasksInitiate, dispatch),
  fetchTasksComplete: bindActionCreators(fetchTasksComplete, dispatch),
  fetchUserTasks: bindActionCreators(fetchUserTasks, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskManagement)));