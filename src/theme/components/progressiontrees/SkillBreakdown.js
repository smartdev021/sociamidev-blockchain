/*
    author: Alexander Zolotov
*/
import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import Axios from 'axios'
import ConfigMain from '~/configs/main'

import "~/src/theme/css/treebrowser.css"

import {
  selectResultsCategory,
} from '~/src/redux/actions/fetchResults'

import {
  fetchResults,
  setSearchQuery,
} from '~/src/redux/actions/fetchResults'

import {
  userInteractionPush,
} from '~/src/redux/actions/userInteractions'

import TrendScannerComponent from '~/src/theme/components/trends/TrendScannerComponent';
import HangoutSubmitForm from '~/src/theme/components/progressiontrees/HangoutSubmitForm';

import TaskTypes from "~/src/common/TaskTypes"

import UserInteractions from "~/src/common/UserInteractions"

class SkillBreakdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     skillInfo: undefined,
     isHangoutFormVisible: false,
     TrendScannerComponentVisible: false
    }
  }

  componentWillMount() {
    this.updateSkill(this.props.skillName);
  }

  updateSkill(name) {
    const url = `${ConfigMain.getBackendURL()}/skillGet?name=${name}`;
    const that = this;
    Axios.get(url)
      .then(function(response) {
        that.setState( {skillInfo: response.data} );
        console.log(response.data);
    })
    .catch(function(error) {
      that.setState( {skillInfo: undefined} );
      console.log(error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.skillInfo != this.state.skillInfo) {
      if (this.state.skillInfo) {

        if (this.props.userProfile && this.props.userProfile._id) {
          this.props.userInteractionPush(this.props.userProfile._id, 
            UserInteractions.Types.PAGE_OPEN, 
            UserInteractions.SubTypes.SKILL_VIEW, 
            { 
              skillId: this.state.skillInfo._id,
            }
          );
        }
        
        this.props.setSearchQuery(this.state.skillInfo.skill);

        this.props.fetchResults("jobs_indeed", this.state.skillInfo.skill);
        this.props.fetchResults("events_eventbrite", this.state.skillInfo.skill);
        this.props.fetchResults("courses_udemy", this.state.skillInfo.skill);
        this.props.fetchResults("gigs_freelancer", this.state.skillInfo.skill);
      }
    }

    if (prevState.isHangoutFormVisible != this.state.isHangoutFormVisible) {
      if (this.state.isHangoutFormVisible) {
        if (this.props.userProfile && this.props.userProfile._id) {
          this.props.userInteractionPush(this.props.userProfile._id, 
            UserInteractions.Types.ACTION_EXECUTE, 
            UserInteractions.SubTypes.DEEPDIVE_PREPARE, 
            { 
              skillId: this.state.skillInfo._id,
            }
          );
        }
      }
    }
  }

  toggleHangoutForm(skillInfo) {
    this.setState( { isHangoutFormVisible: true } );
  }

  toggleTrendScannerComponent() {
    this.setState({ 
      TrendScannerComponentVisible: true,
      isHangoutFormVisible: true
    });
  }

  handleSelectCategory(e) {
    this.props.selectResultsCategory(e.currentTarget.id);
  }

  handleStartHangout(date) {
    const RandomInt = function RandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const hangout = {
      name: `Hangout for roadmap "${this.props.tree.name}"`,
      description: "Hangout with John, and answer questions together",
      type: TaskTypes.HANGOUT,
      userName: `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`, 
      userID: this.props.userProfile._id,
      isHidden: 0,
      creator: {
        _id: this.props.userProfile._id,
        firstName: this.props.userProfile.firstName,
        lastName: this.props.userProfile.lastName,
      },
      metaData : {
        subject: {
          roadmap: {
            _id: this.props.tree._id,
            name: this.props.tree.name,
          },
          skill: {
            _id: this.state.skillInfo._id,
            name: this.state.skillInfo.skill,
          },
        },
        participants: [
          {
            user: {
              _id: this.props.userProfile._id, 
              firstName: this.props.userProfile.firstName,
              lastName: this.props.userProfile.lastName,
            },
            status: "accepted",
            isCreator: true,
          }
        ], //userId, name, proposedTime(optional), status: sent/accepted/rejected
        ratings: [],
        time: date.getTime(),
        awardXP: RandomInt(30, 40),
      },
    };

    if (hangout.userName != "" && hangout.name != "" && hangout.description != "") {
      this.props.saveTask(hangout);

      if (this.props.userProfile && this.props.userProfile._id) {
        this.props.userInteractionPush(this.props.userProfile._id, 
          UserInteractions.Types.ACTION_EXECUTE, 
          UserInteractions.SubTypes.DEEPDIVE_START, 
          { 
            skillId: this.state.skillInfo._id,
          }
        );
      }
    }
    
    this.setState( { isHangoutFormVisible: false } );
  }

  handleTimeChange(e) {
    e.preventDefault();
    console.log(e.currentTarget.value);
  }

  handleClose() {
    if (this.props.userProfile && this.props.userProfile._id) {
      if (this.state.skillInfo) {
        this.props.userInteractionPush(this.props.userProfile._id, 
          UserInteractions.Types.PAGE_CLOSE, 
          UserInteractions.SubTypes.SKILL_VIEW, 
          { 
            skillId: this.state.skillInfo._id,
          }
        );
      }
    }

    this.props.onCloseSkillBreakdown();
  }

  isDeepdiveAvailable() {
    return true;
    console.log("%isDeepdiveAvailable before sort", "color:blue;background:white");
    if (this.props.userProfile.hangouts && this.props.userProfile.hangouts.length > 0) {
      const CurrentTree = this.props.tree;
      let hangoutsForCurrentTree = this.props.userProfile.hangouts.filter((hangout) => {
        return hangout.treeId == CurrentTree._id;
      });

      if (hangoutsForCurrentTree.length > 0) {
        console.log("%changoutsForCurrentTree before sort", "color:white;background:purple");
        console.dir(hangoutsForCurrentTree);
        hangoutsForCurrentTree.sort((a, b) => {
          return a.dateJoined - b.dateJoined;
        });
        console.log("%changoutsForCurrentTree after sort", "color:white;background:orange");
        console.dir(hangoutsForCurrentTree);

        console.log("Date.now() - hangoutsForCurrentTree[hangoutsForCurrentTree.length - 1].dateJoined: " + Date.now() - hangoutsForCurrentTree[hangoutsForCurrentTree.length - 1].dateJoined);

        console.log("CurrentTree.dailyQuota: " + CurrentTree.deepDiveIntervalLimit);

        if (Date.now() - hangoutsForCurrentTree[hangoutsForCurrentTree.length - 1].dateJoined < CurrentTree.deepDiveIntervalLimit) {
          return false;
        }
      }
    }

    return true;
  }

  render() {
    const that = this;
    console.log(this.props.skillName);

    const deepdiveButtonClass = this.isDeepdiveAvailable() ? "btn-md btn-outline-inverse deep-dive-button" 
      : "btn-md btn-outline-inverse deep-dive-button-disabled";

    return (
      <div className="container-fluid progress-browser-wrap" id="skill-break-down">
        <div className="col-md-1">
          <div className="skill-breakdown-solidity">
            Solidity
          </div>
        </div>
        <div className="col-md-11">
          <div className="row">
            <div className="content-2-columns-left-title text-align-center">
              {this.props.skillName ? <span>{this.props.skillName}</span> : <span>Skill Breakdown</span> }
              <ActionLink className="skill-breakdown-control pull-right" id="button-arrow-back" onClick={()=> {this.handleClose()}}>
                <span className="glyphicon glyphicon-arrow-left"></span>
              </ActionLink>
            </div>
          </div>
          {!this.state.skillInfo &&
            <div className="row">
              <div className="col-lg-12">
                <h3>Skill not Found!!!</h3>
              </div>
            </div>
          }
          <div className="row">
            <div className="col-lg-12 text-align-center">
              <p>{this.state.skillInfo && this.state.skillInfo.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h4>Related Sub-Skills</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul id="related-topics">
                {this.state.skillInfo && this.state.skillInfo.relatedTopics[0].split(',').map(function(skill, i)
                {
                  const skillNameTrimmed = skill.trim();
                  return <li key={i}><ActionLink onClick={()=> that.updateSkill(skillNameTrimmed)}>{skillNameTrimmed}</ActionLink></li>
                })}
              </ul>
            </div>
          </div>
          <div className="deep-dive-button-wrap">
            <button type="button" className={deepdiveButtonClass}
                  onClick={this.isDeepdiveAvailable() ? ()=> this.toggleHangoutForm() : () => {}}>DeepDive</button>
          </div>
          <div className="row">
            {this.state.isHangoutFormVisible && 
              <HangoutSubmitForm skillInfo={this.state.skillInfo} onHandleStartHangout={(date) => this.handleStartHangout(date)}
              onTimeChange={(e)=>handleTimeChange(e)} toogleTrenScan={() => this.toggleTrendScannerComponent()} />}
          </div>
          <br/>
        </div>
          {this.state.TrendScannerComponentVisible && <div className="row">
            <div className="col-lg-12">
              <div id="skill-breakdown-trend-scanner">
                <TrendScannerComponent onHandleSelectCategory={(e) => this.handleSelectCategory(e)}
                  resultsSelectedCategory={this.props.resultsSelectedCategory}
                    isFetchInProgress={this.props.isFetchInProgress}
                      searchResults={this.props.searchResults}/>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

SkillBreakdown.propTypes = {
  userInteractionPush: PropTypes.func.isRequired,
  selectResultsCategory: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  resultsSelectedCategory: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  resultsSelectedCategory: state.resultsSelectedCategory,
  searchResults : state.searchResults,
  isFetchInProgress : state.isFetchInProgress,
});

const mapDispatchToProps = dispatch => ({
  userInteractionPush: bindActionCreators(userInteractionPush, dispatch),
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch),
  fetchResults: bindActionCreators(fetchResults, dispatch),
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillBreakdown);