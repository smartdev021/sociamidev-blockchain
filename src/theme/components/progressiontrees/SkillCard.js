/*
    author: Akshay Menon
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { fetchRoadmaps, fetchRoadmapsFromAdmin } from '~/src/redux/actions/roadmaps';

import { startProgressionTree, stopProgressionTree } from '~/src/redux/actions/authorization';

import { saveTask } from '~/src/redux/actions/tasks';

import ConfigMain from '~/configs/main';

import '~/src/theme/css/SkillCard.css';

class SkillCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isTaskSelected: false,
      flipCardClass: false,
      openVideo: false,
      tree: undefined,
      selectedTask: undefined,
      selectedSkill: undefined
    };
  }

  componentDidMount() {
    const treeId = this.props.skillItem._id;
    if (treeId) {
      this.setState({ isLoading: true });
      axios
        .get(`${ConfigMain.getBackendURL()}/roadmapGet?id=${treeId}`)
        .then(response => this.treeFetchSuccess(response))
        .catch(error => this.treeFetchFailed(error));
    } else {
      this.setState({ isLoading: false });
    }
  }

  treeFetchSuccess(response) {
    this.setState({ isLoading: false, tree: response.data });
  }

  treeFetchFailed(error) {
    this.setState({ isLoading: false });
  }

  toggleTaskView() {
    this.setState({ isTaskSelected: !this.state.isTaskSelected });
  }

  flipCard() {
    this.setState({ flipCardClass: !this.state.flipCardClass });
  }

  startTask() {
    if(this.state.selectedTask && this.state.selectedSkill) {
      this.props.onStart(this.state.selectedTask, this.state.selectedSkill, this.state.tree);
      this.setState({
        isTaskSelected: false,
        selectedTask: undefined,
        selectedSkill: undefined,
        flipCardClass: false
      });
    }
  }

  selectSkill(e, selectedSkill) {
    this.setState({ selectedSkill });
    $('.pskill-banner').removeClass('active');
    $(e.target)
      .closest('div.pskill-banner')
      .addClass('active');
  }

  selectTask(e, selectedTask) {
    this.setState({ selectedTask });
    $('.ptask-banner').removeClass('active');
    $(e.target)
      .closest('div.ptask-banner')
      .addClass('active');
  }

  onPlayVideo() {
    this.setState({ openVideo: !this.state.openVideo });
  }

  renderVideo() {
    return (
      <div className="ptree-video-lightbox" onClick={() => this.onPlayVideo()}>
        <div className="ptree-video-container">
          <iframe
            className="ptree-video"
            width="420"
            height="345"
            id="intro-video"
            src="https://www.youtube.com/embed/i8PJgSclIf0"
          />
          <a
            className="fa fa-2x fa-times"
            style={{ color: 'white', verticalAlign: 'top' }}
            onClick={() => this.onPlayVideo()}
          />
        </div>
      </div>
    );
  }

  renderSkills(skills) {
    const that = this;
    //TODO: Fix incorrect database structure
    let skillParsed = skills.length > 1 ? skills : skills[0].split(',');
    for (let i = 0; i < skillParsed.length; ++i) {
      skillParsed[i] = skillParsed[i].trim();
    }
    const listItems = skillParsed.map(function(skill, i) {
      return (
        <div className="pskill-banner" onClick={e => that.selectSkill(e, skill)} key={i}>
          <div className="pskill-name">{skill}</div>
          <div className="ptree-checkmark-div">
            <div className="ptree-checkmark" />
          </div>
        </div>
      );
    });
    return listItems;
  }

  renderTaskCard(skillItem) {
    return (
      <div>
        <div className="ptree-back-header">Select task to continue.</div>
        <div className="ptree-task-list">
          <div className="ptask-banner" onClick={e => this.selectTask(e, 'Illuminate')}>
            <div className="ptask-left">
              <div className="ptask-name">Illuminate</div>
              <div className="ptask-desc">30 min 3 questions</div>
            </div>
            <div className="ptask-right">
              <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Single.png"
                className="ptask-img-single"
              />
            </div>
          </div>

          <div className="ptask-banner" onClick={e => this.selectTask(e)}>
            <div className="ptask-left">
              <div className="ptask-name">Deepdive</div>
              <div className="ptask-desc">30 min 10 questions</div>
            </div>
            <div className="ptask-right">
              <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Two.png"
                className="ptask-img-double"
              />
            </div>
          </div>

          <div className="ptask-banner" onClick={e => this.selectTask(e)}>
            <div className="ptask-left">
              <div className="ptask-name">XXX</div>
              <div className="ptask-desc">xxx</div>
            </div>
            <div className="ptask-right">
              <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Two.png"
                className="ptask-img-double"
              />
            </div>
          </div>

          <div className="ptask-banner" onClick={e => this.selectTask(e)}>
            <div className="ptask-left">
              <div className="ptask-name">Brainstorm</div>
              <div className="ptask-desc">60 min 1 challenge</div>
            </div>
            <div className="ptask-right">
              <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Group.png"
                className="ptask-img-group"
              />
            </div>
          </div>
        </div>
        <div className="pskill-btn-group ptree-btn-group">
          <button className="ptree-btn ptree-back" onClick={() => this.flipCard()}>
            Back
          </button>
          <button className="ptree-btn ptree-next" onClick={() => this.toggleTaskView()}>
            Next
          </button>
        </div>
      </div>
    );
  }

  renderSkillCard() {
    return (
      <div className="ptree-skill-list">
        <div className="ptree-back-header">
          <div>Select one skill to improve it.</div>
          <a className="view-video" onClick={() => this.onPlayVideo()}>
            View the video >
          </a>
        </div>

        <div className="ptree-skill-set">{this.renderSkills(this.state.tree.weightage1)}</div>

        <div className="ptree-skill-set-btn-group">
          <button className="ptree-btn ptree-back" onClick={() => this.toggleTaskView()}>
            Back
          </button>
          <button disabled={!this.state.selectedTask || !this.state.selectedSkill} className="ptree-btn ptree-next" onClick={() => this.startTask()}>
            Start
          </button>
        </div>
      </div>
    );
  }

  getImgUrl(img) {
    let imgUrl;
    if (img == 'Miner') {
      imgUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/miner_glow.png';
    } else if (img == 'Nomad') {
      imgUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Nomad_LoRes.png';
    } else if (img == 'Innovator') {
      imgUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/innovator.png';
    } else {
      imgUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/innovator.png';
    }
    return imgUrl;
  }

  render() {
    const { skillItem } = this.props;
    const flipClass = this.state.flipCardClass ? ' hover' : '';
    const CardPanel = this.state.isTaskSelected
      ? this.renderSkillCard(skillItem)
      : this.renderTaskCard(skillItem);
    const VideoPanel = this.state.openVideo ? this.renderVideo() : null;
    const imgUrl = this.getImgUrl(skillItem.heroimg);
    return (
      <div className="col-md-6 col-sm-12 progression-tree-skill-container">
        {VideoPanel}
        <div className="progression-tree-skill-content">
          <div className="progression-tree-skill-item">
            <div className="progression-tree-hero-container col-md-6 col-sm-12">
              <img src={imgUrl} className="progression-tree-hero-img" />
            </div>
            <div className="progression-tree-skill-card col-md-6 col-sm-12">
              <div className={`ptree-card-item` + flipClass}>
                <div className="ptree-card">
                  <div className="ptree-card-front">
                    <div className="ptree-card-heading">{skillItem.name}</div>
                    <span className="ptree-yellow-bar" />
                    <div className="ptree-card-body">{skillItem.description}</div>
                    <div className="pskill-btn-group ptree-btn-group">
                      <button className="ptree-btn ptree-start">Quick start</button>
                      <button className="ptree-btn ptree-view" onClick={() => this.flipCard()}>
                        View tasks
                      </button>
                    </div>
                  </div>
                  <div className="ptree-card-back">{CardPanel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillCard;
