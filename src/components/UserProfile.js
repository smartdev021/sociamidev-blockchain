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
      /*education: this.props.settings.education, 
      workExperience: this.props.settings.experience,
      firstName : this.props.settings.firstName,
      lastName : this.props.settings.lastName,
      interests: "", 
      skills: "",
      facebookID: null,
      linkedInID: null*/
      education: "Coming soon...", 
      workExperience: "Coming soon...",
      firstName : "Coming soon...",
      lastName : "Coming soon...",
      interests: "", 
      skills: "",
      facebookID: null,
      linkedInID: null
    };
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

      <input type="text" className="form-control control_user_profile" name="Yourinterests" 
      placeholder="What are your interests?" required="" readOnly 
      value={''}/>  

      <input type="text" className="form-control control_user_profile" name="Your skills" 
      placeholder="What are your skills?" required="" readOnly
      value={''}/>  


      <input type="text" className="form-control control_user_profile" name="Education" placeholder="Where did you study?" required="" readOnly
      autoFocus="" required="" value={''}/>

      <input type="text" className="form-control control_user_profile" name="Working Experience" 
      placeholder="What is your working experience?" required="" onChange={(e) => this.handleChangeWorkExperience(e)} 
      value={''} readOnly/>  

      <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=>this.handleClose()}>OK</button>   
      </div>
    </form>
  </div>)
  }

  handleClose() {
    this.props.onSubmitSettings();
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