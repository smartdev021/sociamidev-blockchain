/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import Axios from 'axios';
import { Icon } from 'react-fa';

import ConfigMain from '~/configs/main';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import Post from '~/src/theme/components/homepage/Post';
import '~/src/theme/css/darkTheme.css';
import '~/src/theme/css/lightTheme.css';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loadingPosts: true
    }
    this.createPost = this.createPost.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.postInput = null;
    this.setPostInputRef = element => {
      this.postInput = element;
    };
  }

  createPost() {
    const that = this;
    Axios.post(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/posts`, 
      {message: this.postInput.value, userName: this.props.userProfile.firstName + " "+ this.props.userProfile.lastName})
    .then((response) => {
      this.postInput.value = "";
      that.fetchPosts();
    })
    .catch(error => {
    });
  }

  fetchPosts() {
    Axios.get(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/feeds`)
    .then((response) => {
      this.setState({ posts: response.data, loadingPosts: false });
    })
    .catch(error => {
    });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper main-bg`}>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <LeftNav userProfile={this.props.userProfile} profilePic={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} />

                <RightSection />

                <div className="col-middle ml-fixed">
                  <div className="top-box-wp">
                    <div className="profile-icon">
                      <img src={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} alt="" />
                    </div>
                    <input type="text" name="" ref={this.setPostInputRef} placeholder="What do you want to say..." />
                    <div className="buttons-wp">
                      <ul>
                        <li><a href="#"><div className="icon-white"><i className="fa fa-camera"></i></div></a></li>
                        <li><a href="#"><div className="icon-white"><i className="fa fa-video-camera"></i></div></a></li>
                        <li><a href="#"><div className="icon-white icon-purpal" onClick={this.createPost}><i className="fa fa-paper-plane"></i></div></a></li>
                      </ul>
                    </div>
                  </div>
                  { this.state.loadingPosts ? <Icon style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: '30px' }} spin name="spinner" /> : this.state.posts.length === 0 ? 
                      <span style={{ color: 'gray', fontSize: '16px', textAlign: 'center', width: '100%', display: 'inline-block' }}>There are no posts! Start making friends!</span>
                    : this.state.posts.map( post => <Post key={post._id} data={post} />) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
