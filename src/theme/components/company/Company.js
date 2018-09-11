import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import Team from './Team';
import '~/src/theme/css/darkTheme.css';
import '~/src/theme/css/lightTheme.css';
import '~/src/theme/css/teams.css';

import { updateCompany } from '~/src/redux/actions/company';
import { fetchTeams, addNewTeam, saveTeam, addTeamEmail, updateTeamEmail, deleteTeam, cancelTeam } from '~/src/redux/actions/teams';
import { fetchAchievements, addAchievementGroup, updateAchievementGroup } from '~/src/redux/actions/achievements';
import { fetchRoadmapsFromAdmin } from '~/src/redux/actions/roadmaps';
import { fetchStories } from '~/src/redux/actions/story';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addToTeam: {},
      achievements: [],
      achievementGroups: [],
      currentAchievementGroup: undefined,
      roadmaps: [],
      skills: []
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleTeamSave = this.handleTeamSave.bind(this);
    this.handleEmailAdd = this.handleEmailAdd.bind(this);
    this.handleTeamDelete = this.handleTeamDelete.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeams();
    this.props.fetchAchievements();
    this.props.fetchRoadmapsFromAdmin();
    this.props.fetchStories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFetchingAchievementGroups && !this.props.isFetchingAchievementGroups) {
      let achievementGroups = this.props.achievementGroups;
      _.each(achievementGroups, (record) => {
        _.set(record, 'key', _.get(record, '_id', ''));
        _.set(record, 'company', _.get(record, '_company'))
        _.set(record, 'achievements', _.get(record, '_achievements', []));
      })
      this.setState({ achievementGroups });
      let currentAchievementGroup = undefined;
      if(!this.state.currentAchievementGroup) {
        try {
          currentAchievementGroup = _.find(achievementGroups, group => {
            if(group.company) {
              return group.company._id == this.props.company._id || group.company.name == this.props.company.name;
            }
          });
        } catch(exp) {
        }
      }

      if(!currentAchievementGroup) {
        this.props.addAchievementGroup(this.props.company.name);
      } else if(currentAchievementGroup._id != 0) {
        this.setState({ currentAchievementGroup });
        let achievements = currentAchievementGroup.achievements;
        if(achievements) {
          _.each(achievements, (record) => {
            _.set(record, 'key', _.get(record, '_id', ''));
          });
          this.setState({ achievements });
        }
      }
    }
    if (prevProps.isFetchingRoadmaps && !this.props.isFetchingRoadmaps) {
      this.setState({ roadmaps: this.props.roadmaps });
    }
    if (prevProps.isFetchingSkills && !this.props.isFetchingSkills) {
      this.setState({ skills: this.props.skills });
    }
    if (prevProps.isAddingAchievementGroup && !this.props.isAddingAchievementGroup) {
      let currentAchievementGroup = this.props.getAchievementGroup;
      currentAchievementGroup['key'] = currentAchievementGroup._id;
      _.set(currentAchievementGroup, '_company', this.props.company._id);

      this.setState({ currentAchievementGroup });
      this.props.updateAchievementGroup(currentAchievementGroup);
    }
    if (prevProps.isUpdatingAchievementGroup && !this.props.isUpdatingAchievementGroup) {
      const newData = [...this.state.achievementGroups];
      let currentAchievementGroup = this.state.currentAchievementGroup;
      _.set(currentAchievementGroup, 'company', this.props.company);
      this.setState({ currentAchievementGroup });
      let achievements = currentAchievementGroup.achievements;
      if(achievements) {
        _.each(achievements, (achievement) => {
          _.set(achievement, 'key', _.get(achievement, '_id', ''));
        });
        this.setState({ achievements });
      }

      this.setState({ achievementGroups: [currentAchievementGroup, ...newData] });
    }
  }

  handleCancel(index, team) {
    this.props.cancelTeam(index, team);
  }

  handleTeamSave(index, team) {
    this.props.saveTeam(index, team);
  }

  handleEmailAdd(index, email, team) {
    this.props.addTeamEmail(index, email, team);
  }

  handleEmailUpdate(emailIndex, prevEmail, newEmail, team) {
    this.props.updateTeamEmail(emailIndex, prevEmail, newEmail, team);
  }

  handleTeamDelete(index, _id) {
    this.props.deleteTeam(index, _id);
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
	isUpdatingCompany: state.company.isUpdatingCompany,
	company: state.company.company,
	isFetchingTeams: state.teams.isFetchingTeams,
	teams: state.teams.data,
	isFetchingAchievementGroups: state.achievements.isFetchingAchievements,
	achievementGroups: state.achievements.data,
	isAddingAchievementGroup: state.addAchievementGroup.isAddingAchievementGroup,
	getAchievementGroup: state.addAchievementGroup.data,
	isUpdatingAchievementGroup: state.updateAchievementGroup.isUpdatingAchievementGroup,
	isFetchingRoadmaps: state.roadmapsAdmin.isFetching,
	roadmaps: state.roadmapsAdmin.data,
	isFetchingSkills: state.skills.isFetchingSkills,
	skills: state.skills.data
});

const mapDispatchToProps = dispatch => ({
  updateCompany: bindActionCreators(updateCompany, dispatch),
  fetchTeams: bindActionCreators(fetchTeams, dispatch),
  addNewTeam: bindActionCreators(addNewTeam, dispatch),
  cancelTeam: bindActionCreators(cancelTeam, dispatch),
  saveTeam: bindActionCreators(saveTeam, dispatch),
  addTeamEmail: bindActionCreators(addTeamEmail, dispatch),
  updateTeamEmail: bindActionCreators(updateTeamEmail, dispatch),
  deleteTeam: bindActionCreators(deleteTeam, dispatch),
  fetchAchievements: bindActionCreators(fetchAchievements, dispatch),
  addAchievementGroup: bindActionCreators(addAchievementGroup, dispatch),
  updateAchievementGroup: bindActionCreators(updateAchievementGroup, dispatch),
  fetchRoadmapsFromAdmin: bindActionCreators(fetchRoadmapsFromAdmin, dispatch),
  fetchStories: bindActionCreators(fetchStories, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Company));
