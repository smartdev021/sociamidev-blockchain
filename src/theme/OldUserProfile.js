/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { Link, Button } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Axios from 'axios'


import ConfigMain from '~/configs/main'
import { openUserProfileComplete } from '~/src/redux/actions/authorization'
import "~/src/css/userProfile.css"

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.userProfile,
    }
    this.handleChange = (e) => {
      let valueCopy = Object.assign({}, this.state.value);
      switch (e.target.id) {
        case 'first-name': { valueCopy.firstName = e.target.value; break; }
        case 'last-name': { valueCopy.lastName = e.target.value; break; }
        case 'interests': { valueCopy.interests = e.target.value; break; }
        case 'skills': { valueCopy.skills = e.target.value; break; }
        case 'education': { valueCopy.education = e.target.value; break; }
        case 'experience': { valueCopy.experience = e.target.value; break; }
        default: return;
      }
      this.setState({ value: valueCopy });
    }
  }

  handleFormAction() {
    const url = `${ConfigMain.getBackendURL()}/userProfileUpdate`;
    Axios.post(url, this.state.value)
      .then(function (response) {
        console.log("User record update: " + response);
      })
      .catch(function (error) {
        console.log("Error in update user record: " + error);
      });
    //event.preventDefault();
  }

  componentWillMount() {
    this.props.openUserProfileComplete();
  }

  //For viewing added friends profile fron news feed
  componentDidMount() {
    const URLParams = new URLSearchParams(this.props.location.search);

    const userProfileId = URLParams.get("id");

    if (userProfileId) {
      Axios.get(`${ConfigMain.getBackendURL()}/fetchUserProfileById?id=${userProfileId}`)
      .then((response)=>this.userProfileFetchSuccess(response))
      .catch((error)=>this.userProfileFetchFailed(error));
    }
  }

  userProfileFetchSuccess(response) {
    const profile = response.data.profile;

    let valueCopy = Object.assign({}, this.state.value);

    valueCopy.firstName = profile.firstName;
    valueCopy.lastName = profile.lastName;
    valueCopy.education = profile.education;
    valueCopy.experience = profile.experience;
    valueCopy.interests = profile.interests;
    valueCopy.skills = profile.skills;

    this.setState({ value: valueCopy });
  }

  userProfileFetchFailed(error) {
    
  }
  //------------------------------------------------

  renderForm() {
    const { value } = this.state;
    return (
      <div className="user_profile_form">
        {/*  action="#" onSubmit={this.handleFormAction} */}
        <form className="form-inline">
          <div className="form-group">
            <h2 className="form-signin-heading">User profile summary</h2>

            <input type="text" className="form-control control_user_profile" id="first-name" name="first-name"
              placeholder="First Name"
              value={value.firstName} onChange={this.handleChange} />

            <input type="text" className="form-control control_user_profile" name="last-name" id="last-name"
              placeholder="Last Name"
              value={value.lastName} onChange={this.handleChange} />

            <input type="text" className="form-control control_user_profile" name="interests" id="interests"
              placeholder="What are your interests?"
              value={value.interests} onChange={this.handleChange} />

            <input type="text" className="form-control control_user_profile" name="skills" id="skills"
              placeholder="What are your skills?"
              value={value.skills} onChange={this.handleChange} />

            <input type="text" className="form-control control_user_profile" name="education" id="education"
              placeholder="Where did you study?"
              value={value.education} onChange={this.handleChange} />

            <input type="text" className="form-control control_user_profile" name="experience" id="experience"
              placeholder="What is your working experience?" required=""
              value={value.experience} onChange={this.handleChange} />

            <input type="text" className="form-control control_user_profile" name="balance" 
              placeholder="Available balance" required=""
              value={value.balance} readOnly />


            <button type="button" className="btn btn-lg btn-warning btn-block"
              onClick={(e) => this.handleFormAction(e)}>Submit</button>

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
  userProfile: state.userProfile.profile,
})

const mapDispatchToProps = dispatch => ({
  openUserProfileComplete: bindActionCreators(openUserProfileComplete, dispatch)
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));