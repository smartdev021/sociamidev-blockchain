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
      }
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

    handleChangeProject(e) {
      e.preventDefault();

      let projectCopy = Object.assign({}, this.state.project);

      switch(e.target.id) {
        case 'project_name': {
          projectCopy.name = e.target.value;
          break;
        }
        case 'project_desc': {
          projectCopy.description = e.target.value;
          break;
        }
        case 'project_nature': {
          projectCopy.nature = e.target.value;
          break;
        }

        default:
          return;
      }

      let copy = Object.assign({}, this.state, {project: projectCopy});
      this.setState(copy);
    }

    handleChangeMilestone(e) {
      e.preventDefault();
      
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);

      switch(e.target.id) {
        case 'milestone_name': { milestoneCopy.name = e.target.value; break; }
        case 'milestone_desc': { milestoneCopy.description = e.target.value; break; }
        case 'milestone_price': { milestoneCopy.price = e.target.value; break; }
        case 'milestone_date': { milestoneCopy.date = Date.parse(e.target.value); break; }
        default: return;
      }

      this.setState({milestoneTemp: milestoneCopy});
    }

    handleMilestoneAdd(e) {
      e.preventDefault();

      const milestone = Object.assign({}, 
        this.state.milestoneTemp, {
          type: "project_milestone",
          userName: `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`, 
          userID: this.props.userProfile._id,
          isHidden: 1,
        }
      );

      this.props.saveTask(milestone);
    }

    handleMilestoneDelete(e) {
      e.preventDefault();
      
      const indexToDelete = Number(e.currentTarget.id);
      
      if (this.state.project.milestones.length > indexToDelete) {
        
        this.props.deleteTask(this.state.project.milestones[indexToDelete]._id);
        
        let projectCopy = Object.assign({}, this.state.project);
        projectCopy.milestones.splice(indexToDelete, 1);

        this.setState({project: projectCopy});
      }
    }

    toggleMilestoneAddToTaskManager(e) {
      e.preventDefault();
      console.log("TaskManagement::toggleMilestoneAddToTaskManager", 'background: #222; color: #bada55');

      let milestoneIndex = Number(e.currentTarget.id);
      
      if (this.state.project.milestones.length > milestoneIndex) {

        const milestoneId = this.state.project.milestones[milestoneIndex]._id;
        const isPublished = !this.state.project.milestones[milestoneIndex].isHidden;

        console.log(`milestoneId: ${milestoneId} isPublished: ${isPublished}`);

        this.props.setTaskPublished(milestoneId, !isPublished);
      }

    }

    componentWillMount() {

      if (this.props.userProfile) {
        this.props.fetchRoadmapsDetailsByIds(this.props.userProfile.roadmaps);
      }
      
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

    componentDidUpdate(prevProps, prevState) {
      console.log("TaskManagement::componentDidUpdate START", 'background: #222; color: #bada55');

      console.dir(this.state);
      console.dir(this.props);
      if (prevProps.tasks != this.props.tasks) {
        //Create object from props.task {key: {_id}, value: {task}}
        const tasks = this.props.tasks;
        if (tasks.length > 0) {
          let tasksMap = {};

          for (let i = 0; i < tasks.length; ++i) {
            tasksMap[tasks[i]._id] = tasks[i];
          }

          //update this.state.project.milestones array from created map, using milestone._id as a key
          let projectCopy = Object.assign({}, this.state.project);
          
          for (let i = 0; i < projectCopy.milestones.length; ++i) {
            const taskFromMap = tasksMap[projectCopy.milestones[i]._id];
            if (taskFromMap) {
              projectCopy.milestones[i] = taskFromMap;
            }
          }

          console.log("Created tasks map: ");
          console.dir(tasksMap);

          this.setState({project: projectCopy});
        }
      }

      if (prevProps.tasks.length != this.props.tasks.length && this.props.tasks.length > 0) {
        let tasksCopy = this.props.tasks.slice(0);
        let projectCopy = Object.assign({}, this.state.project);
  
        projectCopy.milestones.push(tasksCopy[tasksCopy.length - 1]);
  
        let copy = Object.assign({}, this.state, {milestoneTemp: this.initialStateMilestone, project: projectCopy});
        this.setState(copy);
      }
    }

    renderMilestoneControls(milestone, i) {
      let that = this;
      if (!milestone.isHidden) {
        return (
          <span>
            <div className="col-lg-12">
              <div className="create-project-desc-column">
                  <ActionLink href="#" id={i} className="popup-new-project-link-default" 
                   onClick={(e)=> that.toggleMilestoneAddToTaskManager(e)}>
                    <i className="glyphicon glyphicon-bullhorn project-popup-milestone-control-icon"/><div>Withdraw</div>
                  </ActionLink>
                 </div>
                </div>
          </span>
          );
      }
      else {
        return (
          <span>
            <div className="col-lg-6">
              <div className="create-project-desc-column">
                  <ActionLink href="#" id={i} className="popup-new-project-link-default" 
                    onClick={(e)=> that.toggleMilestoneAddToTaskManager(e)}>
                    <i className="glyphicon glyphicon-bullhorn project-popup-milestone-control-icon"/><div>Add to Task Mg</div>
                  </ActionLink>
                 </div>
                </div>
              <div className="col-lg-6">
                <div className="create-project-desc-column">
                   <ActionLink href="#" id={i} className="popup-new-project-link-default" onClick={(e)=> that.handleMilestoneDelete(e)}>
                    <i className="glyphicon glyphicon-minus project-popup-milestone-control-icon"/><div>Delete</div>
                  </ActionLink>
                </div>
              </div>
          </span>
          );
      }
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
                  {that.renderMilestoneControls(milestone, i)}
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
                      you would like to share or get help with your friends?</div>
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
                  <p>These projects contain Milestones that create tasks for your friends to help!</p>
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

      if (this.props.roadmapsDetailed.length > 0) {
        
        for (let i = 0; i < this.props.roadmapsDetailed.length; ++i) {
          if (roadmapNames.indexOf(this.props.roadmapsDetailed[i].name) == -1) {
            roadmapNames.push(this.props.roadmapsDetailed[i].name);
          }
        }
      }
      else {
        roadmapNames = ['Blockchain','HTML5','Javascript','Etherium',
        'ReactJS', 'Java', 'Bitcoin', 'Crypto-Currency', 'PHP', 'NodeJS', 'AJAX', 'Full-Stack', 'Front-End'];
      }

      const ProjectNatureDataList = (
        <span>
          <input type="text" id="project_nature" name="city" list="roadmaps" 
            className="text-field form-control validate-field required" 
              onChange={(e)=>this.handleChangeProject(e)} value={this.state.project.nature}/>
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
                      onChange={(e)=>this.handleChangeProject(e)} value={this.state.project.name}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea id="project_desc" placeholder="Please Describe Your Project" className="form-control validate-field required" 
                    name="project_desc" onChange={(e)=>this.handleChangeProject(e)} value={this.state.project.description}/>
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
                  {this.props.roadmapsDetailed.length > 0 ? "You have this roadmap" : "You don't have any roadmaps yet"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">3</span>Milestone Creator</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group input-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="milestone_name" name="milestone_name" autoComplete="off" 
                      placeholder="Milestone name" onChange={(e)=>this.handleChangeMilestone(e)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                      <textarea id="milestone_desc" placeholder="Please describe the Milestone" className="form-control validate-field required" 
                        name="milestone_desc" onChange={(e)=>this.handleChangeMilestone(e)}/>
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
                    id="milestone_price" name="milestone_price" autoComplete="off" placeholder="Min Token" 
                      onChange={(e)=>this.handleChangeMilestone(e)} defaultValue={this.state.milestoneTemp.price}/>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="form-group">
                  <input type="date" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="milestone_date" name="milestone_date" autoComplete="off" placeholder="Date" 
                      onChange={(e)=>this.handleChangeMilestone(e)} defaultValue={this.formatDate(this.state.milestoneTemp.date, '-')}/>
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
       /* () => this.handleClose();*/
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
    fetchRoadmapsDetailsByIds: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    userProfile: PropTypes.object.isRequired,
    tasks: PropTypes.array.isRequired,
    roadmapsDetailed: PropTypes.array.isRequired,
    saveTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    setTaskPublished: PropTypes.func.isRequired,
  }
 
  export default require('react-click-outside')(PopupNewProject);