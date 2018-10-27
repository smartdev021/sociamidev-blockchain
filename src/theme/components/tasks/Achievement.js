/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import Modal from 'react-modal';

import PropTypes from 'prop-types';
import ActionLink from '~/src/components/common/ActionLink';

import '~/src/theme/css/achievement.css';

class Achievement extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    
  }


  showNextAchievement() {
    let totalAchievements = this.props.achievementData.updatedAchievements.length;
    if(this.index == totalAchievements - 1) {
      return;
    }
    if(this.props.achievementData) {
    this.index = this.index + 1;
    this.achievementDetails = this.getDetailsAchievment();
  }
  }

    showPreviousAchievement() {
      if(this.index == 0) {
        return;
      }
    if(this.props.achievementData) {
    this.index = this.index - 1;
    this.achievementDetails = this.getDetailsAchievment();
  }
  }

  getDetailsAchievment() {

    let data = {};
      let {updatedAchievements}= this.props.achievementData;
      let {userAchievementResult} = this.props.achievementData;
    if (updatedAchievements && updatedAchievements.length) {
      let updates = updatedAchievements[this.index]; // for now take only 1
      let achievementsInfo = userAchievementResult.achievements.filter(
        info => info.achievementId === updates._id,
      );
      updates = { ...updates, conditions: achievementsInfo[0].conditions };

      data = {
        ...updates,
        countProgress: updates.conditions[0].counter,
        countComplete: updates.conditions[0].count,
        displayName: updates.name,
        displayProgressVsComplete: this._getProgress(updates),
        generic: false
      };
    }

    return data;
  }

  _getProgress(updates) {
    let data = [];
    let length = updates.conditions.length;
    for (let i=0; i<length; i++){
    let num1 = updates.conditions[i].counter,
      num2 = updates.conditions[i].count;
      if (!num1) {
        num1 = 1;
      }
    if (num1 === num2) {
      data.push(`Complete!`);
    } else {
    data.push(this._getPercentProgress(updates, i));
  }
  }
    return data;
  }

  _getPercentProgress(updates, i) {
    let num1 = updates.conditions[i].counter,
      num2 = updates.conditions[i].count;
      if (!num1) {
        num1 = 1;
      }
    let mathFloor = ~~((num1 / num2) * 100);

    return `${num1}/${num2} - ${mathFloor}% Complete!`;
  }

  getDisplayName() {
    if(this.index == 0) {
    return this.props.achievementDetails.displayName;
  }
   return this.achievementDetails.displayName;
}

getPercentage(value) {
    if(this.index == 0) {
    return this.props.achievementDetails.displayProgressVsComplete;
  }
   return this.achievementDetails.displayProgressVsComplete[value];
}


  render() {
    const { isOpen, close } = this.props;
     const modalStyleOverrides = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        border: 'none',
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    };
    return (
      <Modal isOpen={isOpen} style={modalStyleOverrides} onRequestClose={close}>
        <div className="achievement-modal modal-popup">
          <div className="achievement-container">
            <div className="achievement-wrapper">
              <div className="center-wrapper">
              <ActionLink href="#" className="modal-close-button" onClick={close} />
              <div class="QuestionAnswersFlow-previous" onClick={()=>this.showPreviousAchievement()}><a className="ach-previous" class="btn-prev QuestionAnswersFlow-previous">◀ prev</a></div>
              <div class="QuestionAnswersFlow-next QuestionAnswersFlow-next-block" onClick={()=>this.showNextAchievement()}><a className="ach-next" class="btn-next QuestionAnswersFlow-next">next ▶</a></div>
                <div className="content-wp">
                
                  <h6 className="yellow-text">{this.getPercentage(0)}</h6>
                 {this.index > 0 && this.getPercentage(1) ? <h6 className="yellow-text prog-percent">{this.getPercentage(1)}</h6> : null}
                  
                  <h4>{this.getDisplayName()}</h4>
                  <p>
                    The Innovator quickly flies into action and arrives at the signal. The Chief of Police is
                    there and tells him that the nefarious Shadow Professor has struck again
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

Achievement.propTypes = {};

export default Achievement;
