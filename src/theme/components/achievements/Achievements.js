import React, { Component } from 'react';
import LeftNav from '~/src/theme/components/achievements/LeftNav';
import ConfigMain from '~/configs/main';
import Axios from 'axios';

import blockChainIcon from '../../../../assets/img/network.png'

const profilePic =
  'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class Achievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAchievementTemp: {},
      currentCompany: 0,
      currentAchievementsGroup: 0,
    };
  }

  componentDidMount() {
    this.fetchAllAchievementsTemp();
  }

  fetchAllAchievementsTemp() {
    Axios(`${ConfigMain.getBackendURL()}/userAchievementTemp`)
      .then(response => {
        this.setState({ userAchievementTemp: response.data });
      })
      .catch(err => {});
  }

  onLeftNavCompanyClick(index, e) {
    this.setState({ currentCompany: index, currentAchievementsGroup: 0 });
  }
  onAchievementGroupNameClick(index, e) {
    this.setState({ currentAchievementsGroup: index });
  }

  getProgress(achievement) {
    let achievementInfo = this.props.userProfile.userAchievements.achievements.filter(
        info => info.achievementId === achievement._id,
      );
    if (achievementInfo.length > 0 && achievementInfo[0].status) {
    return (
      <p className="ach-complete">
       COMPLETE
       </p>
      );
    } else {
    return (
      <p className="ach-in-progress">
       IN PROGRESS
       </p>
      );
    }
  }

  renderAchievementsGroupsByCompany() {
    const { currentAchievementsGroup } = this.state;
    let groups = this.getAchievementGroupsByCompany();

    return (
      <ul>
        {groups.map((group, index) => {
          return (
            <li
              key={ index }
              onClick={this.onAchievementGroupNameClick.bind(this, index)}
              className={currentAchievementsGroup === index ? 'active' : ''}
            >
              {group.name}
            </li>
          );
        })}
      </ul>
    );
  }

  renderAchievementsByAchievementsGroup() {
    const { currentAchievementsGroup } = this.state;

    const groups = this.getAchievementGroupsByCompany();
    if (!groups || !groups.length) {
      return <ul />;
    }
    const currentAchievementsGroupData = groups.filter((group, index) => index === currentAchievementsGroup);
    const achievementsByAchievementsGroup =
      currentAchievementsGroupData &&
      currentAchievementsGroupData.length &&
      currentAchievementsGroupData[0].achievements &&
      currentAchievementsGroupData[0].achievements.length
        ? currentAchievementsGroupData[0].achievements
        : [];

    const blockChainIconStyle = {
      position: 'absolute',
      marginLeft: '38%',
      marginTop: '-12px'
    };

    return (
      <ul>
        {achievementsByAchievementsGroup.map(achievement => {
          return (
            <li key={ achievement._id }>
            {achievement.blockChain ? <img src={blockChainIcon} alt="" style={blockChainIconStyle} /> : null};
              <div className="img-icon">
                <img
                  src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/achievementImages/${achievement._id}`}
                  alt=""
                />
              </div>
              
              <h4>{achievement.name}</h4> 
              <p>{achievement.result}</p>
              {this.getProgress(achievement)}
              {achievement.conditions.map(requirement => {
                return (
                  <a key={ requirement._id } href="#">
                    {requirement.count} {requirement.taskType} {requirement.type}
                  </a>
                );
              })}
            </li>
          );
        })}
      </ul>
    );
  }

  getAllGroups() {
    return this.state.userAchievementTemp && this.state.userAchievementTemp.achievementsData
      ? this.state.userAchievementTemp.achievementsData
      : [];
  }

  getAchievementGroupsByCompany() {
    const { currentCompany } = this.state;
    const allGroups = this.getAllGroups();
    let groups = [];

    switch (currentCompany) {
      case 0:
      case 1:
      case 2:
        groups = allGroups;
        break;
      default:
        const company = this.getTempCompaniesNavData().filter((company, index) => index === currentCompany);

        const companyId = company && company.length && company[0]._id ? company[0]._id : '';

        if (!companyId) {
          groups = allGroups;
          break;
        }

        groups = allGroups.filter(group => {
          return group && group.company && group.company.length && group.company[0]._id === companyId;
        });

        break;
    }

    return groups;
  }

  getTempCompaniesNavData() {
    const dbCompaniesData =
      this.state.userAchievementTemp &&
      this.state.userAchievementTemp.companies &&
      this.state.userAchievementTemp.companies.length
        ? this.state.userAchievementTemp.companies
        : [];

    const data = [
      {
        // static left nav
        index: 0,
        name: 'All',
      },
      {
        index: 1,
        name: 'General',
      },
      {
        index: 2,
        name: 'House',
      },
    ];

    dbCompaniesData.forEach((dbCompany, index) => {
      data.push({
        ...dbCompany,
        index: index + 3,
      });
    });

    return data;
  }

  render() {
    const { currentCompany, currentAchievementsGroup } = this.state;
    const tempCompaniesNavData = this.getTempCompaniesNavData();
    let currentCompanyDescription = tempCompaniesNavData.filter((company, index) => index === currentCompany);

    currentCompanyDescription = currentCompanyDescription[0].name;

    return (
      <div
        className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper mychallenges-wrapper profile-wrapper main-bg`}
      >
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <LeftNav
                  onLeftNavCompanyClick={this.onLeftNavCompanyClick.bind(this)}
                  currentCompany={currentCompany}
                  currentAchievementsGroup={currentAchievementsGroup}
                  tempCompaniesNavData={tempCompaniesNavData}
                  userProfile={this.props.userProfile}
                  profilePic={
                    this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic
                  }
                />

                <div className="col-middle ml-fixed">
                  <div className="achievements-wrapper">
                    <div className="row">
                      <div className="col-md-12 col-lg-5">
                        <h2>{currentCompanyDescription}</h2>
                      </div>
                      <div className="col-md-12 col-lg-7">
                        <div className="prograss">
                          <span style={{ width: '85%' }}>85%</span>
                        </div>
                        <a href="#" className="btn-lavel-yellow">
                          +1000 SOQQ
                        </a>
                      </div>
                    </div>
                    <div className="top-box">{this.renderAchievementsGroupsByCompany()}</div>
                    <div className="bottom-box">{this.renderAchievementsByAchievementsGroup()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Achievements;
