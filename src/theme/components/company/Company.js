import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfigMain from '~/configs/main';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Axios from 'axios';
import Pagination from 'react-js-pagination';         
import { message, Table, Button, Icon, Upload} from 'antd';
import Img from 'react-image';
import Textarea from 'react-textarea-autosize';
import nl2br from 'nl2br';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import AchievementGroup from './AchievementGroup';
import Team from './Team';
import '~/src/theme/css/darkTheme.css';
import '~/src/theme/css/lightTheme.css';
import '~/src/theme/css/teams.css';
import '~/src/theme/css/company.css';

import { updateCompany } from '~/src/redux/actions/company';
import { fetchTeams, addNewTeam, saveTeam, addTeamEmail, updateTeamEmail, deleteTeam, cancelTeam } from '~/src/redux/actions/teams';
import { fetchAchievements, addAchievementGroup, updateAchievementGroup } from '~/src/redux/actions/achievements';
import { fetchRoadmapsFromAdmin } from '~/src/redux/actions/roadmaps';
import { fetchStories, updateStory, saveStory, deleteStory } from '~/src/redux/actions/story';

import plus from "~/src/theme/images/plus.png";
import cross from "~/src/theme/images/cross.png";
import cloud from "~/src/theme/images/cloud.png";
import deleteimg from "~/src/theme/images/delete.png";
import undoimg from "~/src/theme/images/undo.png";
import Challenges from '~/src/theme/components/challenges/Challenges';

import RightSection from '~/src/theme/components/homepage/RightSection';
import MyChallenges from '~/src/theme/components/challenges/MyChallenges';
import AddChallenge from '~/src/theme/components/challenges/AddChallenge';
import ApproveChallenge from '~/src/theme/components/challenges/ApproveChallenge';
import ThemeSettings from './ThemeSettings';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddEmailExpanded: false,
      addEmail: "",
      addEmailError: false,
      company: props.company,
      addTeamGroupActive: false,
      addTeamGroup: "Select",
      addToTeam: {},
      achievements: [],
      achievementGroups: [],
      companyAchievementGroups: [],
      currentAchievementGroup: undefined,
      roadmaps: [],
      skills: [],
      IsQuestionsOpen: 'none',
      IsAchievementOpen: 'block',
      IsChallengeOpen: 'none',
	  IsStoryOpen: 'none',
      questions: [],
      activePage: 1,
      activeStoryPage: 1,
      questionCount: 10,
      currentPage: "MyChallenges",
    storiesData: [],
    storiesDataBackup: [],
      storiesCount: 10,
      editableStoryKey: "",
      editableStoryIndex: "",
      selectedStoryKeys: [],
      IsSettingsOpen:'none'
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleTeamSave = this.handleTeamSave.bind(this);
    this.handleEmailAdd = this.handleEmailAdd.bind(this);
    this.handleTeamDelete = this.handleTeamDelete.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.addCompanyEmail = this.addCompanyEmail.bind(this);
    this.deleteCompanyEmail = this.deleteCompanyEmail.bind(this);
    this.toggleQuestionsOption = this.toggleQuestionsOption.bind(this);
    this.toggleAchievementOption = this.toggleAchievementOption.bind(this);
    this.toggleChallengesOption = this.toggleChallengesOption.bind(this);
    this.toggleStoryOption = this.toggleStoryOption.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.onHandleUploadStoryImg = this.onHandleUploadStoryImg.bind(this);
    this.onClickEditable = this.onClickEditable.bind(this);
    this.handleStoryDataChange = this.handleStoryDataChange.bind(this);
    this.handleStoryInputClick = this.handleStoryInputClick.bind(this);
    this.undoStoryData = this.undoStoryData.bind(this);
    this.addStory = this.addStory.bind(this);
    this.removeStory = this.removeStory.bind(this);
    this.deleteQuestions = this.deleteQuestions.bind(this);
    this.setSelectedStory = this.setSelectedStory.bind(this);
    this.toggleSettingsOption = this.toggleSettingsOption.bind(this);
  }

  togglePage(page) {
    this.setState({
      currentPage: page
    });
  }

  componentWillMount() {
    mixpanel.track("View Company");
    this.props.fetchTeams();
    this.props.fetchAchievements();
    this.props.fetchRoadmapsFromAdmin();
    this.props.fetchStories();
  }
  componentDidMount(){
    this.getQuestions();
    this.getStories();
  }

  handleChallengeSubmit() {
    var that = this;
      const url = `${ConfigMain.getBackendURL()}/challenges`
        Axios.get(url).then(function(response) {
      if (response.data){
        that.setState({ challenges: response.data })
      }
    }).catch(function(error) { console.log(error) });

    this.setState({
      currentPage: "MyChallenges"
    });
  }

  handleChallengeClose() {
    this.setState({
      currentPage: "MyChallenges"
    });
  }

  section() {
    switch(this.state.currentPage) {
      case "MyChallenges":
        return (
          <div className="col-middle ml-fixed">
            <div className="row">
              <div className="col-sm-5">
                <h3>My Challenges</h3>
              </div>
              <div className="col-sm-7 text-right">
                <button className="yellow-btn" onClick={ () => this.togglePage("AddChallenge") }>+ Add challenge</button>
                <button className="pur-btn" onClick={ () => this.togglePage("ApproveChallenge") }>Approve submission</button>
              </div>
            </div>

            <MyChallenges challenges={this.state.challenges} />
          </div>
        );
      case "AddChallenge":
        return <AddChallenge onClose={() => this.handleChallengeClose()} onSubmit={() => this.handleChallengeSubmit()} />;
      case "ApproveChallenge":
        return <ApproveChallenge onClose={() => this.handleChallengeClose()} profilePic={this.state.profilePic} />;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFetchingAchievementGroups && !this.props.isFetchingAchievementGroups) {
      let achievementGroups = this.props.achievementGroups;
      let companyAchievementGroups = [];
      _.each(achievementGroups, (group) => {
        _.set(group, 'key', _.get(group, '_id', ''));
        _.set(group, 'company', _.get(group, '_company'))
        _.set(group, 'achievements', _.get(group, '_achievements', []));

        if(group.company && (group.company._id == this.props.company._id || group.company.name == this.props.company.name)) {
          companyAchievementGroups.push(group);
        }
      })
      this.setState({ achievementGroups, companyAchievementGroups });
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
      let companyAchievementGroups = [...this.state.companyAchievementGroups];
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

      this.setState({ achievementGroups: [currentAchievementGroup, ...newData], companyAchievementGroups: [currentAchievementGroup, ...companyAchievementGroups] });
    }
  }
  getQuestions(){
    const that = this;
    const url = `${ConfigMain.getBackendURL()}/questionsGetAll`
        Axios.get(url, {params: {
          page: 1
        }}
    ).then(function(response) {
      if (response.data.listQuestion){
        that.setState({ questions: response.data.listQuestion, questionCount: response.data.total })
      }
    }).catch(function(error) { console.log(error) });
    
  }

  getStories(){
    const that = this;
    const url = `${ConfigMain.getBackendURL()}/storiesGet`
    Axios.get(url, {params: {
      page: 1
    }}
    ).then(function(response) {
      if (response.data && response.data.lstStories) {
        that.setState({ storiesData: response.data.lstStories, storiesDataBackup: response.data.lstStories, storiesCount: response.data.totalStories });
      }

    }).catch(function(error) { console.log(error) });
    
  }
  // Upload questions
  uploadFile() {

    let data = new FormData();
    let fileData = this.fileUpload.files[0];
    data.append("csv", fileData);
    const hide = message.loading('Upload question in progress..', 0);
      fetch(ConfigMain.getBackendURL() + '/addQuestionsFile', {
        method: "POST",
        body: data
        })
      .then(record => record.json())
      .then((record) => {
            this.getQuestions();
            setTimeout(hide, 100);
            message.success(`${record.status} Questions uploaded!`);
          }).catch((record) => {
            setTimeout(hide, 100);
            message.error(record.statusText);
          });
  }

  toggleAddTeamGroupState() {
    this.setState({
      addTeamGroupActive: !this.state.addTeamGroupActive
    });
  }
  toggleQuestionsOption(){
    this.setState({IsQuestionsOpen: 'block',IsAchievementOpen: 'none', IsStoryOpen: 'none', IsChallengeOpen: 'none',IsSettingsOpen:'none' });
  }
  toggleAchievementOption(){
    this.setState({ IsQuestionsOpen: 'none', IsAchievementOpen: 'block', IsStoryOpen: 'none', IsChallengeOpen: 'none',IsSettingsOpen:'none' });
  }
  toggleChallengesOption() {
    var that = this;
    if (!this.state.challenges){
      const url = `${ConfigMain.getBackendURL()}/challenges`
        Axios.get(url).then(function(response) {
      if (response.data){
        that.setState({ challenges: response.data })
      }
    }).catch(function(error) { console.log(error) });
    }
    this.setState({ IsQuestionsOpen: 'none', IsStoryOpen:'none', IsChallengeOpen: 'block', IsAchievementOpen: 'none', currentPage: "MyChallenges",IsSettingsOpen:'none' });
   }
	toggleStoryOption(){
    this.setState({IsStoryOpen: 'block', IsAchievementOpen: 'none', IsQuestionsOpen: 'none', IsChallengeOpen: 'none',IsSettingsOpen:'none'})
  }
  selectAddTeamGroup(addTeamGroup) {
    this.setState({
      addTeamGroupActive: !this.state.addTeamGroupActive,
      addTeamGroup
    });
  }
  toggleSettingsOption() {
    this.setState({
      IsQuestionsOpen: 'none',
      IsStoryOpen:'none',
      IsChallengeOpen: 'none',
      IsAchievementOpen: 'none',
      IsSettingsOpen: 'block',
    });
  }

  renderAddTeamGroupSelect(options) {
    return (
      <div className="custom-select company-select">
        <select>
          {options.map((selectGroup, i) => {
            return(
              <option value={ selectGroup.value } key={ i }>{ selectGroup.label }</option>
            )
          })}
        </select>
        <div
          className={ this.state.addTeamGroupActive ? 'select-selected select-arrow-active' : 'select-selected' }
          onClick={ () => this.toggleAddTeamGroupState() }>
          { this.state.addTeamGroup }
        </div>

        <div
          className={ !this.state.addTeamGroupActive ? 'select-items select-hide' : 'select-items' }>
          {options.map((selectGroup, i) => {
            return(
              <div
                onClick={ () => this.selectAddTeamGroup(selectGroup.label) } key={ i }>
                { selectGroup.label }
              </div>
            )
          })}
        </div>
      </div>
    );
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

  validateEmail(email) {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{2,9}[\.][a-z]{2,5}/g;
    return pattern.test(email);
  }

  toggleAddEmailExpanded() {
    this.setState({ addEmailError: false, isAddEmailExpanded: !this.state.isAddEmailExpanded });
  }

  setEmailAddress(e) {
    this.setState({ addEmailError: false, addEmail: e.target.value });
  }

  addCompanyEmail() {
    let validEmail = this.validateEmail(this.state.addEmail.trim());
    if(validEmail) {
      this.setState({ addEmailError: false, addEmail: "" });
      let emails = this.state.company.emails;
      emails.push(this.state.addEmail);
      _.set(this, 'state.company.emails', emails);
      let company = this.state.company;
      this.props.updateCompany(company);
    } else {
      this.setState({ addEmailError: true });
    }
  }

  deleteCompanyEmail(email) {
    let emails = this.state.company.emails;
    _.remove(emails, e => e === email);
    _.set(this, 'state.company.emails', emails);
    let company = this.state.company;
    this.props.updateCompany(company);
  }

  renderAchievementGroups(achievementGroups) {
    let groups = achievementGroups.map((group, index) => {
      return <AchievementGroup
        key={group._id}
        index={index}
        group={group}
        company={this.state.company}
        achievements={this.state.achievements}
        achievementGroups={this.state.achievementGroups}
        companyAchievementGroups={this.state.companyAchievementGroups}
        currentAchievementGroup={this.state.currentAchievementGroup}
        roadmaps={this.state.roadmaps}
        skills={this.state.skills} />;
    });
    return groups;
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    const that = this;
    const url = `${ConfigMain.getBackendURL()}/questionsGetAll`;
    Axios.get(url, {params: {
          page: pageNumber,
        }}
    ).then(function(response) {
      if (response.data.listQuestion){
        that.setState({ questions: response.data.listQuestion, questionCount: response.data.total })
      }
    }).catch(function(error) { console.log(error) });
  }

  handlePageStoryChange(pageNumber) {
    this.setState({ activeStoryPage: pageNumber });
    const that = this;
    const url = `${ConfigMain.getBackendURL()}/storiesGet`;
    Axios.get(url, {params: {
          page: pageNumber,
        }}
    ).then(function(response) {
      if (response.data && response.data.lstStories) {
        that.setState({ storiesData: response.data.lstStories, storiesCount: response.data.totalStories });
      }
    }).catch(function(error) { console.log(error) });
  }

  renderTeams(teams) {
    let list = teams.map((team, index) => {
      return <Team
        key={team._id}
        index={index}
        team={team}
        onCancel={(val) => this.handleCancel(index, val)}
        onSave={(val) => this.handleTeamSave(index, val)}
        onAddEmail={(email, teams) => this.handleEmailAdd(index, email, teams)}
        onUpdateEmail={(emailIndex, prevEmail, newEmail, teams) => this.handleEmailUpdate(emailIndex, prevEmail, newEmail, teams)}
        onDeleteTeam={(_id) => this.handleTeamDelete(index, _id)}
        company={this.state.company}
        achievements={this.state.achievements}
        achievementGroups={this.state.achievementGroups}
        companyAchievementGroups={this.state.companyAchievementGroups}
        currentAchievementGroup={this.state.currentAchievementGroup}
        roadmaps={this.state.roadmaps}
        skills={this.state.skills} />;
    });
    return list;
  }

  onHandleUploadStoryImg(info){ 
    message.loading('Upload image in progress..', 0.1);
   
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`, 0);
     
      this.setState({storiesData: this.state.storiesData}); //re-render image
    } else if (info.file.status === 'error') {
      message.error(`${info.file.response.error}`);
    }
  }

  /* Handle Editable TR click event */
  async onClickEditable(e){
    if(this.state.editableStoryKey != ""){
        await this.props.updateStory(this.state.storiesData[this.state.editableStoryIndex]);
        this.setState({ editableStoryKey: "" }); //make tr non-editable on doubleclick     
        message.success(`Data edited successfully.`);
    } else {
       //if(this.state.editableStoryKey != e.currentTarget.dataset.key){
        this.setState({ storiesDataBackup: this.state.storiesData, editableStoryKey: e.currentTarget.dataset.key, editableStoryIndex: e.currentTarget.dataset.index }); //make tr editable in story table
      //} else {
        
      //}
    }
  }

  /* Prevent child element click to update state */
  handleStoryInputClick(e){
    e.stopPropagation();
  }

  /* Update new value in state after editing */
  handleStoryDataChange(e){
    let storyParent = e.currentTarget.dataset.indexparent;
    let storyChild = "";
    if(e.currentTarget.dataset.indexchild){
      storyChild = e.currentTarget.dataset.indexchild;
    }
    let index = this.state.editableStoryIndex;
    let storiesCopy = JSON.parse(JSON.stringify(this.state.storiesData));
    if(storyChild === ""){
      if(storyParent === "_achievements" || storyParent === "relatedTopics" || storyParent === "refresh"){
        //leave for now
        
      } else {
        storiesCopy[index][storyParent] = e.currentTarget.value;
      }
      
    } else {
      storiesCopy[index][storyParent][storyChild] = e.currentTarget.value;
    }
    this.setState({
      storiesData: storiesCopy
    });    
  }

  /* Undo Story Data */
  async undoStoryData(){
    if(this.state.editableStoryIndex != ""){
      this.setState({ storiesData: this.state.storiesDataBackup });
      message.success(`Data undo successfully.`);
      await this.props.updateStory(this.state.storiesDataBackup[this.state.editableStoryIndex]);    
    }
  }

  /* Handle checkbox click for stories */
  setSelectedStory(e){
    e.stopPropagation();
    var ids = this.state.selectedStoryKeys;
    var index = ids.indexOf(e.currentTarget.dataset.key);
    if(index > -1){
      ids.splice(index, 1);
    } else {
      ids.push(e.currentTarget.dataset.key);
    }
    
    this.setState({ selectedStoryKeys: ids });
  }

  async addStory(){
    await this.props.saveStory(new Array());
    await this.getStories();
    message.success(`New story added.`);
  }

  async removeStory(){
    await this.props.deleteStory(this.state.selectedStoryKeys);
    await this.getStories();
    message.success(`Story(ies) was deleted.`);
  }

  deleteQuestions() {
    var that = this;
    if(this.state.IsQuestionsOpen == 'block') {
    const url = `${ConfigMain.getBackendURL()}/questionsRemove`;
    return Axios.delete(url)
      .then(response => {
        that.setState({ questions: [], questionCount: 0 });
      })
      .catch(error => {

      });
    }
  }

  render() {
    const { userProfile } = this.props;
    const { company, questions, questionCount, storiesData, storiesCount, message } = this.state;
    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper settings-wrapper main-bg profile-wrapper`}>
        <p dangerouslySetInnerHTML={{ __html: nl2br(message ? message : '') }} />
      
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row company-holder">
                <div className="col-box-wp wider-strip mb-20 p-0">
                  <ul className="tab-wp">
                    <li className={this.state.IsAchievementOpen == 'block' ? 'active' : ''}><a href="javascript:;" onClick={this.toggleAchievementOption}>Achievement</a></li>
                    <li className={this.state.IsStoryOpen == 'block' ? 'active' : ''}><a href="javascript:;" onClick={this.toggleStoryOption}>Story</a></li>
                    <li><a href="#">Benefits</a></li>
                    <li className={this.state.IsQuestionsOpen == 'block' ? 'active' : ''}><a href="javascript:;" onClick={this.toggleQuestionsOption}>Questions</a></li>
                    <li className={this.state.IsChallengeOpen == 'block' ? 'active' : ''}><a href="javascript:;" onClick={this.toggleChallengesOption}>Challenges</a></li>
                    <li className={this.state.IsSettingsOpen == 'block' ? 'active' : ''}>
                      <a href="javascript:;" onClick={this.toggleSettingsOption}>Settings</a>
                    </li>
                    <li style={{float: 'right'}}>
                      <img src={undoimg} onClick={this.undoStoryData} />
                      <img style={{marginLeft: '7px'}} src={plus} onClick={this.addStory}  />
                      <img style={{margin: '0px 7px'}} src={cross} onClick={this.removeStory} />
                      <label htmlFor="upload-input">
                        <img src={cloud}/>
                        <input id="upload-input" name="file" type="file" accept=".csv" ref={(ref) => this.fileUpload = ref} style={{display: 'none'}} onChange={value => this.uploadFile()} />
                      </label>
                      <img style={{marginLeft: '7px'}} src={deleteimg} onClick={this.deleteQuestions}/>
                    </li>
                  </ul>
                </div>

                <div className="company-middle-wrapper">
                  <div className="achievement-holder" style={{ display: this.state.IsAchievementOpen }}>
                    <div className="theme-box-right">
                      <div className="box">
                        <div className="devider-box">
                          <div className="top-sec-wp">
                            <h3>{company.name}</h3>
                            <div className="box-wp bb-0">
                              <button className="btn-yellow" onClick={() => this.toggleAddEmailExpanded()}>Admin +</button>
                              <div className="company-new-filed" style={{ display: this.state.isAddEmailExpanded ? 'inline-block' : 'none' }}>
                                <input
                                  type="email"
                                  placeholder="Enter email address"
                                  value={this.state.addEmail}
                                  onChange={e => this.setEmailAddress(e)}
                                />
                                <a onClick={() => this.addCompanyEmail()}>Add</a>
                                <span className="close-new-company" onClick={() => this.toggleAddEmailExpanded()}>&#120273;</span>
                              </div>
                              {this.state.addEmailError ? <span style={{color: "red"}}>Please enter valid email address</span> : ''}
                              <ul>
                                {
                                  company.emails.map((email, index) => {
                                    return <li key={index}><a href="#">{email} <span className="cross-icon" onClick={() => this.deleteCompanyEmail(email)}>&#120273;</span></a></li>
                                  })
                                }
                              </ul>
                            </div>
                            {/* <div className="box-wp bb-0">
                              <h5>moderators</h5>
                              <ul>
                                <li><a href="#">danielshen083@gmail.com <span className="cross-icon">&#120273;</span></a></li>
                                <li><a href="#">danielshen083@gmail.com <span className="cross-icon">&#120273;</span></a></li>
                              </ul>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="theme-box-right">
                      <div className="box">
                        <div className="devider-box">
                          <h3>General Achievement Group <span><a href="#" className="change-btn txt-purpal"> Add +</a></span></h3>
                          {
                            !this.props.isFetchingAchievementGroups &&
                            this.renderAchievementGroups(this.state.companyAchievementGroups)
                          }
                          <div className="top-sec-wp mt-20">
                            <h3>Teams
                              { this.renderAddTeamGroupSelect([{value: "", label: "Select"}, {value: "AddTeam", label: "Add Team"}, {value: "AddAchievementGroup", label: "Add Achievement Group"}]) }
                            </h3>
                          </div>

                          {
                            !this.props.isFetchingAchievementGroups &&
                            this.renderTeams(this.props.teams)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: this.state.IsStoryOpen }} className="questions company-middle-wrapper">
                  <div id="stories" className="theme-box-right">
                    <div className="box" style={{ padding: '1px' }}>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Skill</th>
                              <th>Description</th>
                              <th>Category</th>
                              <th>SubCategory</th>
                              <th>Related Topics</th>
                              <th>Achievements</th>
                              <th>Image</th>
                              <th>Objective</th>
                              <th>Objective Value</th>
                              <th>Reward</th>
                              <th>Reward Value</th>
                              <th>Quota</th>
                              <th>Refresh</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                            _.map(storiesData,(que, index)=>{
                              if(this.state.editableStoryKey === que._id) {
                                return(
                                  <tr key={que._id} data-key={que._id} data-index={index} onClick={this.onClickEditable} >
                                    <td></td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="name" value={que.name} /></td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="skill" value={que.skill} /></td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="description" value={que.description} /></td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="category" value={que.category} /></td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="subCategory" value={que.subCategory} /></td>
                                    <td>{que.relatedTopics}</td>
                                    <td>{que._achievements[0]}</td>
                                    <td><Img key={`${new Date()}${que._id}`}
                                        src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/storyImages/${que._id}`}
                                        style={{maxWidth: 90, maxHeight: 90}}
                                      />
                                      <Upload
                                        name="image"
                                        listType="picture"
                                        action={`${ConfigMain.getBackendURL()}/story/${que._id}/upload-image`}
                                        onChange= {this.onHandleUploadStoryImg}
                                        showUploadList={false}
                                        key={`upload${que._id}`}
                                      >
                                        <Button data-imagebutton="true" key={`btn${que._id}`}>
                                          <Icon type="upload" key={`icon${que._id}`}/>Upload
                                        </Button>
                                      </Upload></td>
                                    <td>{que._objective ? que._objective.name : ''}</td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="objectiveValue" value={que.objectiveValue} /></td>
                                    <td>{que.reward ? que.reward.type : ''}</td>
                                    <td>{que.reward ? que.reward.value : ''}</td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="quota" value={que.quota} /></td>
                                    <td><Textarea onClick={this.handleStoryInputClick} onChange={this.handleStoryDataChange} data-indexParent="refresh" value={que.refresh} /></td>
                                  </tr>
                                )
                              } else {
                                return(
                                  <tr key={que._id} data-key={que._id} data-index={index} onClick={this.onClickEditable} >
                                    <td><input type="checkbox" style={{cursor: "pointer"}} data-key={que._id} onClick={this.setSelectedStory} /></td>
                                    <td className="hover-pencil">{que.skill}</td>
                                    <td className="hover-pencil">{que.description}</td>
                                    <td className="hover-pencil">{que.category}</td>
                                    <td className="hover-pencil">{que.subCategory}</td>
                                    <td>{que.relatedTopics}</td>
                                    <td>{que._achievements[0]}</td>
                                    <td><Img key={`${new Date()}${que._id}`}
                                        src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/storyImages/${que._id}`}
                                        style={{maxWidth: 90, maxHeight: 90}}
                                      />
                                      <Upload
                                        name="image"
                                        listType="picture"
                                        action={`${ConfigMain.getBackendURL()}/story/${que._id}/upload-image`}
                                        onChange= {this.onHandleUploadStoryImg}
                                        showUploadList={false}
                                        key={`upload${que._id}`}
                                      >
                                        <Button key={`btn${que._id}`} >
                                          <Icon type="upload" key={`icon${que._id}`}/>Upload
                                        </Button>
                                      </Upload></td>
                                    <td>{que._objective ? que._objective.name : ''}</td>
                                    <td className="hover-pencil">{que.objectiveValue}</td>
                                    <td>{que.reward ? que.reward.type : ''}</td>
                                    <td>{que.reward ? que.reward.value : ''}</td>
                                    <td className="hover-pencil">{que.quota}</td>
                                    <td className="hover-pencil">{que.refresh}</td>
                                  </tr>
                                )
                              }

                            })
                          }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <Pagination
                        key={'pagingStory'}
                        hideNavigation
                        activePage={this.state.activeStoryPage}
                        itemsCountPerPage={10}
                        totalItemsCount={storiesCount}
                        pageRangeDisplayed={5}
                        onChange={(pageNumber) => this.handlePageStoryChange(pageNumber)}
                      />
                  </div>
                </div>
                <div style={{ display: this.state.IsQuestionsOpen }} className="questions company-middle-wrapper">
                  <div id="questions" className="theme-box-right">
                    <div className="box" style={{ padding: '1px' }}>
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Question</th>
                                  <th>Roadmap/Skill</th>
                                  <th>Category</th>
                                  <th>SubCategory</th>
                                  <th>Description</th>
                                  <th>Cover Image</th>
                                  <th>Body Image</th>
                                  <th>Conditions</th>
                                  <th>Evaluation</th>
                                  <th>Complexity</th>
                                  <th>Company</th>
                                  <th>Preload</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                _.map(questions,(que, index)=>{
                                  return(
                                    <tr key={que._id}>
                                      <td></td>
                                      <td>{que.question}</td>
                                      <td>{que.roadmapSkill}</td>
                                      <td>{que.category}</td>
                                      <td>{que.subCategory}</td>
                                      <td>{que.description}</td>
                                      <td><Img key={`cover_${new Date()}${que._id}`}
                                            src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/questionImages/${que._id}_cover`}
                                            style={{maxWidth: 90, maxHeight: 90}}
                                          />
                                          <Upload 
                                            name="image"
                                            listType="picture"
                                            action={`${ConfigMain.getBackendURL()}/questions/${que._id}/upload-cover-image`}
                                            onChange= {this.onHandleUploadStoryImg}
                                            showUploadList={false}
                                            key={`upload-cover-image${que._id}`}
                                          >
                                            <Button key={`btn-q-cover${que._id}`}>
                                              <Icon type="upload" key={`icon-q-cover${que._id}`}/>Upload
                                            </Button>
                                          </Upload></td>
                                        <td><Img key={`body_${new Date()}${que._id}`}
                                            src={`https://s3.us-east-2.amazonaws.com/admin.soqqle.com/questionImages/${que._id}_body`}
                                            style={{maxWidth: 90, maxHeight: 90}}
                                          />
                                          <Upload 
                                            name="image"
                                            listType="picture"
                                            action={`${ConfigMain.getBackendURL()}/questions/${que._id}/upload-body-image`}
                                            onChange= {this.onHandleUploadStoryImg}
                                            showUploadList={false}
                                            key={`upload-body-image${que._id}`}
                                          >
                                            <Button key={`btn-q-body${que._id}`}>
                                              <Icon type="upload" key={`icon-q-body${que._id}`}/>Upload
                                            </Button>
                                          </Upload></td>
                                      <td>{que.conditions}</td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  )
                                })
                              }                              
                              </tbody>
                            </table>
                          </div>                  
                    </div>
                    <Pagination
                            hideNavigation
                            key={'pagingQuestion'}
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={questionCount}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                          />        
                  </div>
                </div>
                <div style={{ display: this.state.IsChallengeOpen }}>
                 <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper challenges-top profile-wrapper mychallenges-wrapper main-bg`}>
                  <div className="row">
                    <div className="container">
                      <div className="row">
                        <div className="row">
                          <div>{ this.section() }</div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
                <div style={{ display: this.state.IsSettingsOpen }}>
                  <ThemeSettings/>
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
  isUpdatingCompany: state.company.isUpdatingCompany,
  updatedCompany: state.company.company,
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
  fetchStories: bindActionCreators(fetchStories, dispatch),
  updateStory: bindActionCreators(updateStory, dispatch),
  saveStory: bindActionCreators(saveStory, dispatch),
  deleteStory: bindActionCreators(deleteStory, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Company));
