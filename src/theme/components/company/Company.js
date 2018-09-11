import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import '~/src/theme/css/darkTheme.css';
import '~/src/theme/css/lightTheme.css';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper company-wrapper main-bg`}>
        <div className="row">
          <div className="container">
            <div className="row">    
              <LeftNav 
                accounting={this.props.accounting}
                userProfile={this.props.userProfile} 
                profilePic={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} 
              />

              <RightSection />

              <div className="col-middle ml-fixed"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Company));
