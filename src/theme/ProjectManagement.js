/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import {Icon} from 'react-fa'

import PropTypes from 'prop-types';

const Hash = require('object-hash');

import PopupNewProject from '~/src/theme/components/PopupNewProject';
import MyProjectsContainer from '~/src/theme/components/projects/MyProjectsContainer';

import ActionLink from '~/src/components/common/ActionLink'

import ProjectsScanner from "~/src/theme/components/projects/ProjectsScanner"

import "~/src/theme/css/common.css"
import "~/src/theme/css/projectManager.css"


import {
  saveTask,
  setLastSavedTask,
  deleteTask,
  setTaskPublished,
  fetchAllTasks,
} from '~/src/redux/actions/tasks'

import {
  openSignUpForm,
} from '~/src/redux/actions/authorization'

import {
  fetchRoadmapsDetailsByIds,
} from '~/src/redux/actions/roadmaps'

import {
  projectsFetch,
  projectSave,
} from '~/src/redux/actions/projects'

import {
  pushNewActivity,
} from '~/src/redux/actions/activities'

class ProjectManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      projectsAmount: 0,
      selectedProjectIndex: 0,
      lastSavedProject: undefined,
    }
  }

  saveProject(project) {
    let projectCopy = Object.assign({}, {userId: this.props.userProfile._id}, project);

    if (projectCopy.name && projectCopy.description && projectCopy.nature
        && projectCopy.name != "" && projectCopy.description != "", projectCopy.nature != "") {
          this.setState({lastSavedProject: projectCopy});
          this.props.projectSave(projectCopy);
    }
  }

  fetchAllProjects() {
    this.props.projectsFetch(this.props.userProfile._id);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("ProjectManager::componentDidUpdate!!! this.props.isProjectSaveInProgress: " + this.props.isProjectSaveInProgress);
    if (prevProps.isAuthorized != this.props.isAuthorized && this.props.isAuthorized) {
      this.fetchAllProjects();
    }

    //Push new_project activity
    if (prevProps.isProjectSaveInProgress != this.props.isProjectSaveInProgress) {
      if (!this.props.isProjectSaveInProgress) {
        let activityBody = {
          type: "friend_new_project", 
          metadata: {
              projectID: this.state.lastSavedProject._id,
              projectName: this.state.lastSavedProject.name,
            }
        }

        activityBody._id = Hash(activityBody);

        const activityNewProject = {
          userID: this.props.userProfile._id,
          activity: activityBody,
        };

        this.props.pushNewActivity(activityNewProject);
      }
    }

    if (prevProps.isProjectsFetchInProgress && !this.props.isProjectsFetchInProgress) {
      if (!this.props.projects || this.props.projects.length == 0) {
        this.openModal();
      }
    }
  }

  componentWillMount() {
    this.props.fetchAllTasks();
  }

  componentDidMount() {
    if (!this.props.isAuthorized) {
      this.props.openSignUpForm();
    } 
    else {
      if (this.props.isAuthorized) {
        this.fetchAllProjects();
      }
    }
  }

  closeModal(project) {
    console.log("closeModal");
    if (project) {
      let copy = Object.assign({}, this.state, {modalIsOpen: false});
      this.setState(copy);
      this.saveProject(project);
    }
    else {
      this.setState({modalIsOpen: false});
    }
  }

  openModal() {
    let copy = Object.assign({}, this.state, {modalIsOpen: true, selectedProjectIndex: -1});
    this.setState(copy);
  }

  openModalWithProject(index) {
    let copy = Object.assign({}, this.state, {modalIsOpen: true, selectedProjectIndex: index});
    this.setState(copy);
  }

  renderMilestones(milestones) {
    if (milestones.length == 0) {
      return null;
    }

    let renderSingleMilestone = this.renderSingleMilestone;

    return (
      <div>
        <h6>Next</h6>
        <h6>Milestones:</h6>
        {
          milestones.map(function(milestone, i) {
            return (
              <div key={i}>
                <p>{milestone.description}</p>
                <p>{milestone.price}{milestone.price > 1 ? " tokens" : " token"}</p>
              </div>);
          })
        }
    </div>
    );
  }

  renderHeader() {
    return (
      <div className="container-fluid projectManagementPage">
        <div className="row">
          <div className="col-lg-12">
            <button type="button" className="btn btn-lg btn-outline-inverse pull-right" 
              onClick={()=>this.openModal()}>Add a New Project</button>
          </div>
        </div>
     </div>);
  }
  
  render() {
    let that = this;
    let selectedProject = (this.props.projects.length > 0 && this.state.selectedProjectIndex >= 0) 
    ? this.props.projects[this.state.selectedProjectIndex] : undefined;

    console.log("selectedProject: ");
    console.dir(selectedProject);

  return (
      <div className="content-2-columns-wrapper" id="project-manager">
      {this.state.modalIsOpen ? 
          <PopupNewProject modalIsOpen={this.state.modalIsOpen} 
            onCloseModal={(project)=>this.closeModal(project)} project={selectedProject}
            isAuthorized = {this.props.isAuthorized}
            userProfile = {this.props.userProfile}
            saveTask = {this.props.saveTask}
            deleteTask = {this.props.deleteTask}
            setTaskPublished = {this.props.setTaskPublished}
            tasks = {this.props.tasks}
            fetchRoadmapsDetailsByIds = {this.props.fetchRoadmapsDetailsByIds}
            roadmapsDetailed = {this.props.roadmapsDetailed}
            isTaskSaveInProgress = {this.props.isTaskSaveInProgress}
            isTasksUpdateInProgress = {this.props.isTasksUpdateInProgress}
            lastSavedTask = {this.props.lastSavedTask}
            setLastSavedTask = {this.props.setLastSavedTask}
            /> : null
        }
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="content-2-columns-left">
                <MyProjectsContainer
                  openModal={()=>this.openModal()}
                  openModalWithProject={(index)=>this.openModalWithProject(index)}
                  isAuthorized={this.props.isAuthorized} 
                  isProjectsFetchInProgress={this.props.isProjectsFetchInProgress}
                  isProjectSaveInProgress={this.props.isProjectSaveInProgress}
                  isAuthorized={this.props.isAuthorized}
                  projects={this.props.projects}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="content-2-columns-right">
                <ProjectsScanner/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

}

ProjectManager.propTypes = {
  tasks: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  roadmapsDetailed: PropTypes.array.isRequired,
  lastSavedTask: PropTypes.object.isRequired,
  fetchRoadmapsDetailsByIds: PropTypes.func.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  setLastSavedTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  projectSave: PropTypes.func.isRequired,
  projectsFetch: PropTypes.func.isRequired,
  pushNewActivity: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isProjectsFetchInProgress: PropTypes.bool.isRequired,
  isProjectSaveInProgress: PropTypes.bool.isRequired,
  isTaskSaveInProgress: PropTypes.bool.isRequired,
  isTasksUpdateInProgress: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  userProfile: state.userProfile,
  projects: state.projects,
  tasks: state.tasks,
  lastSavedTask: state.lastSavedTask,
  roadmapsDetailed: state.roadmapsDetailed,
  isProjectsFetchInProgress: state.isProjectsFetchInProgress,
  isProjectSaveInProgress: state.isProjectSaveInProgress,
  isTaskSaveInProgress: state.isTaskSaveInProgress,
  isTasksUpdateInProgress: state.isTasksUpdateInProgress,
});

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  saveTask: bindActionCreators(saveTask, dispatch),
  setLastSavedTask: bindActionCreators(setLastSavedTask, dispatch),
  deleteTask: bindActionCreators(deleteTask, dispatch),
  setTaskPublished: bindActionCreators(setTaskPublished, dispatch),
  fetchRoadmapsDetailsByIds: bindActionCreators(fetchRoadmapsDetailsByIds, dispatch),
  projectSave: bindActionCreators(projectSave, dispatch),
  projectsFetch: bindActionCreators(projectsFetch, dispatch),
  fetchAllTasks: bindActionCreators(fetchAllTasks, dispatch),
  pushNewActivity: bindActionCreators(pushNewActivity, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(ProjectManager)));