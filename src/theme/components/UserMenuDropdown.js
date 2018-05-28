/*
    author: Akshay Menon
*/
require('~/src/css/UserMenuDropdown.css');

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

class UserMenuDropdown extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
        <li className="dropdown user user-menu">
          <a href="#" className="dropdown-toggle" 
          data-toggle="dropdown" aria-expanded="false">
          <i className="fa fa-user-circle"></i>
            
          </a>
          <ul className="dropdown-menu pull-right">
            <div className="row user-name-tag">
              <i className="fa fa-2x fa-user-circle pull-left"></i>
              <p className="name-tag">  {this.props.userProfile.firstName} {this.props.userProfile.lastName} &nbsp; </p>
            </div>
            <hr className="user-hr"/>
            <div className="row user-links">
              <Link className="user-link-text" to='/userProfile'>
                  Your Profile
              </Link>
            </div>
            <div className="row user-links">
              <Link className="user-link-text" to='/teams'>
                  My Teams
              </Link>
            </div>
            <div className="row user-links">
              <Link className="user-link-text" to='/privacy'>
                  Settings
              </Link>
            </div>
            <div className="row user-links">
              <ActionLink className="user-link-text" href="#"
              onClick={()=>this.props.onSignOut()}>
                  <span>Logout</span>
              </ActionLink>
            </div>
          </ul>
          
      </li>
                  
    );
  }
}

// UserMenuDropdown.propTypes = {
// }

export default UserMenuDropdown