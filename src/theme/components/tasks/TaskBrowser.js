/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
    }
  }

  componentDidMount() {
    const URLParams = new URLSearchParams(this.props.location.search);

    const taskId = URLParams.get("id");

    const that = this;

    if (taskId) {
      Axios.get(`${ConfigMain.getBackendURL()}/taskGetById?id=${taskId}`)
      .then((response)=>{that.setState({currentTask: response.data})})
      .catch((error)=>{console.log(error)});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentTask != this.props.currentTask) {
      console.log("Current Task is: ");
      console.dir(this.state.currentTask);
    }
  }

  renderQuestions() {
    const DummyQuestions = [
      {
        title: "What is the future of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
      {
        title: "What are some examples of usage of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
      {
        title: "What are the key challenges of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
      {
        title: "What are the key challenges of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
      {
        title: "What are the key challenges of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
      {
        title: "What are the key challenges of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
      {
        title: "What are the key challenges of Fintech?", participants: [
          {_id: "5s323treg4d323t", firstName: "You"},
          {_id: "5s37h23treg4d33g23t", firstName: "John"},
        ] 
      },
    ];

    return (
    <div id="questions-list">
      <div className="container-fluid">
        {
          DummyQuestions.map(function(question, i) {
            return (
              <div className="row" key={i}>
                <div className="col-lg-12">
                  {i + 1}) {question.title}
                </div>
                <div className="col-lg-6">
                  <div>{question.participants[0].firstName}</div>
                  <div className="form-group">
                    <textarea id="answer_your" className="form-control validate-field required question-text-area" 
                      name="answer_your" onChange={(e)=>{}} />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>{question.participants[1].firstName}</div>
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

    const PartnerName = (this.state.currentTask && this.state.currentTask.type == "hangout") ? this.state.currentTask.metaData.participants[1].user.firstName 
    : "John";

    return (
      <div id="main-content_1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 content-2-columns-left-title">
              <span>Your meeting with {PartnerName}</span>
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
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})


//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(TaskBrowser);