/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Icon} from 'react-fa'

import Axios from 'axios'

import ConfigMain from '~/configs/main'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/appearance.css"
import "~/src/theme/layout.css"
import "~/src/theme/css/taskBrowser.css"

class TaskBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTask: undefined,
      questions: [],
      isTaskLoading: true,
      isQuestionsLoading: true,
      isLoading: true,
    }
  }

  componentDidMount() {
    const URLParams = new URLSearchParams(this.props.location.search);

    const taskId = URLParams.get("id");

    const that = this;

    if (taskId) {
      Axios.get(`${ConfigMain.getBackendURL()}/taskGetById?id=${taskId}`)
      .then((response)=>{that.setState({currentTask: response.data, isTaskLoading: false})})
      .catch((error)=>{that.setState({isTaskLoading: false}); console.log(error)});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const that = this;

    if (prevState.currentTask != this.state.currentTask) {
      if (this.state.currentTask && this.state.currentTask.type == "hangout") {
        Axios.get(`${ConfigMain.getBackendURL()}/questionsGet?roadmapSkill=${this.state.currentTask.metaData.subject.skill.name}`)
        .then((response)=>{that.setState({questions: response.data, isQuestionsLoading: false})})
        .catch((error)=>{that.setState({isQuestionsLoading: false}); console.log(error)});
      }
    }

    if (this.state.isQuestionsLoading != prevState.isQuestionsLoading || this.state.isTaskLoading != prevState.isTaskLoading) {
      this.setState({isLoading: this.state.isQuestionsLoading && this.state.isTaskLoading});
    }
  }

  renderQuestions() {
    if (!this.props.isAuthorized) {
      return (
        <div className="row" key={i}>
          <div className="col-lg-12">
          </div>
        </div>);
    }

    const DummyQuestions = [
      {
        title: "What is the future of Fintech?", 
      },
      {
        title: "What are some examples of usage of Fintech?",
      },
      {
        title: "What are the key challenges of Fintech?",
      },
    ];

    const CurrentUserID = this.props.userProfile._id;

    const Questions = this.state.questions.length > 0 ? this.state.questions : DummyQuestions;

    const Partner = this.state.currentTask.metaData.participants.find(function(participant) {
      return participant.user._id != CurrentUserID;
    });

    return (
    <div id="questions-list">
      <div className="container-fluid">
        {
          Questions.map(function(question, i) {
            return (
              <div className="row" key={i}>
                <div className="col-lg-12">
                  {i + 1}) {question.title}
                </div>
                <div className="col-lg-6">
                  <div>{"You"}</div>
                  <div className="form-group">
                    <textarea id="answer_your" className="form-control validate-field required question-text-area" 
                      name="answer_your" onChange={(e)=>{}} />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>{Partner.user.firstName}</div>
                  <div className="form-group">
                    <textarea id="answer_partner" className="form-control validate-field required question-text-area" 
                      name="answer_partner" onChange={(e)=>{}} />
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
  </div>
    )
  }

  render() {
    if (!this.props.isAuthorized) {
      return (
        <div id="main-content_1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 content-2-columns-left-title">
                <h3>Please log-in</h3>
              </div>
            </div>
          </div>
        </div>);
    }

    if (this.state.isLoading) {
      return (
        <div id="main-content_1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 content-2-columns-left-title">
                <h3><Icon spin name="spinner"/>Fetching data...</h3>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const CurrentUserID = this.props.userProfile._id;

    const Partner = this.state.currentTask.metaData.participants.find(function(participant) {
      return participant.user._id != CurrentUserID;
    });

    return (
      <div id="main-content_1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 content-2-columns-left-title">
              <span>Your meeting with {Partner.user.firstName}</span>
              <div id="actions" className="pull-right">
                <ActionLink href="#" onClick={()=>{}}
                  className="organizer-action-link">Cancel</ActionLink>
                <ActionLink href="#" onClick={()=>{}} 
                  className="organizer-action-link">Reschedule</ActionLink>
              </div>
              <ActionLink className="skill-breakdown-control pull-right" id="button-arrow-back" onClick={this.props.history.goBack}>
                <span className="glyphicon glyphicon-arrow-left"></span>
              </ActionLink>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this.renderQuestions()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TaskBrowser.propTypes = {
  userProfile: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile.profile,
  isAuthorized: state.userProfile.isAuthorized
})

const mapDispatchToProps = dispatch => ({
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(TaskBrowser);