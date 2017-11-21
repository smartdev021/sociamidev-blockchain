import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import DataList from 'react-datalist'

import "~/src/css/popupProjectManagement.css"

import ActionLink from '~/src/components/common/ActionLink'

import ConfigMain from '~/configs/main'
const BackendURL = ConfigMain.getBackendURL();
import Axios from 'axios'

class PopupNewProject extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};

      this.initialStateProject = this.props.project ? this.props.project : {
        id: undefined,
        name: "",
        description: "",
        nature: "",
        creationTime: undefined,
        milestones: [],
      };

      this.initialStateMilestone = {
        name: undefined, 
        description: undefined, 
        price: 1, 
        date: Date.now() + (60 * 60 * 24)
      };
      
      this.state = {
        project: this.initialStateProject,
        milestoneTemp: this.initialStateMilestone,
        userRoadmapsDetailed: [],
        isFetchingRoadmapDetails: false,
      }

      //TODO: It's a temporary solution for updating milestone data once it's saved as a task in backend
      this.lastMilestoneIndex = -1;
    }

    fetchUserRoadmapsDetailedInitiate() {
      let roadmapIds = this.props.userProfile.roadmaps;

      if (roadmapIds && roadmapIds.length > 0) {
        this.setState({isFetchingRoadmapDetails: true}); //TODO: check if this is a correct way for setting a state
        
        let url = `${BackendURL}/getRoadmapsByIds?`;
        
        for (let i = 0; i < roadmapIds.length; ++i) {
            url += `roadmaps=${roadmapIds[i]}&`;
        }
        
        Axios.get(url)
          .then((response) =>this.handleFetchUserRoadmapsDetailedSuccess(response))
          .catch((error) =>this.handleFetchUserRoadmapsDetailedError(error));
      }
    }

    handleFetchUserRoadmapsDetailedSuccess(response) {
      this.setState({userRoadmapsDetailed: response.data});
    }

    handleFetchUserRoadmapsDetailedError(error) {

    }

    fetchUserRoadmapsDetailedComplete() {
      this.setState({isFetchingRoadmapDetails: false}); //TODO: check if this is a correct way for setting a state
    }

     formatDate(time, splitter, mmddyy) {
        let date = new Date(time);
        let theyear = date.getFullYear();
        let themonth = date.getMonth() + 1;
        let thetoday = date.getDate();
        if (mmddyy) {
          return(`${themonth}${splitter}${thetoday}${splitter}${theyear}`);
        }
      return(`${theyear}${splitter}${themonth}${splitter}${thetoday}`);
    }

    //TODO: Move to somewhere else
    createAndSaveNewTask(milestone) {
      console.log("%cTaskManagement::createAndSaveNewTask", "color: blue; font-size:15px;");
      this.props.fetchTasksInitiate();
      let userName = `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`;
      const url = `${BackendURL}/taskSave?userID=${this.props.userProfile._id}
      &userName=${userName}&type=${'project_milestone'}
      &name=${milestone.name}
      &description=${milestone.description}
      &date=${milestone.date}
      &price=${milestone.price}`;
  console.log(url);
      Axios.get(url)
      .then((response) =>this.handleSaveNewTaskSuccess(response))
      .catch((error) =>this.handleSaveNewTaskError(error));
    }
  
    handleSaveNewTaskSuccess(response) {
      console.log("%cTaskManagement::handleSaveNewTaskSuccess", "color: blue; font-size:15px;");
      console.dir(response.data);

      if (this.lastMilestoneIndex >= 0 && this.lastMilestoneIndex < this.state.project.milestones.length) {
        let projectCopy = Object.assign({}, this.state.project);
        projectCopy.milestones[this.lastMilestoneIndex] = response.data;
              
        let copy = Object.assign({}, this.state, {project: projectCopy});
        this.setState(copy);
      }

      this.lastMilestoneIndex = -1;

      this.props.fetchTasksComplete();
    }
  
    handleSaveNewTaskError(error) {
      console.log("%cTaskManagement::handleSaveNewTaskError", "color: blue; font-size:15px;");
      this.lastMilestoneIndex = -1;
      this.props.fetchTasksComplete();
    }
    //-------------------------------------

    handleChangeName(e) {
      e.preventDefault();

      let projectCopy = Object.assign({}, this.state.project);
      projectCopy.name = e.target.value;

      let copy = Object.assign({}, this.state, {project: projectCopy});
      this.setState(copy);
    }

    handleChangeDescription(e) {
      e.preventDefault();

      let projectCopy = Object.assign({}, this.state.project);
      projectCopy.description = e.target.value;

      let copy = Object.assign({}, this.state, {project: projectCopy});
      this.setState(copy);
    }

    handleChangeNature(e) {
      e.preventDefault();

      let projectCopy = Object.assign({}, this.state.project);
      projectCopy.nature = e.target.value;

      let copy = Object.assign({}, this.state, {project: projectCopy});
      this.setState(copy);
    }

    handleChangeMilestoneName(e) {
      e.preventDefault();
      
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);
      milestoneCopy.name = e.target.value;
      
      let copy = Object.assign({}, this.state, {milestoneTemp: milestoneCopy});
      this.setState(copy);
    }

    handleChangeMilestoneDesctiption(e) {
      e.preventDefault();
      
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);
      milestoneCopy.description = e.target.value;
      
      let copy = Object.assign({}, this.state, {milestoneTemp: milestoneCopy});
      this.setState(copy);
    }

    handleChangeMilestonePrice(e) {
      e.preventDefault();
      
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);
      milestoneCopy.price = e.target.value;
      
      let copy = Object.assign({}, this.state, {milestoneTemp: milestoneCopy});
      this.setState(copy);
    }

    handleChangeMilestoneDate(e) {
      e.preventDefault();
      console.log("handleChangeMilestoneDate e.target.value: " + e.target.value)
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);
      milestoneCopy.date = Date.parse(e.target.value);
      
      let copy = Object.assign({}, this.state, {milestoneTemp: milestoneCopy});
      this.setState(copy);
    }

    handleMilestoneAdd(e) {
      e.preventDefault();
      
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);
      
      let projectCopy = Object.assign({}, this.state.project);

      if (milestoneCopy != this.state.milestoneTemp) {
        projectCopy.milestones.push(milestoneCopy);
      }

      let copy = Object.assign({}, this.state, {milestoneTemp: this.initialStateMilestone, project: projectCopy});
      this.setState(copy);
    }

    handleMilestoneDelete(e) {
      console.log("%cTaskManagement::handleMilestoneDelete", "color: blue; font-size:15px;");
      e.preventDefault();
      
      let indexToDelete = Number(e.target.id);

      if (this.state.project.milestones && this.state.project.milestones.length > indexToDelete) {
        
        if (this.state.project.milestones[indexToDelete]._id) {
          const url = `${BackendURL}/taskHasAssignees?id=${this.state.project.milestones[indexToDelete]._id}`;
          console.log("url: " + url);
          Axios.get(url)
          .then((response) =>this.handleMilestoneDeleteSuccess(response, indexToDelete))
          .catch((error) =>this.handleMilestoneDeleteError(error));
        }
        else {
          let projectCopy = Object.assign({}, this.state.project);
          
          projectCopy.milestones.splice(indexToDelete, 1);
          
          let copy = Object.assign({}, this.state, {project: projectCopy});
          this.setState(copy);
        }
      }
    }

    handleMilestoneDeleteSuccess(response, indexToDelete) {
      console.log("%cTaskManagement::handleMilestoneDeleteSuccess", "color: blue; font-size:15px;");
      console.log("handleMilestoneDeleteSuccess: indexToDelete: " + indexToDelete);
      console.dir(response.data);
      if (response.data.hasAssignees == false) {
        //TODO: Correct handling of task deletion.
        const url = `${BackendURL}/taskDelete?id=${this.state.project.milestones[indexToDelete]._id}`;
        console.log("url: " + url);
        Axios.get(url)
        .then(function(response) {
          console.log("Deleting task from database succeeded!");
        })
        .catch(function(error){
          console.log("Error deleting task from database: " + error);
        });

        let projectCopy = Object.assign({}, this.state.project);
        
        projectCopy.milestones.splice(indexToDelete, 1);
        
        let copy = Object.assign({}, this.state, {project: projectCopy});
        this.setState(copy);
      }
      else {
        console.log("Could not delete milestone, as it is already assigned!");
      }
    }

    handleMilestoneDeleteError(error) {
      console.log("handleMilestoneDeleteError: " + error);
    }

    handleMilestoneAddToTaskManager(e) {
      console.log("TaskManagement::handleMilestoneAddToTaskManager", 'background: #222; color: #bada55');
      e.preventDefault();
      
      let milestoneIndex = Number(e.target.id);
      
      if (this.state.project.milestones.length > milestoneIndex) {
        this.lastMilestoneIndex = milestoneIndex;

        this.createAndSaveNewTask(this.state.project.milestones[milestoneIndex]);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState != this.state) {
        console.log("%cPopupNewProject::componentDidUpdate", "color: blue; font-size:15px;");
        console.log("PopupNewProject::componentDidUpdate(prevProps, prevState)");
        console.dir(this.state);
      }
    }

    componentWillMount() {
      console.log("PopupNewProject::componentWillMount");

      this.fetchUserRoadmapsDetailedInitiate();

      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.border = "7px solid grey";
      Modal.defaultStyles.content.background = "transparent";
      Modal.defaultStyles.content.color = "initial";
      Modal.defaultStyles.content.overflow = "auto";
      Modal.defaultStyles.content.padding = '0';
      Modal.defaultStyles.content["minWidth"] = '260px';
      Modal.defaultStyles.content["maxWidth"] = '800px';
      Modal.defaultStyles.content["height"] = 'initial';
      Modal.defaultStyles.content["minHeight"] = '500px';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["width"] = '600px';
    }

    componentWillUnmount() {
      console.log("PopupNewProject::componentWillUnmount");
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    renderMileStones() {
      let milestones = this.state.project.milestones;

      if (milestones.length == 0) {
        return null;
      }

      let that = this;

      return (
        <span>
          {milestones.map(function(milestone, i) {
            return (
              <div className="row single-milestone" key={i}>
                <div className="col-lg-1">
                  <i className="glyphicon glyphicon-hourglass project-popup-milestone-control-icon"/>
                </div>
                <div className="col-lg-11">
                  <div className="col-lg-4">
                    <b>{milestone.name}</b>
                  </div>
                  <div className="col-lg-4">
                    <span>{milestone.price}{milestone.price > 1 ? " Tokens" : " Token"}</span>
                  </div>
                  <div className="col-lg-4">
                    <span>{that.formatDate(milestone.date, '/', true)}</span>
                  </div>
                  <div className="col-lg-12">
                    <p>{milestone.description}</p>
                  </div>
                  <div className="col-lg-6">
                    <div className="create-project-desc-column">
                      <ActionLink href="#" className="popup-new-project-link-default" onClick={(e)=> that.handleMilestoneAddToTaskManager(e)}>
                        <i className="glyphicon glyphicon-bullhorn project-popup-milestone-control-icon"/><div>Add to Task Mg</div>
                      </ActionLink>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="create-project-desc-column">
                      <ActionLink href="#" className="popup-new-project-link-default" onClick={(e)=> that.handleMilestoneDelete(e)}>
                        <i className="glyphicon glyphicon-minus project-popup-milestone-control-icon"/><div>Delete</div>
                      </ActionLink>
                    </div>
                  </div>
                </div>
              </div>
          );
        })
        }
        </span>
      );
    }

    renderHeader() {
      return (
        <span>
          <div className="row">
              <div className="col-lg-12">
                <div className="header">
                  <h5>Add a new Project</h5>
                    <div>Do you have a project you are working on that 
                      you would like to share or get help with your friends</div>
                  </div>
                </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="create-project-desc-column">
                  <div className="glyphicon glyphicon-bitcoin"></div>
                  <div><b>Use your Tokens</b></div>
                  <p>You can use tokens you have earned to create projects that your heart desires.</p>
                  </div>
                </div>
              <div className="col-lg-6">
                <div className="create-project-desc-column">
                  <div className="glyphicon glyphicon glyphicon-tint"></div>
                  <div><b>Your Friends</b></div>
                  <p>These projects contain Milestones that create tasks for your friends to help.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <span>Tip: you can even create your desired final year project here!</span>
                <hr></hr>
              </div>
            </div>
          </span>
      );
    }

    renderFormContent() {
      let roadmapNames = [];

      if (this.state.userRoadmapsDetailed && this.state.userRoadmapsDetailed.length > 0) {
        
        for (let i = 0; i < this.state.userRoadmapsDetailed.length; ++i) {
          if (roadmapNames.indexOf(this.state.userRoadmapsDetailed[i].name) == -1) {
            roadmapNames.push(this.state.userRoadmapsDetailed[i].name);
          }
        }

        console.log("RoadmapNames from user profile...");
      }
      else {
        roadmapNames = ['Blockchain','HTML5','Javascript','Etherium',
        'ReactJS', 'Java', 'Bitcoin', 'Crypto-Currency', 'PHP', 'NodeJS', 'AJAX', 'Full-Stack', 'Front-End'];
        console.log("RoadmapNames Dummy!!!");
      }

      const ProjectNatureDataList = (
        <span>
          <input type="text" id="project_nature" name="city" list="roadmaps" 
            className="text-field form-control validate-field required" 
              onChange={(e)=>this.handleChangeNature(e)} value={this.state.project.nature}/>
          <datalist id="roadmaps">
            <select>
            {
              roadmapNames.map(function(roadmapName, i) {
                return (<option label={roadmapName} value={roadmapName} key={i}></option>);
              })
            }
	          </select>
          </datalist>
        </span>
      );

      return (
        <span>
            <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">1</span>Project Details</h5>
                <div>Tell us more about your project</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="project_name" name="project_name" autoComplete="off" placeholder="Name of Project" autoFocus
                      onChange={(e)=>this.handleChangeName(e)} value={this.state.project.name}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea id="project_desc" placeholder="Please Describe Your Project" className="form-control validate-field required" 
                    name="project_desc" onChange={(e)=>this.handleChangeDescription(e)} value={this.state.project.description}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">2</span>Project Nature</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                   {ProjectNatureDataList}
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  {this.state.userRoadmapsDetailed.length > 0 ? "You have this roadmap" : "You don't have any roadmaps yet"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">3</span>Milestone Creator</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group input-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="milestone_name" name="milestone_name" autoComplete="off" 
                      placeholder="Milestone name" onChange={(e)=>this.handleChangeMilestoneName(e)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                      <textarea id="milestone_desc" placeholder="Please describe the Milestone" className="form-control validate-field required" 
                        name="milestone_desc" onChange={(e)=>this.handleChangeMilestoneDesctiption(e)}/>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="milestone-add-button">
                <ActionLink href="#" className="popup-new-project-link-default" onClick={(e)=> this.handleMilestoneAdd(e)} style={{color:"black"}}>
                  <i className="glyphicon glyphicon-plus"/>
                  <div>Add</div>
                </ActionLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="number" 
                    id="milestone_value" name="milestone_value" autoComplete="off" placeholder="Min Token" 
                      onChange={(e)=>this.handleChangeMilestonePrice(e)} defaultValue={this.state.milestoneTemp.price}/>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <input type="date" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="milestone_date" name="milestone_date" autoComplete="off" placeholder="Date" 
                      onChange={(e)=>this.handleChangeMilestoneDate(e)} defaultValue={this.formatDate(this.state.milestoneTemp.date, '-')}/>
                </div>
              </div>
              <div className="col-lg-12">
                <div>
                  How many tokens will be provided
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <hr></hr>
              </div>
            </div>
        </span>
      );
    }

    renderModal() {
      const Milestones = this.renderMileStones();
      const PopupHeader = this.renderHeader();
      const FormContent = this.renderFormContent();

      return (
        <Modal isOpen={this.props.modalIsOpen} onRequestClose={() => this.handleClose()} contentLabel={">Add a new Project"}>
          <div className="container-fluid popup-new-project">
            {PopupHeader}
            {FormContent}
            <div className="row">{Milestones}</div>
            <div className="row">
              <div className="col-lg-12">
                <div className="close-button-container">
                  <button type="button" className="btn btn-lg btn-outline" 
                    onClick={() => this.handleCloseAndSave()}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      );
    }

    handleClickOutside() {
        () => this.handleClose();
    }

    handleClose() {
      this.props.onCloseModal();
    }

    handleCloseAndSave() {
      if (!this.state.project.creationDate) {
        this.state.project.creationTime = Date.now();
      }

      this.props.onCloseModal(this.state.project);
    }

    render() {
      return (
        <div>
          {this.renderModal()}
        </div>
      );
    }
  }

  PopupNewProject.propTypes = {
    fetchTasksInitiate: PropTypes.func.isRequired,
    fetchTasksComplete: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    userProfile: PropTypes.object.isRequired,
  }

  export default require('react-click-outside')(PopupNewProject);