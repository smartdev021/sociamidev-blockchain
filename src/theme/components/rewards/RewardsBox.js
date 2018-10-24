import React,{Component} from 'react';

import RewardImg from '../../images/reward_temp.png';

class RewardsBox extends Component{

  constructor(props) {
    super(props);
    this.state={
      isDropDownOpen :false
    }
  }

  handleDropDownClick(){
    this.setState({
      isDropDownOpen:!this.state.isDropDownOpen
    })
  }


  render(){
    return(
      <div className="col-md-4">
        <div className="RewardsBox">
          <div>
            <img src={RewardImg} alt="" width="100%" height="185px"/>
          </div>
          <div className="RewardsBox-content-right">
            <span className="RewardsBox-content-right-number">10</span>
            <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/sparks-menu-icon.png" alt=""/>
          </div>
          <div className="RewardsBox-main-text">
            Gift Voucher! Love the test, love the price
          </div>
          <div className="RewardsBox-main-sub-text">
            Innovation is widely known as a value which is worth pursuing or even a corporate cure-all. However it is important to be aware of the many innovation
          </div>
          <div className="RewardsBox-main-spend">
            MIN SPEND $50
          </div>
          <div className="RewardsBox-content-progress-right">
            IN PROGRESS
          </div>
          <div className="RewardsBox-footer-holder">
            <div>
              <i className="fa fa-caret-left"/>
            </div>
            <div className="RewardsBox-footer-holder-center">
              <div className="RewardsBox-footer-holder-icon">
                <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png" alt="" />
              </div>
              <div>
                <div className="RewardsBox-footer-drop-down-text" onClick={this.handleDropDownClick.bind(this)}>
                  Eugene Archon 3
                </div>
                <div className={`${this.state.isDropDownOpen ? 'RewardsBox-footer-drop-down-open' : ''} RewardsBox-footer-drop-down`}>
                  <div className="RewardsBox-footer-drop-down-list">
                    <div className="RewardsBox-footer-drop-down-list-option">3 ILLUMINANT TASK</div>
                    <div className="RewardsBox-footer-drop-down-list-option">1 DEEPDIVE TASK</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <i className="fa fa-caret-right"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RewardsBox
