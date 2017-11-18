import React from 'react';
import Modal from 'react-modal';
import "~/src/css/popupProjectManagement.css"

class PopupNewProject extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};

      const initialStateProject = this.props.project ? this.props.project : {
        id: undefined,
        name: "",
        description: "",
        nature: "",
        creationTime: undefined,
        milestones: [],
      };

      this.state = {
        project: initialStateProject,
        milestoneTemp: {description: undefined, price: undefined, date: undefined},
      }
    }

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
      
      let milestoneCopy = Object.assign({}, this.state.milestoneTemp);
      milestoneCopy.date = e.target.value;
      
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

      let copy = Object.assign({}, this.state, {milestoneTemp: milestoneCopy, project: projectCopy});
      this.setState(copy);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState != this.state) {
        console.log("PopupNewProject::componentDidUpdate(prevProps, prevState)");
        console.dir(this.state);
      }
    }

    componentWillMount() {
      console.log("PopupNewProject::componentWillMount");
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.border = "7px solid grey";
      Modal.defaultStyles.content.background = "white";
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
    
    renderSingleMilestone(milestone, i) {
      return (
        <div className="col-lg-12" key={i}>
          <i className="glyphicon glyphicon-hourglass milestone-title-tag"/>
          <span className="milestone-title-tag">{milestone.name}</span>
          <span className="milestone-title-tag">{milestone.price} {milestone.price > 1 ? "Tokens" : "Token"}</span>
          <span className="milestone-title-tag">{milestone.date}</span>
          <p>{milestone.description}</p>
      </div>
      );
    }

    renderMileStones() {
      const mileStones = [
        {name: "1 Create 1", description: "Looking for interested team members. Preferred tech enthusiast.", price: 1, date: "1 Dec"},
        {name: "2 Market Research", description: "Looking for research on competitors.", price: 1, date: "20 Dec"},
        {name: "2 Market Research", description: "Looking for research on competitors.", price: 7, date: "31 Dec"},
        {name: "1 Create 1", description: "Looking for interested team members. Preferred tech enthusiast.", price: 2, date: "7 Dec"},
        {name: "2 Market Research", description: "Looking for research on competitors.", price: 7, date: "31 Dec"},
        {name: "1 Create 1", description: "Looking for interested team members. Preferred tech enthusiast.", price: 2, date: "7 Dec"},
      ];

      let renderSingleMilestone = this.renderSingleMilestone;

      return (
        <div>
          <div className="row">
            <div className="col-lg-12">
              <h5>Milestones</h5>
            </div>
              {
                mileStones.map(function(milestone, i) {
                  return renderSingleMilestone(milestone, i);
                })
              }
          </div>
      </div>
      );
    }

    renderHeader() {
      return (
        <div>
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
          </div>
      );
    }

    renderFormContent() {
      return (
        <div>
          <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">1</span>Project Details</h5>
                <div>Tell us more about your project</div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="project_name" name="project_name" autoComplete="off" placeholder="Name of Project" autoFocus
                      onChange={(e)=>this.handleChangeName(e)} value={this.state.project.name}/>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea id="project_desc" placeholder="Please Describe Your Project" className="form-control validate-field required" 
                    name="project_desc"onChange={(e)=>this.handleChangeDescription(e)} value={this.state.project.description}/>
                </div> 
              </div>
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">2</span>Project Nature</h5>
              </div>
              <div className="col-lg-6">
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                      id="project_nature" name="project_nature" autoComplete="off" 
                        placeholder="Blockchain" onChange={(e)=>this.handleChangeNature(e)} value={this.state.project.nature}/>
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  You have this roadmap
                </div>
              </div>
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">3</span>Milestone Creator</h5>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <textarea id="milestone_desc" placeholder="Please describe the Milestone" className="form-control validate-field required" 
                    name="milestone_desc" onChange={(e)=>this.handleChangeMilestoneDesctiption(e)}/>
                </div> 
              </div>
              <div className="col-lg-6">
                <div className="glyphicon glyphicon-plus milestone-add-button" onClick={(e)=>this.handleMilestoneAdd(e)}/>
                <div>Add</div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="milestone_value" name="milestone_value" autoComplete="off" placeholder="Min Token" 
                      onChange={(e)=>this.handleChangeMilestonePrice(e)}/>
                </div>
              </div>
              <div className="col-lg-12">
                <hr></hr>
              </div>
          </div>
        </div>
      );
    }renderMileStones

    renderModal() {
      const Milestones = this.renderMileStones();
      const PopupHeader = this.renderHeader();
      const FormContent = this.renderFormContent();

      return (
        <Modal isOpen={this.props.modalIsOpen} onRequestClose={() => this.handleClose()} contentLabel={">Add a new Project"}>
          <div className="container-fluid popup-new-project">
            {PopupHeader}
            {FormContent}
            {Milestones}
            <div className="row">
              <div className="col-lg-12">
                <button type="button" className="btn btn-lg btn-outline pull-right" 
                  onClick={() => this.handleCloseAndSave()}>Close</button>
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

  export default require('react-click-outside')(PopupNewProject);