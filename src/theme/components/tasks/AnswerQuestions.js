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

import PopupAnswers from '~/src/theme/components/tasks/PopupHangoutAnswers';

import "~/src/theme/appearance.css"
import "~/src/theme/layout.css"
import "~/src/theme/css/taskBrowser.css"

import {
  setLastStartedTask,
  hangoutAnswersSave,
} from '~/src/redux/actions/tasks'

class AnswerQuestions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTask: this.props.currentTask,
      questions: [],

      answersMy: {},

      answersPartner: {},

      isTaskLoading: false,
      isQuestionsLoading: false,

      isAnswersFetchFromServerInProgress: false,
      isAnswersFetchFromCookiesInProgress: false,

      isLoading: false,
    }

    this.getPartnerProfile = this.getPartnerProfile.bind(this);
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

  componentDidMount() {
    const that = this;
    if (this.state.currentTask && this.state.currentTask.type == "hangout") {
      that.setState({isQuestionsLoading: true});
      Axios.get(`${ConfigMain.getBackendURL()}/questionsGet?roadmapSkill=${this.state.currentTask.metaData.subject.skill.name}`)
      .then((response)=>{that.setState({questions: response.data, isQuestionsLoading: false})})
      .catch((error)=>{that.setState({isQuestionsLoading: false}); console.log(error)});

      this.fetchUserAnswersFromCookies();

      this.fetchUserAnswersFromServerMy();
    } else if (this.state.currentTask && this.state.currentTask.type == "illuminate") {
      that.setState({isQuestionsLoading: true});

      Axios.get(`${ConfigMain.getBackendURL()}/questionsGet?roadmapSkill=${this.state.currentTask.metaData.subject.skill.name}`)
      .then((response)=>{
        that.setState({
          questions: response.data,
          isQuestionsLoading: false
        })})
      .catch((error)=>{that.setState({isQuestionsLoading: false}); console.log(error)});
    }

    this.props.setLastStartedTask({});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isQuestionsLoading != prevState.isQuestionsLoading 
        || this.state.isTaskLoading != prevState.isTaskLoading 
          || prevState.isAnswersFetchFromCookiesInProgress != this.state.isAnswersFetchFromCookiesInProgress
            || prevState.isAnswersFetchFromServerInProgress != this.state.isAnswersFetchFromServerInProgress
              || prevProps.isTasksUpdateInProgress != this.props.isTasksUpdateInProgress) {
      this.setState({isLoading: (this.state.isQuestionsLoading 
        || this.state.isTaskLoading 
          || this.state.isAnswersFetchFromCookiesInProgress
            || this.state.isAnswersFetchFromServerInProgress
              || this.props.isTasksUpdateInProgress
      )});
    }

    if (this.state.answersMy != prevState.answersMy) {
      this.storeUserAnswersToCookies(this.state.answersMy);
    }

    if (prevProps.isTasksUpdateInProgress != this.props.isTasksUpdateInProgress) {
      if (!this.props.isTasksUpdateInProgress) {
        this.props.onSubmitComplete();
      }
    }
  }

  fetchUserAnswersFromServerMy() {
    if (this.state.currentTask._id) {
      this.setState({isAnswersFetchFromServerInProgress: true});
      const CurrentUserID = this.props.userProfile._id;

      const Partner = this.getPartnerProfile();

      const that = this;

      Axios.get(`${ConfigMain.getBackendURL()}/hangoutAnswerGetForTask?taskId=${this.state.currentTask._id}`)
      .then((response) =>this.fetchUserAnswersFromServerMySuccess(response, that))
        .catch((error) => {
          that.setState({isAnswersFetchFromServerInProgress: false});
          console.log(error)
        });
    }
  }

  getPartnerProfile() {
    const CurrentUserID = this.props.userProfile._id;

    const Partner = this.state.currentTask.metaData.participants.find(function(participant) {
      return participant.user._id != CurrentUserID;
    });

    return Partner;
  }

  fetchUserAnswersFromServerMySuccess(response, that) {
    const answers = response.data;

    const CurrentUserID = that.props.userProfile._id;

    const Partner = that.getPartnerProfile();

    const foundAnswersForUser = answers.userAnswers.find(function(userAnswer) {
      return userAnswer._id == CurrentUserID;
    });

    const foundAnswersForPartner = answers.userAnswers.find(function(userAnswer) {
      return Partner && userAnswer._id == Partner.user._id;
    });

    let newAnswersMy = Object.assign({}, that.state.answersMy);

    if (foundAnswersForUser) {
      newAnswersMy = foundAnswersForUser.answers;
    }

    let newAnswersPartner = Object.assign({}, that.state.answersPartner);

    if (foundAnswersForPartner) {
      newAnswersPartner = foundAnswersForPartner.answers;
    }

    this.storeUserAnswersToCookies(newAnswersMy);

    that.setState({
      answersMy: newAnswersMy, 
      answersPartner: newAnswersPartner, 
      isAnswersFetchFromServerInProgress: false
    });
  }

  storeUserAnswersToCookies(answersMy) {
    if (this.state.currentTask._id) {
      const { cookies } = this.props;

      let dateExpire = new Date();
      dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod()); 

      let options = { path: '/', expires: dateExpire};

      let answersForTask = cookies.get(`answers_for_task_${this.state.currentTask._id}`);
      if (!answersForTask) {
        answersForTask = {};
      }

      answersForTask[this.props.userProfile._id] = answersMy;

      cookies.set(`answers_for_task_${this.state.currentTask._id}`, answersForTask, options); 
    }
  }

  fetchUserAnswersFromCookies() {
    if (this.state.currentTask._id) {
      this.setState({isAnswersFetchFromCookiesInProgress: true});
      const { cookies } = this.props;
      const answersForTask = cookies.get(`answers_for_task_${this.state.currentTask._id}`);

      if (answersForTask && answersForTask[this.props.userProfile._id]) {
        this.setState({answersMy: answersForTask[this.props.userProfile._id], isAnswersFetchFromCookiesInProgress: false});
      }
      else {
        this.setState({isAnswersFetchFromCookiesInProgress: false});
      }
    }
  }

  handlePopupSubmit(e) {
    e.preventDefault();

    const that = this;

    const body = {
      userId: this.props.userProfile._id,

      taskId: this.state.currentTask._id,

      answers: this.state.answersMy,
    };

    this.props.hangoutAnswersSave(body);
  }

  handlePopupClose() {
    this.props.onSubmitComplete();
  }

  render() {
    const CurrentUserID = this.props.userProfile._id;

    const Partner = this.getPartnerProfile();

    let limit = 10;
    if (this.state.currentTask.type == "illuminate") {
      limit = 3;
    }
    const Questions = this.state.questions.length > 0 ? this.state.questions.slice(0, limit/*limit questions to 10*/) : [];

    return (
      <PopupAnswers onSubmit={(e)=>this.handlePopupSubmit(e)} 
        onCloseModal={()=>this.handlePopupClose()}
        questions={Questions} partner={Partner}
        answersMy={this.state.answersMy}
        answersPartner={this.state.answersPartner}
        isLoading={this.state.isLoading}
        isSubmitting={this.props.isTasksUpdateInProgress}
        onHandleAnswerInput={(e)=>this.handleAnswerInput(e)}/>
    );
  }
}

AnswerQuestions.propTypes = {
  setLastStartedTask: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  hangoutAnswersSave: PropTypes.func.isRequired,
  isTasksUpdateInProgress: PropTypes.bool,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile.profile,
  isAuthorized: state.userProfile.isAuthorized,
  isTasksUpdateInProgress: state.isTasksUpdateInProgress,
})

const mapDispatchToProps = dispatch => ({
  setLastStartedTask: bindActionCreators(setLastStartedTask, dispatch),
  hangoutAnswersSave: bindActionCreators(hangoutAnswersSave, dispatch),
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AnswerQuestions));