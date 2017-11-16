import React from 'react';
import Modal from 'react-modal';
import "~/src/css/popupProjectManagement.css"

class PopupNewProject extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};
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
      return (
        <div>
          <div className="col-lg-12">
            <i className="glyphicon glyphicon-hourglass milestone-title-tag"/>
            <span className="milestone-title-tag">1 Create 1</span>
            <span className="milestone-title-tag">1 Token</span>
            <span className="milestone-title-tag">1 Dec</span>
            <p>Looking for interested team members. Preferred tech enthusiast.</p>
         </div>
         <div className="col-lg-12">
           <i className="glyphicon glyphicon-hourglass milestone-title-tag"/><span className="milestone-title-tag">2 Market Research</span>
           <span className="milestone-title-tag">1 Token</span>
           <span className="milestone-title-tag">20 Dec</span>
           <p>Looking for research on competitors.</p>
        </div>
      </div>
      );
    }

    renderModal() {
      const Milestones = this.renderMileStones();
      return (
        <Modal  isOpen={this.props.modalIsOpen} onRequestClose={() => this.props.onCloseModal()} contentLabel={">Add a new Project"}>
          <div className="container-fluid popup-new-project">
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
            <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">1</span>Project Details</h5>
                <div>Tell us more about your project</div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="project-name" name="project-name" autoComplete="off" placeholder="Name of Project" autoFocus/>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea id="project-desc" placeholder="Please Describe Your Project" className="form-control validate-field required" 
                    name="project-desc"></textarea>
                </div> 
              </div>
              <div className="col-lg-12">
                <h5><span className="badge project-section-badge">2</span>Project Nature</h5>
              </div>
              <div className="col-lg-6">
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                      id="project-name" name="project-nature" autoComplete="off" placeholder="Blockchain"/>
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
                  <textarea id="milestone-desc" placeholder="Please describe the Milestone" className="form-control validate-field required" 
                    name="milestone-desc"></textarea>
                </div> 
              </div>
              <div className="col-lg-6">
                <div className="glyphicon glyphicon-plus milestone-add-button"/>
                <div>Add</div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
                    id="milestone-value" name="milestone-value" autoComplete="off" placeholder="Min Token"/>
                </div>
              </div>
              <div className="col-lg-12">
                <hr></hr>
              </div>
              <div className="col-lg-12">
                <h5>Milestones</h5>
              </div>
              {Milestones}
              <div className="col-lg-12">
                <button type="button" className="btn btn-lg btn-outline pull-right" 
                  onClick={()=>this.props.onCloseModal()}>Close</button>
              </div>
            </div>
          </div>
        </Modal>
      );
    }

    handleClickOutside() {
        () => this.props.onCloseModal();
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