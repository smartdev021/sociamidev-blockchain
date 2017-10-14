/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import ConfigMain from '../../configs/main'

import "../css/userProfile.css"

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
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

      <input type="text" className="form-control control_user_profile" name="first-name" 
      placeholder="First Name" readOnly 
      value={''}/>

      <input type="text" className="form-control control_user_profile" name="last-name" 
      placeholder="Last Name" readOnly 
      value={''}/> 

      <input type="text" className="form-control control_user_profile" name="interests" 
      placeholder="What are your interests?" readOnly 
      value={''}/>  

      <input type="text" className="form-control control_user_profile" name="skills" 
      placeholder="What are your skills?" readOnly
      value={''}/>  

      <input type="text" className="form-control control_user_profile" name="education" 
      placeholder="Where did you study?" readOnly
      value={''}/>

      <input type="text" className="form-control control_user_profile" name="experience" 
      placeholder="What is your working experience?" required="" onChange={(e) => this.handleChangeWorkExperience(e)} 
      value={''} readOnly/>

      <Link className="btn btn-primary btn-lg btn-block" to='/'>Back to Main</Link>

      </div>
    </form>
  </div>)
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