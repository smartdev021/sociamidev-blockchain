/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import Promise from 'bluebird'
import Axios from 'axios'

import ConfigMain from '../../configs/main'

import "../css/userProfile.css"

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      education: this.props.settings.education, 
      workExperience: this.props.settings.experience,
      interests: this.props.settings.interests, 
      skills: this.props.settings.skills,
      facebookID: null,
      linkedInID: null,
      isBusy: false};
  }

  handleChangeEducation(event) {
    let copy = Object.assign({}, this.state, {education: event.target.value});
    this.setState(copy);
  }

  handleChangeWorkExperience(event) {
    let copy = Object.assign({}, this.state, {workExperience: event.target.value});
    this.setState(copy);
  }

  handleChangeInterests(event) {
    let copy = Object.assign({}, this.state, {interests: event.target.value});
    this.setState(copy);
  }

  handleChangeSkills(event) {
    let copy = Object.assign({}, this.state, {skills: event.target.value});
    this.setState(copy);
  }

  handleFormAction() {
    event.preventDefault();
  }

  renderForm() {
    return (
      <div className="user_profole_form">
    <form className="form-inline" action="#" onSubmit={this.handleFormAction}>
      <div className="form-group">
      <h2 className="form-signin-heading">User profile summary</h2>
      <input type="text" className="form-control control_user_profile" name="Education" placeholder="Where did you study?" required="" 
      autoFocus="" required="" onChange={(e) => this.handleChangeEducation(e)} value={this.state.education}/>

      <input type="text" className="form-control control_user_profile" name="Working Experience" 
      placeholder="What is your working experience?" required="" onChange={(e) => this.handleChangeWorkExperience(e)} 
      value={this.state.workExperience}/>  

      <input type="text" className="form-control control_user_profile" name="Yourinterests" 
      placeholder="What are your interests?" required="" onChange={(e) => this.handleChangeInterests(e)} 
      value={this.state.interests}/>  

      <input type="text" className="form-control control_user_profile" name="Your skills" 
      placeholder="What are your skills?" required="" onChange={(e) => this.handleChangeSkills(e)} 
      value={this.state.skills}/>  

      <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=>this.handleFormSubmit()}>Submit</button>   
      </div>
    </form>
  </div>)
  }

  setBusyState(busy) {
    let copy = Object.assign({}, this.state, {isBusy: busy});
    this.setState(copy);
  }

  handleBackendResponse(response) {
    console.log(response);
  }

  handledError(error) {
    console.log(error);
  }

  handleFormSubmit() {
    if (!this.state.isBusy) {
      this.setBusyState(true);
  
      Axios.get(`${ConfigMain.BackendURL}/updateProfile?linedInID=${this.props.linedInID}&facebookID=${this.props.faceBookID}&education=${this.state.education}&experience=${this.state.workExperience}&skills=${this.state.skills}&interests=${this.state.interests}`)
      .then((response) =>this.handleBackendResponse(response))
      .catch((error) =>this.handledError(error));
  
      console.log("handleFormSubmit: education" + this.state.education + " experience: " + this.state.workExperience);
      this.props.onSubmitSettings(
        {education: this.state.education,
        experience: this.state.workExperience,
        interests: this.state.interests,
        skills: this.state.skills,
      }
      );
    }
  }

  render() {
    return (<span>
    <div className="row mt center">
    <div className="col-lg-4 center-block">
      
      </div>
      <div className="col-lg-4 center-block">
       {this.renderForm()}
      </div>
      <div className="col-lg-4 center-block">
       
      </div>
    </div>
    </span>
    );
  }

  

}

export default UserProfile;