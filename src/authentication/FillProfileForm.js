import React from 'react';
import Modal from 'react-modal';
import "../css/signUpFormPopup.css"
const enhanceWithClickOutside = require('react-click-outside');

class FillUserProfileForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {education: "", workExperience: ""};
    }

    handleChangeEducation(event) {
      let copy = Object.assign({}, this.state, {education: event.target.value});
      this.setState(copy);
    }

    handleChangeWorkExperience(event) {
      let copy = Object.assign({}, this.state, {workExperience: event.target.value});
      this.setState(copy);
    }

    renderForm() {
      return (<div>
        <Modal
        className={{
      base: 'modal_base'
    }}
          isOpen={this.props.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          contentLabel="Login Form"
        >
  
        <div className="wrapper">
      <form className="form-signin">       
        <h2 className="form-signin-heading">Fill your profile data:</h2>
        <input type="text" className="form-control" name="Education" placeholder="Where did you study?" required="" 
        autoFocus="" required="" onChange={(e) => this.handleChangeEducation(e)} value={this.props.settings.education}/>

        <input type="text" className="form-control" name="Work Experience" 
        placeholder="What is your working experience?" required="" onChange={(e) => this.handleChangeWorkExperience(e)} 
        value={this.props.settings.experience}/>  

        <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=>this.handleFormSubmit()}>Submit</button>   
      </form>
    </div>
        </Modal>
      </div>);
    }

      handleClickOutside() {
        () => this.props.onCloseModal();
      }

      handleFormSubmit() {
        console.log("handleFormSubmit: education" + this.state.education + " experience: " + this.state.workExperience);
        this.props.onSubmitSettings({education: this.state.education, experience: this.state.workExperience});
      }
  
    render() {
        return (
        <div>
            {this.renderForm()}
        </div>
        );
      }
  }

  module.exports = enhanceWithClickOutside(FillUserProfileForm);