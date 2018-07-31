/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import Axios from 'axios';
import { Icon } from 'react-fa';

import ConfigMain from '~/configs/main';

import Post from '~/src/theme/components/homepage/Post';
import '~/src/theme/css/homePage.css';

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
      <div className="home-page-new-wrapper profile-wrapper">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <div className="col fixed-wp">
                  <div className="black-box p-0">
                    <div className="left-content">
                      <div className="top-head">
                        <div className="icon">
                          <img src={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} alt="" />
                        </div>
                        <span className="col-heading">{this.props.userProfile.firstName} {this.props.userProfile.lastName}</span>
                      </div>
                      <ul>
                        <li>
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/newsfeed-menu-icon.png" />
                            </span>
                            <p>News Feed</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/messages-menu-icon.png" />
                            </span>
                            <p>Messages</p>
                          </a>
                        </li>
                        <div className="line-devider"></div>
                        <li>
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/team-menu-icon.png" />
                            </span>
                            <p>Team</p>
                          </a>
                        </li>
                        <li className="l-h40">
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/sparks-menu-icon.png" />
                            </span>
                            <p>Sparks</p>
                          </a>
                        </li>
                        <li className="l-h40">
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/achievements-menu-icon.png" />
                            </span>
                            <p>Achievements</p>
                          </a>
                        </li>
                        <li className="l-h40">
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/connections-menu-icon.png" />
                            </span>
                            <p>Connections</p>
                          </a>
                        </li>
                        <li className="l-h40">
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/levels-menu-icon.png" />
                            </span>
                            <p>Levels</p>
                          </a>
                        </li>
                        <li className="l-h40">
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/rewards-menu-icon.png" />
                            </span>
                            <p>Rewards</p>
                          </a>
                        </li>
                        <li className="l-h40">
                          <a href="#">
                            <span className="icon-wp">
                              <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/roles-menu-icon.png" />
                            </span>
                            <p>Roles</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col pull-right">
                  <div className="black-box-right">
                    <h3 className="next-previous-icons"><span className="left-arrow">&#9664;</span>  <span className="right-arrow">&#9654;</span></h3>
                    <div className="box">
                      <div className="games-network-wp">
                        <h3 className="col-heading">Blockforce chapter 1 </h3>
                        <p>Innovation is widely known as a value which is worth pursuing or even a corporate cure-all. However it is important to be aware of the many innovation</p>
                        <div className="fot-wp">
                          <p className="text-uppercase text-center">You will receive</p>
                          <ul className="bttons-right-box">
                            <li><a href="#">5 Exp</a></li>
                            <li><a href="#">10 soqq</a></li>
                            <li><a href="#">Valor</a></li>
                          </ul>
                          <p>0/3 of Creavity Questions <a href="#" className="btn-join pull-right">Accept</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="box-bottom-right-col">
                      <div className="fot-wp">
                        <p className="text-uppercase text-center">Hero: Blockforce enforcer</p>
                        <div className="games-network-wp">
                          <ul>
                            <li>
                              <span className="helf-wp">
                                <a href="#" className="btn-lavel-yellow">level 5</a>
                                <span className="txt">5 XP</span>
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
                                <span className="txt pull-right">20 XP</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="black-box">
                    <div className="games-network-wp">
                      <h3 className="col-heading">Games in Network <a href="#" className="purpal-text-link">View all</a></h3>
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
                </div>
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
