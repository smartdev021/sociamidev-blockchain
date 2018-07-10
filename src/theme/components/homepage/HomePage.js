/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import '~/src/theme/css/homePage.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-page-new-wrapper">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <div className="col">
                  <div className="black-box">
                    <div className="my-friends-wp">
                      <h3 className="col-heading">My friends</h3>
                      <ul>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-1.png" /></span>
                        <p>John</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-2.png" /></span>
                        <p>Lina</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-3.png" /></span>
                        <p>Sona</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-4.png" /></span>
                        <p>John</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-5.png" /></span>
                        <p>Anna</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-6.png" /></span>
                        <p>John</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-7.png" /></span>
                        <p>Masha</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-8.png" /></span>
                        <p>Karina</p> </li>
                        <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-9.png" /></span>
                        <p>Anahit</p> </li>
                      </ul>
                    </div>
                  </div>
                  <div className="black-box">
                    <div className="my-photos-wp">
                      <h3 className="col-heading">My photos</h3>
                      <ul>
                        <li><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/left-bottom-1.jpg" /></li>
                        <li><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/left-bottom-2.jpg" /></li>
                        <li><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/left-bottom-3.jpg" /></li>
                        <li><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/left-bottom-4.jpg" /></li>
                        <li><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/left-bottom-5.jpg" /></li>
                        <li><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/left-bottom-6.jpg" /></li>
                      </ul>
                    </div>
                  </div>
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
                  <div className="black-box bg-right-team">
                    <div className="team-wp">
                      <h3 className="col-heading">Team</h3>
                      <div className="custom-select">
                        <select>
                          <option value="0">The misfits</option>
                          <option value="1">Legendary</option>
                          <option value="2">Marry Christmas</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-middle">
                  <div className="top-box-wp">
                    <div className="profile-icon">
                      <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/center-top-profile.png" alt="" />
                    </div>
                    <input type="text" name="" placeholder="What do you want to say..." />
                    <div className="buttons-wp">
                      <ul>
                        <li><a href="#"><div className="icon-white"><i className="fa fa-camera"></i></div></a></li>
                        <li><a href="#"><div className="icon-white"><i className="fa fa-video-camera"></i></div></a></li>
                        <li><a href="#"><div className="icon-white icon-purpal"><i className="fa fa-paper-plane"></i></div></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="black-box">
                    <div className="main-comment-box">
                      <div className="top-head">
                        <div className="profile-icon">
                          <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-9.png" alt="" />
                        </div>
                        <span className="col-heading">David Avetyan</span>
                        <span className="date">17.02.18</span>
                      </div>
                      <p>The #data seeker looks to see all, in order to protect all in the name of information.</p>
                      <div className="img-box">
                        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/center-middle-img.png" alt="" />
                      </div>
                      <h4>Winning the Game of Innovation Advantages and Disadvantages</h4>
                      <p>Innovation is widely known as a value which is worth pursuing or even a corporate cure-all. However it is important to be aware of the many innovation...</p>
                      <div className="bot-wp">
                        <div className="likewp">
                          <div className="thum-like">
                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                          </div>
                          <span>Anna +23 others</span>
                          <span className="comments-txt">4 comments</span>
                        </div>
                        <div className="input-wp">
                          <div className="input-filed">
                            <input type="text" name="" placeholder="Write comment..." />
                            <a href="#" className="camera-icon"><i className="fa fa-camera"></i></a>
                          </div>
                          <div className="bot-share-btns">
                            <ul>
                              <li><a href="#"><div className="icon-white text-blue"><i className="fa fa-share"></i></div></a></li>
                              <li><a href="#"><div className="icon-white icon-blue"><i className="fa fa-thumbs-up"></i></div></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
