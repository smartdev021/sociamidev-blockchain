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

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/css/projectManagement.css"


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

class ProjectManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      projectsAmount: 0,
      selectedProjectIndex: 0,
    }
  }

  saveProject(project) {
    let projectCopy = Object.assign({}, {userId: this.props.userProfile._id}, project);

    if (projectCopy.name && projectCopy.description && projectCopy.nature
        && projectCopy.name != "" && projectCopy.description != "", projectCopy.nature != "") {
          this.props.projectSave(projectCopy);
    }
  }

  fetchAllProjects() {
    this.props.projectsFetch(this.props.userProfile._id);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("ProjectManager::componentDidUpdate");
    if (prevProps.isAuthorized != this.props.isAuthorized && this.props.isAuthorized) {
      this.fetchAllProjects();
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

  renderProject(task) {
    return (
      <h5>{project.name}</h5>
    );
  }

  renderProjects() {
    if (this.props.isProjectsFetchInProgress || this.props.isProjectSaveInProgress) {
      return (<h3>Retrieving data. Please, wait... <Icon spin name="spinner" /></h3>);
    }

    if (!this.props.projects || this.props.projects.length == 0) {
      return null;
    }

    console.log("renderProjects this.state.projects: ");
    console.dir(this.props.projects);

    let that = this;

    return (
      <section className="feature-columns"> 
        <div className="row">
          {
            this.props.projects.map(function(project, i) {
              return (
                <article className="jobTile feature-col col-md-4" key={i}>
                  <ActionLink href='#' className="thumbnail linked" onClick={()=> that.openModalWithProject(i)}>
                    <div className="caption">
                      <h4>{project.name}</h4>
                      <h6>{project.description}</h6>
                      {that.renderMilestones(project.milestones)}
                    </div>
                  </ActionLink>
                </article>
              );
            })
          }
        </div>
      </section>
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
      <div>
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
        {this.renderHeader()}
        {that.renderProjects()}
      </div>);
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(ProjectManager)));