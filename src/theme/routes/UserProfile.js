/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import { withRouter } from 'react-router-dom'

import { Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import ConfigMain from '~/configs/main'

import {openUserProfileComplete} from '~/src/redux/actions/actions'

import "~/src/css/userProfile.css"

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  handleFormAction() {
    event.preventDefault();
  }

  componentWillMount() {
    this.props.openUserProfileComplete();
  }

  renderForm() {
    return (
      <div className="user_profole_form">
    <form className="form-inline" action="#" onSubmit={this.handleFormAction}>
      <div className="form-group">
      <h2 className="form-signin-heading">User profile summary</h2>

      <input type="text" className="form-control control_user_profile" name="first-name" 
      placeholder="First Name" readOnly 
      value={this.props.userProfile.firstName}/>

      <input type="text" className="form-control control_user_profile" name="last-name" 
      placeholder="Last Name" readOnly 
      value={this.props.userProfile.lastName}/> 

      <input type="text" className="form-control control_user_profile" name="interests" 
      placeholder="What are your interests?" readOnly 
      value={this.props.userProfile.interests}/>  

      <input type="text" className="form-control control_user_profile" name="skills" 
      placeholder="What are your skills?" readOnly
      value={this.props.userProfile.skills}/>  

      <input type="text" className="form-control control_user_profile" name="education" 
      placeholder="Where did you study?" readOnly
      value={this.props.userProfile.education}/>

      <input type="text" className="form-control control_user_profile" name="experience" 
      placeholder="What is your working experience?" required="" 
      value={this.props.userProfile.experience} readOnly/>

      <Link className="btn btn-lg btn-outline-inverse btn-block" to='/'>Back to Main</Link>

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

UserProfile.propTypes = {
  openUserProfileComplete: PropTypes.func.isRequired,

  userProfile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile
})

const mapDispatchToProps = dispatch => ({
  openUserProfileComplete: bindActionCreators(openUserProfileComplete, dispatch)
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));