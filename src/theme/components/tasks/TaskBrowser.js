/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Icon} from 'react-fa'

import { withCookies, Cookies } from 'react-cookie';

import Axios from 'axios'

import ConfigMain from '~/configs/main'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/appearance.css"
import "~/src/theme/layout.css"
import "~/src/theme/css/taskBrowser.css"

import {
  setLastStartedTask,
} from '~/src/redux/actions/tasks'

class TaskBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTask: undefined,
      questions: [],

      answersMy: {},

      answersPartner: {},

      isTaskLoading: false,
      isQuestionsLoading: false,

      isLoading: false,

      isSubmitted: false,
    }
  }

  getAnswerMy(questionId) {
    return this.state.answersMy && this.state.answersMy[questionId] ? this.state.answersMy[questionId].text : "";
  }

  getAnswerPartner(questionId) {
    return this.state.answersPartner && this.state.answersPartner[questionId] ? this.state.answersPartner[questionId].text : "";
  }

  handleAnswerInput(e) {
    if (e.target.id.startsWith('answer_your_')) {
      const questionId = e.target.id.replace('answer_your_', '');

      if (questionId) {
        let answersMyCopy = Object.assign({}, this.state.answersMy);
        answersMyCopy[questionId] = { text: e.target.value, timeChanged: Date.now()};

        this.setState({answersMy: answersMyCopy});
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({isSubmitted: true});
  }

  componentDidMount() {
    this.props.setLastStartedTask({});
    const URLParams = new URLSearchParams(this.props.location.search);

    const taskId = URLParams.get("id");

    const that = this;

    if (taskId) {
      that.setState({isTaskLoading: true});
      Axios.get(`${ConfigMain.getBackendURL()}/taskGetById?id=${taskId}`)
      .then((response)=>{that.setState({currentTask: response.data, isTaskLoading: false})})
      .catch((error)=>{that.setState({isTaskLoading: false}); console.log(error)});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const that = this;

    if (prevState.currentTask != this.state.currentTask) {
      if (this.state.currentTask && this.state.currentTask.type == "hangout") {
        that.setState({isQuestionsLoading: true});
        Axios.get(`${ConfigMain.getBackendURL()}/questionsGet?roadmapSkill=${this.state.currentTask.metaData.subject.skill.name}`)
        .then((response)=>{that.setState({questions: response.data, isQuestionsLoading: false})})
        .catch((error)=>{that.setState({isQuestionsLoading: false}); console.log(error)});

        this.getUserAnswersFromCookies();
      }
    }

    if (this.state.isQuestionsLoading != prevState.isQuestionsLoading || this.state.isTaskLoading != prevState.isTaskLoading) {
      this.setState({isLoading: this.state.isQuestionsLoading && this.state.isTaskLoading});
    }

    if (this.state.answersMy != prevState.answersMy) {
      this.storeUserAnswersToCookies();
    }

    console.log("%cTaskBrowser did update", "backrgound: black; color: white;");
    console.dir(this.state);
  }

  storeUserAnswersToCookies() {
    if (this.state.currentTask._id) {
      console.log("%cstoreUserAnswersToCookies", "color: black; background: purple;");
      const { cookies } = this.props;

      let dateExpire = new Date();
      dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod()); 

      let options = { path: '/', expires: dateExpire};

      let answersForTask = cookies.get(`answers_for_task_${this.state.currentTask._id}`);

      answersForTask = this.state.answersMy;

      cookies.set(`answers_for_task_${this.state.currentTask._id}`, answersForTask, options); 
    }
  }

  getUserAnswersFromCookies() {
    if (this.state.currentTask._id) {
      console.log("%cgetUserAnswersFromCookies", "color: black; background: orange;");
      const { cookies } = this.props;
      const answersForTask = cookies.get(`answers_for_task_${this.state.currentTask._id}`);

      if (answersForTask) {
        this.setState({answersMy: answersForTask});
      }
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
        _id: "5a48fedf9bc3de107547f460",
        question: "What is the future of Fintech?", 
      },
      {
        _id: "5a4b508a0b318a2b33e1c544",
        question: "What are some examples of usage of Fintech?",
      },
      {
        _id: "5a51a83bf745483195e4e342",
        question: "What are the key challenges of Fintech?",
      },
    ];

    const CurrentUserID = this.props.userProfile._id;

    const Questions = this.state.questions.length > 0 ? this.state.questions : DummyQuestions;

    const Partner = this.state.currentTask.metaData.participants.find(function(participant) {
      return participant.user._id != CurrentUserID;
    });

    const that = this;

    return (
    <div id="questions-list">
      <div className="container-fluid">
        {
          Questions.map(function(question, i) {
            
            const AnswerMy = that.getAnswerMy([question._id]);
            const AnswerPartner = that.getAnswerPartner([question._id]);

            return (
              <div className="row" key={i}>
                <div className="col-lg-12">
                  {i + 1}) {question.question}
                </div>
                <div className="col-lg-6">
                  <div>{"You"}</div>
                  <div className="form-group">
                    <textarea id={`answer_your_${question._id}`} className="form-control validate-field required question-text-area" 
                      name="answer_your" onChange={(e)=>that.handleAnswerInput(e)} value={AnswerMy}/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>{Partner.user.firstName}</div>
                  <div className="form-group">
                    <textarea readOnly={true} id={`answer_partner_${question._id}`} className="form-control validate-field required question-text-area" 
                      name="answer_partner" onChange={(e)=>{}} value={AnswerPartner}/>
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

    if (this.state.isSubmitted) {
      return (
        <div id="main-content_1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 content-2-columns-left-title">
                <h3>Thank you for submitting your answers</h3>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!this.state.currentTask) {
      return (
        <div id="main-content_1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 content-2-columns-left-title">
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
                  <button type="button" className="btn btn-ьв btn-outline-inverse" 
                    onClick={(e) => this.handleSubmit(e)}>Submit</button>
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
  setLastStartedTask: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile.profile,
  isAuthorized: state.userProfile.isAuthorized
})

const mapDispatchToProps = dispatch => ({
  setLastStartedTask: bindActionCreators(setLastStartedTask, dispatch),
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(TaskBrowser));