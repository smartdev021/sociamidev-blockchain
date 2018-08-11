import React, { Component } from 'react';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import Challenges from '~/src/theme/components/challenges/Challenges';
import AddChallenge from '~/src/theme/components/challenges/AddChallenge';
import ApproveChallenge from '~/src/theme/components/challenges/ApproveChallenge';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

export class MyChallenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "Challenges"
    }
  }

  togglePage(page) {
    this.setState({
      currentPage: page,
      profilePic: this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic
    });
  }

  section() {
    switch(this.state.currentPage) {
      case "Challenges":
        return (
          <div className="col-middle ml-fixed">
            <div className="row">
              <div className="col-sm-5">
                <h3>My Challenges</h3>
              </div>
              <div className="col-sm-7 text-right">
                <button className="yellow-btn" onClick={ () => this.togglePage("AddChallenge") }>+ Add challenge</button>
                <button className="pur-btn" onClick={ () => this.togglePage("ApproveChallenge") }>Approve submission</button>
              </div>
            </div>

            <Challenges />
          </div>
        );
      case "AddChallenge":
        return <AddChallenge />;
      case "ApproveChallenge":
        return <ApproveChallenge profilePic={this.state.profilePic} />;
    }
  }

  render() {
    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper mychallenges-wrapper main-bg`}>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <LeftNav userProfile={this.props.userProfile} profilePic={this.state.profilePic} />

                <RightSection />

                { this.section() }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyChallenges;
