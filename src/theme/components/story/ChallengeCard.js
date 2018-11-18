import React, { Component } from 'react';
import _ from 'lodash';
import "~/src/theme/css/challengeCard.css";


class ChallengeCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
        challenge: this.props.data
    }
  }

  /**
   * render get shadow randomly
   * the default is violet
   */
  getShadow () {
    const SHADOW_COUNT = 2; //set
    const rnd = Math.floor(Math.random() * SHADOW_COUNT);
    console.log(rnd);
    const YELLOW = 1;
    switch (rnd) {
      case YELLOW:
        return 'yellow-shadow';
      default:
        return '';
    }
  }

  getRewardDisplay () {
    let rewardDisplay = '';
    const type = _.get(this, 'state.data.reward.type');

    if (type === 'Token' || type === 'Fiat') {
      rewardDisplay = `${_.get(this, 'state.data.reward.value')} ${type}`;
    } else if (type === 'Achievement') {
      rewardDisplay = _.get(this, 'state.data.reward._achievement.name', '');
    }
    return rewardDisplay;
  }

  componeneDidMount(){
      this.getChallenges();
  }

  render () {
    return (
      <div className={'col-box-wp black-bg ' + this.getShadow()}>
        <p><strong>0/{_.get(this, 'state.challenge.quota') || 0} open</strong> 
            <span className="challenge-button">CHALLENGE</span> 
        </p>
        <p className="margin-top-10"><h5 className="challenge-title">{_.get(this, 'state.challenge.name')}</h5></p>
        <p className="margin-top-10">{_.get(this, 'state.challenge.description')}</p>
        <p className="margin-top-10"><span className='text-uppercase'>{_.get(this, 'state.challenge.success')}</span> 
            <span className={_.get(this, 'state.challenge.typeDetail') ? 'type-detail-btn': ''}>
                {_.get(this, 'state.challenge.typeDetail')}
            </span>
        </p>
        <div className='img-box-wp'>
          <img
            src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/challengeImages/${_.get(this, 'state.challenge._id')}`}
            alt=''
          />
        </div>
        <div className='fot-wp'>
          <p className='text-uppercase'>You will receive</p>
          <div className='row'>
            <div className='col-md-12 col-lg-7'>
              <ul className='bttons-right-box'>
                <li>
                   <a> {_.get(this, 'state.challenge.rewardValue')} &nbsp; {_.get(this, 'state.challenge.reward')} </a>
                </li>
              </ul>
            </div>
            <div className='col-md-12 col-lg-5'>
              <p className='pperpal-txt'>
                <a href='javascript:void(0)' className='btn-join pull-right'>
                  Join
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeCard;
