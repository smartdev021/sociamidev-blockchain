import React,{Component} from 'react';
import {connect} from 'react-redux';
import '~/src/theme/css/rewards.css';

import LeftPanel from './LeftPanel';
import RewardsHolder from './RewardsHolder';

class Rewards extends Component{

  render(){
    return(
      <div
        className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper tasks-wrapper main-bg reward-holder`}
      >
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <LeftPanel/>
                <div className="ml-fixed">
                  <RewardsHolder/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.userProfile.profile,
});

export default connect(mapStateToProps,{})(Rewards);
