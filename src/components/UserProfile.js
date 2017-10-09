/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {education: this.props.settings.education, workExperience: this.props.settings.experience};
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
    return (
      <div className="i-am-centered">
    <form className="form-inline" action="#" onSubmit={this.props.onHandleSearchClicked}>
      <div className="form-group">
      <h2 className="form-signin-heading">Fill your profile data:</h2>
      <input type="text" className="form-control" name="Education" placeholder="Where did you study?" required="" 
      autoFocus="" required="" onChange={(e) => this.handleChangeEducation(e)} value={this.state.education}/>

      <input type="text" className="form-control" name="Work Experience" 
      placeholder="What is your working experience?" required="" onChange={(e) => this.handleChangeWorkExperience(e)} 
      value={this.state.workExperience}/>  

      <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=>this.handleFormSubmit()}>Submit</button>   
      </div>
    </form>
  </div>)
  }

  handleFormSubmit() {
    console.log("handleFormSubmit: education" + this.state.education + " experience: " + this.state.workExperience);
    this.props.onSubmitSettings({education: this.state.education, experience: this.state.workExperience});
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