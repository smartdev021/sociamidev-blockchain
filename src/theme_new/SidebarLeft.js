/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme_new/appearance.css"
import "~/src/theme_new/layout.css"

class SidebarLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside>
        <div id="sidebar-left">
        <div id="user-status-widget">
          <div className="user-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              Good Morning Dan, update your status here
            </div>
          </div>
          <hr></hr>
          <div id="status-input-container">
            <input type="text" autoComplete="off" id="status-input" placeholder="Testing"/>
          </div>
        </div>
        <div id="list-friends">
          <div className="friend-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              <div className="user-text-name">Annalisa</div>
              Mobile app testing 50 mutual friends
            </div>
          </div>
          <div className="friend-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              <div className="user-text-name">Annalisa</div>
              Mobile app testing 50 mutual friends
            </div>
          </div>
          <div className="friend-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              <div className="user-text-name">Annalisa</div>
              Mobile app testing 50 mutual friends
            </div>
          </div>
          <div className="friend-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              <div className="user-text-name">Annalisa</div>
              Mobile app testing 50 mutual friends
            </div>
          </div>
          <div className="friend-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              <div className="user-text-name">Annalisa</div>
              Mobile app testing 50 mutual friends
            </div>
          </div>
          <div className="friend-widget">
            <img src='./images/dummy_friend_image.png'/>
            <div id="user-text">
              <div className="user-text-name">Annalisa</div>
              Mobile app testing 50 mutual friends
            </div>
          </div>
        </div>
      </div>
     </aside>
    );
  }
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);