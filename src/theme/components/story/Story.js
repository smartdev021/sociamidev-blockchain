/*
  Replacement of: src/theme/ProgressionTrees.js
*/

import React, { Component } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Skills from './Skills';
import ChallengeCard from './ChallengeCard';

import TaskTypes from '~/src/common/TaskTypes';

import { 
  fetchStories,
  fetchChallengesStory
} from '~/src/redux/actions/story';
import { saveTask } from '~/src/redux/actions/tasks';


const profilePic =
  'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';
  const RandomInt = function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

class Story extends Component {
  constructor (props) {
    super(props);

    this.state = {
      profilePic: this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic
    };
  }

  componentWillMount() {
    this.props.fetchStories();
    mixpanel.track("Enter Story page");
  }

  onSigup(data){
    let type = '';
    if(data._objective && data._objective.name == 'Decode'){
       type = TaskTypes.DECODE;
    } else if(data._objective && data._objective.name == 'Illuminate'){
      type = TaskTypes.ILLUMINATE;
    } else if(data._objective && data._objective.name == 'Deepdive'){
      type = TaskTypes.DEEPDIVE;
    }

    const signupData = {
      type,
      userName: `${this.props.userProfile.firstName} ${this.props.userProfile.lastName}`,
      userID: this.props.userProfile._id,
      isHidden: 0,
      creator: {
        _id: this.props.userProfile._id,
        firstName: this.props.userProfile.firstName,
        lastName: this.props.userProfile.lastName,
      },
      metaData: {
        subject: {
          roadmap: {
            name: '',
          },
          skill: {
            _id: data._id,
            name: data.skill,
          },
        },
        participants: [
          {
            user: {
              _id: this.props.userProfile._id,
              firstName: this.props.userProfile.firstName,
              lastName: this.props.userProfile.lastName,
            },
            status: 'accepted',
            isCreator: true,
          },
        ],
        ratings: [],
        time: Date.now(),
        awardXP: RandomInt(30, 40),
      },
    };
    this.props.saveTask(signupData);
  }

  renderSkillBox(skills) {
    return _.map(skills, skill => <Skills key={skill._id} data={skill} onSignup={(data) => this.onSigup(data)}/>)
  }

  getChallenges(){
    const listAchievementIds = this.props.userProfile.userAchievements ? 
        this.props.userProfile.userAchievements.achievements
        .filter(item => item.status == "Complete")
        .map(item => item.achievementId) : [];
    const data = {
       emailId: _.get(this, 'props.userProfile.email'),
       achievementIds: listAchievementIds
    }
    this.props.fetchChallengesStory(data);
  }

  componentDidMount(){
    this.getChallenges();
  }

  renderChallengesBox(challenges){
    return _.map(challenges, challenge => <ChallengeCard key={challenge._id} data={challenge} />);
  }

  render () {
    return (
      <div
        className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper stories-wrapper main-bg`}>
        <div className='row'>
          <div className='container'>
            <div className='row'>
              <div className='row'>
                <div className='col-middle ml-fixed'>
                  {this.renderSkillBox(this.props.fetchedSkills)}
                  {this.renderChallengesBox(this.props.challenges)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	isFetchingSkills: state.skills.isFetchingSkills,
  fetchedSkills: state.skills.skills,
  userProfile: state.userProfile.profile,
  challenges: state.skills.challengeStory
});

const mapDispatchToProps = dispatch => ({
  fetchStories: bindActionCreators(fetchStories, dispatch),
  saveTask: bindActionCreators(saveTask, dispatch),
  fetchChallengesStory: bindActionCreators(fetchChallengesStory, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Story));
