/*
    author: Alexander Zolotov
*/
import React from 'react';
import 'url-search-params-polyfill';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal';
import { Redirect } from 'react-router'

import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import Axios from 'axios'
import ConfigMain from '~/configs/main'

import {
  saveTask,
} from '~/src/redux/actions/tasks'

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

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import Countdown from 'react-countdown-now';

class SkillBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     skillInfo: undefined,
     isHangoutFormVisible: false,
     TrendScannerComponentVisible: false,
     isIlluminateFormVisible: false,
     IsDisplayForm:'block',
     redirectToTaskManagement: false,
     timeNow: Date.now(),
     isLoading: true,
     tree: this.props.location.state.tree
    }
    this.modalDefaultStyles = {};

    this.timeNowUpdateInterval = undefined;
  }

  updateTimeNow() {
    this.setState({timeNow: Date.now()});
  }

  isTreeAdded() {
    const CurrentTree = this.state.tree;

    return this.props.userProfile.progressionTrees.find((tree) => {
      return tree._id == CurrentTree._id;
    });
  }

  componentWillMount() {
    const URLParams = new URLSearchParams(this.props.location.search);
    const name = URLParams.get("name");

    if (name) {
      this.updateSkill(name);
    }
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.border = "none";
      Modal.defaultStyles.content.background = "transparent";
      Modal.defaultStyles.content.overflow = "visible";
      Modal.defaultStyles.content.padding = "0";
      Modal.defaultStyles.content["maxWidth"] = "300px";
      Modal.defaultStyles.content["minHeight"] = "300px";
      Modal.defaultStyles.content["marginLeft"] = "auto";
      Modal.defaultStyles.content["marginRight"] = "auto";
      Modal.defaultStyles.content["left"] = "0px";
      Modal.defaultStyles.content["top"] = "100px";
      Modal.defaultStyles.content["right"] = "0px";
  }

  componentDidMount() {
    this.timeNowUpdateInterval = setInterval(() => this.updateTimeNow(), 1000);
  }

  componentWillUnmount() {
      clearInterval(this.timeNowUpdateInterval);
      Modal.defaultStyles = this.modalDefaultStyles;
  }

  updateSkill(name) {
    const url = `${ConfigMain.getBackendURL()}/skillGet?name=${name}`;
    const that = this;
    that.setState( {isLoading: true, isHangoutFormVisible: false} );
    
    Axios.get(url)
      .then(function(response) {
        that.setState( {skillInfo: response.data, isLoading: false} );
    })
    .catch(function(error) {
      that.setState( {skillInfo: undefined, isLoading: false} );
    });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.location.search != this.props.location.search) {
      const URLParams = new URLSearchParams(this.props.location.search);
      const name = URLParams.get("name");

      if (name) {
        this.updateSkill(name);
      }
    }

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

  toggleIlluminateForm() {
    this.setState( { isIlluminateFormVisible: true } );
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

    const CurrentTree = this.state.tree;

    const hangout = {
      name: `Hangout for roadmap "${CurrentTree.name}"`,
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
            _id: CurrentTree._id,
            name: CurrentTree.name,
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
  }

  handleClose() {
    if (this.props.userProfile && this.props.userProfile._id && this.state.skillInfo) {
      this.props.userInteractionPush(this.props.userProfile._id, 
        UserInteractions.Types.PAGE_CLOSE, 
        UserInteractions.SubTypes.SKILL_VIEW, 
        { 
          skillId: this.state.skillInfo._id,
        }
      );
    }

    this.props.history.goBack();
  }

  handleToggle() {
    this.setState({IsDisplayForm:'none'});
  }

  lastIlluminateDateAnswered() {
    let LatestIlluminateDateAnswered = undefined;

    if (this.props.userProfile.illuminates && this.props.userProfile.illuminates.length > 0) {
      const CurrentTree = this.state.tree;
      let illuminatessForCurrentTree = this.props.userProfile.illuminates.filter((illuminate) => {
        return illuminate.treeId == CurrentTree._id;
      });

      if (illuminatessForCurrentTree.length > 0) {
        illuminatessForCurrentTree.sort((a, b) => {
          return a.dateJoined - b.dateJoined;
        });

        LatestIlluminateDateAnswered = illuminatessForCurrentTree[illuminatessForCurrentTree.length - 1].dateJoined;
      }
    }

    return LatestIlluminateDateAnswered;
  }

  lastHangoutDateJoined() {
    let LatestHangoutDateJoined = undefined;

    if (this.props.userProfile.hangouts && this.props.userProfile.hangouts.length > 0) {
      const CurrentTree = this.state.tree;
      let hangoutsForCurrentTree = this.props.userProfile.hangouts.filter((hangout) => {
        return hangout.treeId == CurrentTree._id;
      });

      if (hangoutsForCurrentTree.length > 0) {
        hangoutsForCurrentTree.sort((a, b) => {
          return a.dateJoined - b.dateJoined;
        });

        LatestHangoutDateJoined = hangoutsForCurrentTree[hangoutsForCurrentTree.length - 1].dateJoined;
      }
    }

    return LatestHangoutDateJoined;
  }

  onCloseModal() {
    this.setState({isIlluminateFormVisible: false});
  }

  goToIlluminate(e){
    e.preventDefault();
    // TODO call hangout-ish

    const RandomInt = function RandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const CurrentTree = this.state.tree;

    const illuminate = {
      name: `Illuminate for roadmap "${CurrentTree.name}"`,
      description: `Illuminate for roadmap "${CurrentTree.name}"`,
      type: TaskTypes.ILLUMINATE,
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
            _id: CurrentTree._id,
            name: CurrentTree.name,
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
        ],
        ratings: [],
        awardXP: RandomInt(30, 40),
      }
    };

    if (illuminate.userName != "" && illuminate.name != "" && illuminate.description != "") {
      this.props.saveTask(illuminate);
    }
    this.setState({redirectToTaskManagement: true});
  }

  render() {
    if (this.state.isLoading) {
      return (
      <div className="container-fluid progress-browser-wrap" id="skill-break-down">
        <div className="col-md-1">
          <div className="skill-breakdown-solidity">
            Loading...<Icon spin name="spinner" />
          </div>
        </div>
      </div>);
    }

    const that = this;
    const { redirectToTaskManagement } = this.state;

    const LatestHangoutDateJoined = this.lastHangoutDateJoined();
    const LatestIlluminateDateAnswered = this.lastIlluminateDateAnswered();
    const CurrentTree = this.state.tree;

    const IsDeepdiveAbailable = !LatestHangoutDateJoined || this.state.timeNow - LatestHangoutDateJoined >= CurrentTree.deepDiveIntervalLimit;
    const IsIlluminateAvailable = !LatestIlluminateDateAnswered || this.state.timeNow - LatestIlluminateDateAnswered >= CurrentTree.deepDiveIntervalLimit;
    const DeepDiveButtonText = !IsDeepdiveAbailable ? 
      <span><span>DeepDive </span><Countdown daysInHours={false} date={LatestHangoutDateJoined + CurrentTree.deepDiveIntervalLimit} /></span> 
      : <span>DeepDive</span>;

      const IlluminateButtonText = !IsIlluminateAvailable ? 
      <span><span>Illuminate </span><Countdown daysInHours={false} date={LatestIlluminateDateAnswered + CurrentTree.deepDiveIntervalLimit} /></span> 
      : <span>Illuminate</span>;
    
    const DeepdiveButtonClass = IsDeepdiveAbailable ? "btn-md btn-outline-inverse deep-dive-button" 
      : "btn-md btn-outline-inverse deep-dive-button-disabled";

    const IlluminateButtonClass = IsIlluminateAvailable ? "btn-md btn-outline-inverse illuminate-button" 
      : "btn-md btn-outline-inverse illuminate-button-disabled";

    if (redirectToTaskManagement) {
      return <Redirect to='/taskManagement'/>;
    }
    return (
      <div className="skill-break-down"> 
        <div className="skill-browser-header row">
          {this.state.skillInfo.skill ? <h3 className="my-progress-heading pull-left">{this.state.skillInfo.skill}</h3> : <span>Skill Breakdown</span> }
          <ActionLink className="skill-breakdown-control pull-right" id="button-arrow-back" onClick={()=> {this.handleClose()}}>
            <span className="glyphicon glyphicon-arrow-left"></span>
          </ActionLink>
        </div>
        <div className="skill-browser-desc row">
          <p>{this.state.skillInfo && this.state.skillInfo.description}</p>
        </div>
        <br />
        <div className="related-subskills-header row">
          RELATED SUB-SKILLS
        </div>
        <div id="related-topics row">
          {this.state.skillInfo && this.state.skillInfo.relatedTopics[0].split(',').map(function(skill, i)
          {
            const skillNameTrimmed = skill.trim();
            return (
              <div className="row" key={i}>
                <span className="fa fa-circle-o" style={{color:'red'}}></span>
                <Link className="related-topic" key={i} to={{pathname:`/skillBrowser`, state: that.props.location.state, search:`?name=${skillNameTrimmed}`}}>{skillNameTrimmed}</Link>
              </div>
            )
          })}
        </div>
        <br />
        <div className="skill-browser-header row" style={{borderBottom:'1px solid #868686'}}>
          <h3 className="my-progress-heading pull-left">MY PROGRESSION SKILL</h3>
        </div>
        <div className="my-progression-skillset row">
        <div className="col-md-3 col-sm-6 col-xs-12 pskill-card-item">
                <div className="pskill-card">
                    <div className="pskill-card-body">
                        <h4 className="pskill-card-title">1</h4>
                        <h4 className="pskill-card-subtitle">level</h4>
                        <h3 className="pskill-card-heading">ILLUMINATE</h3>
                        <p className="pskill-card-text">Lorem ipsum dolor sit amet, ut eos stet 
                        incorrupte. Ius modus oportere ea, et mollis eligendi</p>
                        <p className="pskill-duration">Once a day</p>
                        <p className="pskill-reward">Reward : SOQQ Token</p>
                    </div>
                    <div className="pskill-btn-group">
                      <button className="pskill-start">START</button>
                      <button className="pskill-view ">VIEW</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 pskill-card-item">
                <div className="pskill-card">
                    <div className="pskill-card-body">
                        <h4 className="pskill-card-title">1</h4>
                        <h4 className="pskill-card-subtitle">level</h4>
                        <h3 className="pskill-card-heading">DEEP DIVE</h3>
                        <p className="pskill-card-text">Lorem ipsum dolor sit amet, ut eos stet 
                        incorrupte. Ius modus oportere ea, et mollis eligendi</p>
                        <p className="pskill-duration">Once a day</p>
                        <p className="pskill-reward">Reward : SOQQ Token</p>
                    </div>
                    <div className="pskill-btn-group">
                      <button className="pskill-start btn">START</button>
                      <button className="pskill-view ">VIEW</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 pskill-card-item">
                <div className="pskill-card">
                    <div className="pskill-card-body">
                        <h4 className="pskill-card-title">5</h4>
                        <h4 className="pskill-card-subtitle">level</h4>
                        <h3 className="pskill-card-heading">DECODE</h3>
                        <p className="pskill-card-text">Lorem ipsum dolor sit amet, ut eos stet 
                        incorrupte. Ius modus oportere ea, et mollis eligendi</p>
                        <p className="pskill-duration">Once a day</p>
                        <p className="pskill-reward">Reward : SOQQ Token</p>
                    </div>
                    <div className="pskill-btn-group">
                      <button className="pskill-start btn">START</button>
                      <button className="pskill-view ">VIEW</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 pskill-card-item">
                <div className="pskill-card">
                    <div className="pskill-card-body">
                        <h4 className="pskill-card-title">6</h4>
                        <h4 className="pskill-card-subtitle">level</h4>
                        <h3 className="pskill-card-heading">BRAINSTORM</h3>
                        <p className="pskill-card-text">Lorem ipsum dolor sit amet, ut eos stet 
                        incorrupte. Ius modus oportere ea, et mollis eligendi</p>
                        <p className="pskill-duration">Once a day</p>
                        <p className="pskill-reward">Reward : SOQQ Token</p>
                    </div>
                    <div className="pskill-btn-group">
                      <button className="pskill-start btn">START</button>
                      <button className="pskill-view ">VIEW</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 pskill-card-item">
                <div className="pskill-card">
                    <div className="pskill-card-body">
                        <h4 className="pskill-card-title">5</h4>
                        <h4 className="pskill-card-subtitle">level</h4>
                        <h3 className="pskill-card-heading">DECODE</h3>
                        <p className="pskill-card-text">Lorem ipsum dolor sit amet, ut eos stet 
                        incorrupte. Ius modus oportere ea, et mollis eligendi</p>
                        <p className="pskill-duration">Once a day</p>
                        <p className="pskill-reward">Reward : SOQQ Token</p>
                    </div>
                    <div className="pskill-btn-group">
                      <button className="pskill-start btn">START</button>
                      <button className="pskill-view ">VIEW</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

SkillBrowser.propTypes = {
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
  searchResults : state.searchResults,saveTask,
  isFetchInProgress : state.isFetchInProgress,
});

const mapDispatchToProps = dispatch => ({
  userInteractionPush: bindActionCreators(userInteractionPush, dispatch),
  selectResultsCategory: bindActionCreators(selectResultsCategory, dispatch),
  fetchResults: bindActionCreators(fetchResults, dispatch),
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
  saveTask: bindActionCreators(saveTask, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillBrowser);