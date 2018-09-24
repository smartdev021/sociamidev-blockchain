import React, { Component } from 'react';
import LeftNav from '~/src/theme/components/achievements/LeftNav';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class Achievements extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper mychallenges-wrapper profile-wrapper main-bg`}>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                
                <LeftNav
                  userProfile={this.props.userProfile} 
                  profilePic={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} 
                />

                <div className="col-middle ml-fixed">
                  <div className="achievements-wrapper">
                    <div className="row">
                      <div className="col-md-12 col-lg-5"><h2>House</h2></div>
                      <div className="col-md-12 col-lg-7">
                        <div className="prograss"><span style={{ width: '85%' }}>85%</span></div>
                        <a href="#" className="btn-lavel-yellow">+1000 SOQQ</a></div>
                    </div>
                    <div className="top-box">
                      <ul>
                        <li className="active">Network Seekers</li>
                        <li>Executives</li>
                        <li>Bot Tinkerer</li>
                        <li>App Ninja</li>
                        <li>Business Clairvoyants</li>
                      </ul>
                    </div>
                    <div className="bottom-box">
                      <ul>
                        <li>
                          <div className="img-icon"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/achi-icon.png" alt="" /></div>
                          <h4>Eugene Archon 3</h4>
                          <p>Earned 50 tokens durin 7 days</p>
                          <a href="#">reach level 5</a>
                        </li>
                        <li>
                          <div className="img-icon"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/achi-icon.png" alt="" /></div>
                          <h4>Eugene Archon 3</h4>
                          <p>Earned 50 tokens durin 7 days</p>
                          <a href="#">reach level 5</a>
                        </li>
                        <li>
                          <div className="img-icon"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/achi-icon.png" alt="" /></div>
                          <h4>Eugene Archon 3</h4>
                          <p>Earned 50 tokens durin 7 days</p>
                          <a href="#">reach level 5</a>
                        </li>
                      </ul>
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

export default Achievements;
