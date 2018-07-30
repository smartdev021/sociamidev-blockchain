/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import Axios from 'axios';
import { Icon } from 'react-fa';

import ConfigMain from '~/configs/main';

import Friends from '~/src/theme/components/homepage/Friends';
import Photos from '~/src/theme/components/homepage/Photos';
import Team from '~/src/theme/components/homepage/Team';
import Post from '~/src/theme/components/homepage/Post';
import '~/src/theme/css/homePage.css';

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
      <div className="home-page-new-wrapper">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <div className="col">
                  <Friends heading="My friends" />
                  <Photos heading="My photos" />
                </div>
                <div className="col pull-right">
                  <div className="black-box">
                    <div className="games-network-wp">
                      <h3 className="col-heading">Games in Network</h3>
                      <ul>
                        <li>
                          <span className="helf-wp">
                            <span className="img-wp-box"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/games-network-1.png" /></span>
                            <span className="head-text">Mayple Story</span>
                          </span>
                          <span className="helf-wp">
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="rp-txt">60%</span>
                          </span>
                        </li>
                        <li>
                          <span className="helf-wp">
                            <span className="img-wp-box"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/games-network-2.png" /></span>
                            <span className="head-text">World & tanks</span>
                          </span>
                          <span className="helf-wp">
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="rp-txt">40%</span>
                          </span>
                        </li>
                        <li>
                          <span className="helf-wp">
                            <span className="img-wp-box"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/games-network-3.png" /></span>
                            <span className="head-text">Blade & Soul</span>
                          </span>
                          <span className="helf-wp">
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="rp-txt">60%</span>
                          </span>
                        </li>
                        <li>
                          <span className="helf-wp">
                            <span className="img-wp-box"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/games-network-4.png" /></span>
                            <span className="head-text">Dragon Ball online</span>
                          </span>
                          <span className="helf-wp">
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b"></span>
                            <span className="rp-txt">90%</span>
                          </span>
                        </li>
                        <li>
                          <span className="helf-wp">
                            <span className="img-wp-box"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/games-network-5.png" /></span>
                            <span className="head-text">Mythic Gloria</span>
                          </span>
                          <span className="helf-wp">
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b active"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="per-b"></span>
                            <span className="rp-txt">60%</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="black-box">
                    <div className="Upcoming-Team-Quests-wp">
                      <h3 className="col-heading">Upcoming Team Quests</h3>
                      <ul>
                        <li>
                          <p>World of warcraft I Marry Princess 5\12 Slots open I Every Thursday Leader: Donaldduck <a href="#" className="plus-icon">+</a></p>
                        </li>
                        <li>
                          <p>World of warcraft I Marry Princess 5\12 Slots open I Every Thursday Leader: Donaldduck <a href="#" className="plus-icon">+</a></p>
                        </li>
                        <li>
                          <p>World of warcraft I Marry Princess 5\12 Slots open I Every Thursday Leader: Donaldduck <a href="#" className="plus-icon">+</a></p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Team />
                </div>
                <div className="col-middle">
                  <div className="top-box-wp">
                    <div className="profile-icon">
                      <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/center-top-profile.png" alt="" />
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
