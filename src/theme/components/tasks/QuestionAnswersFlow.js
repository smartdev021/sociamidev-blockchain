import React, { Component } from 'react';
import '~/src/theme/css/question-answers-flow.css';
import answerPersonImg from '~/src/theme/images/answer-person.png';
import avatar from '~/src/theme/images/avatar.png';
import btnNextImg from '~/src/theme/images/btn-next.png';
import btnPreviousImg from '~/src/theme/images/btn-previous.png';
import feacbookImg from '~/src/theme/images/facebook.png';
import linkedInImg from '~/src/theme/images/linkedIn.png';
import backArrowImg from '~/src/theme/images/back-arrow.png';
import leftArrowImg from '~/src/theme/images/left-arrow.png';
import rightArrowImg from '~/src/theme/images/right-arrow.png';
import checkedImg from '~/src/theme/images/checked.png';
import uncheckedImg from '~/src/theme/images/unchecked.png';
import radioCheckedImg from '~/src/theme/images/radio-checked.png';
import radioUncheckedImg from '~/src/theme/images/radio-unchecked.png';
import PropTypes from 'prop-types';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: null
    };
  }
  handleOnClick(answer) {
    this.setState({ answer });
    this.props.onChange(this.state.answer);
  }
  render() {
    return (
      <div>
        <p>Your answer</p>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 0',
            width: 100,
            alignItems: 'center',
            cursor: 'default'
          }}
          onClick={this.handleOnClick.bind(this, 'TRUE')}
        >
          {this.state.answer === 'TRUE' ? (
            <img src={radioCheckedImg} alt="checked" />
          ) : (
            <img src={radioUncheckedImg} alt="unchecked" />
          )}
          <span>&nbsp;&nbsp;&nbsp;True</span>
        </span>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 0',
            width: 100,
            alignItems: 'center',
            cursor: 'default'
          }}
          onClick={this.handleOnClick.bind(this, 'FALSE')}
        >
          {this.state.answer === 'FALSE' ? (
            <img src={radioCheckedImg} alt="checked" />
          ) : (
            <img src={radioUncheckedImg} alt="unchecked" />
          )}
          <span>&nbsp;&nbsp;&nbsp;False</span>
        </span>
      </div>
    );
  }
}

RadioGroup.propTypes = {
  onChange: PropTypes.func.isRequired
};

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items.map(item => ({ ...item, selected: false }))
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      items: newProps.items.map(item => ({ ...item, selected: false }))
    });
  }
  handleOnClick(key) {
    const newState = this.state.items.map(item => {
      if (item.key === key) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    this.setState({ items: newState });
    this.props.onChange(newState);
  }
  render() {
    return (
      <div>
        {this.state.items.map(item => (
          <div
            key={item.key}
            onClick={this.handleOnClick.bind(this, item.key)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '5px 0px',
              cursor: 'default'
            }}
          >
            {item.selected ? (
              <img src={checkedImg} alt="checked" />
            ) : (
              <img src={uncheckedImg} alt="unchecked" />
            )}
            <span style={{ paddingLeft: 10 }}>{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

class QuestionAnswersFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      questions: [
        {
          question:
            'True or False. Chemical hazards include conditions such as mechanised equipment, loose materials, and access difficulty.',
          type: 'TRUE_OR_FALSE'
        },
        {
          question:
            'What are the key elements of risk assessment for confined spaces?',
          type: 'TEXT_ANSWER'
        },
        {
          question: 'What is a confined space?',
          type: 'OBJECTIVE_TYPE',
          options: [
            {
              key: 'Option 1',
              value: 'They often have far more parameters to train.'
            },
            {
              key: 'Option 2',
              value:
                'Nonparametric methods seek to best fit the training data in constructing the mapping function, whilst maintaining some ability to generalize to unseen data.'
            },
            {
              key: 'Option 3',
              value:
                'Nonparametric Machine Learning Algorithms are more flexible.'
            }
          ]
        }
      ]
    };
  }
  handleNextOrPrevious(action) {
    const { currentQuestion, questions } = this.state;
    if (
      (currentQuestion === 0 && action === 'prev') ||
      (currentQuestion === questions.length - 1 && action === 'next')
    ) {
      return;
    } else {
      this.setState({
        currentQuestion:
          action === 'prev' ? currentQuestion - 1 : currentQuestion + 1
      });
    }
  }
  render() {
    const { currentQuestion, questions } = this.state;
    return (
      <div className="QuestionAnswersFlow-container">
        <div className="QuestionAnswersFlow-back-to-tasks-ctn">
          <button onClick={this.props.onBackToMyTasks}>
            <img src={backArrowImg} />&nbsp;&nbsp;BACK TO MY TASKS
          </button>
        </div>
        <div className="QuestionAnswersFlow-current-question-indicator">
          <img src={leftArrowImg} />
          <span>{`${currentQuestion + 1} of ${questions.length}`}</span>
          <img src={rightArrowImg} />
        </div>
        <div>
          <h3 className="QuestionAnswersFlow-main-question">
            {questions[currentQuestion].question}
          </h3>
        </div>
        <div className="QuestionAnswersFlow-answer">
          <span>
            <img src={answerPersonImg} alt="answer-person-avatar" />
          </span>
          <span className="QuestionAnswersFlow-answer-text">
            The reason that non-parametric classifiers are slower is because
            they often have far more parameters to train...
            <a href="#">&nbsp;&nbsp;Show more</a>
          </span>
        </div>
        <div className="QuestionAnswersFlow-other-players-answers">
          <span className="QuestionAnswersFlow-other-players-answers-text">
            Other players' answers
          </span>
          <span className="QuestionAnswersFlow-other-players-answers-images">
            <span className="answer-avatar-container">
              <img src={avatar} />
              <span className="answer-text-text">
                The reason that non-paramet- ric classifiers are slower is
                because they often have far more parameters to train.
              </span>
            </span>
            <span className="answer-avatar-container">
              <img src={avatar} />
              <span className="answer-text-text">
                because they often have far more parameters to train. The reason
                that non-paramet- ric classifiers are slower is
              </span>
            </span>
            <span className="answer-avatar-container">
              <img src={avatar} />
              <span className="answer-text-text">
                The reason that non-paramet- ric classifiers are slower is
                because they often have far more parameters to train.
              </span>
            </span>
          </span>
        </div>
        <div className="QuestionAnswersFlow-textarea">
          {questions[currentQuestion].type === 'TRUE_OR_FALSE' && (
            <RadioGroup onChange={newValue => {}} />
          )}
          {questions[currentQuestion].type === 'TEXT_ANSWER' && (
            <textarea>Type your answer here...</textarea>
          )}
          {questions[currentQuestion].type === 'OBJECTIVE_TYPE' && (
            <CheckboxGroup
              onChange={newValue => {}}
              items={questions[currentQuestion].options}
            />
          )}
        </div>
        <div className="QuestionAnswersFlow-social-share">
          <span>World must know my answer</span>
          <a href="#">
            <img src={linkedInImg} />
          </a>
          <a href="#">
            <img src={feacbookImg} />
          </a>
        </div>
        <div className="QuestionAnswersFlow-prev-next-ctn">
          <button
            className="btn-prev"
            onClick={this.handleNextOrPrevious.bind(this, 'prev')}
          >
            <img src={btnPreviousImg} />
          </button>
          <button
            className="btn-next"
            onClick={this.handleNextOrPrevious.bind(this, 'next')}
          >
            <img src={btnNextImg} />
          </button>
        </div>
      </div>
    );
  }
}

QuestionAnswersFlow.PropTypes = {
  onBackToMyTasks: PropTypes.func.isRequired
};

export default QuestionAnswersFlow;
