/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'
import DetailsPopup from '~/src/theme/components/DetailsPopupLatestTask';

import {
  setSearchQuery,
} from '~/src/redux/actions/fetchResults'

const MAX_LATEST_TASKS = 3;
const TaskTypesToNameMap = {find_mentor: "Find Mentor",};

import "~/src/css/HomePage.css"

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDetailsOpen: false,
      currentTask: {},
    }
  }

  handleCloseModal() {
    let copy = Object.assign({}, this.state, {isDetailsOpen: false});
    this.setState(copy);
  }

  handleOpenModal(task) {
    let copy = Object.assign({}, this.state, {isDetailsOpen: true, currentTask: task});
    this.setState(copy);
  }

  componentWillMount() {
    this.props.onFetchAllTasks(true);
  }

  handleStartSearch(e) {
    e.preventDefault();
    this.props.onHandleStartSearch();
  }

  HandleChange(e) {
    this.props.setSearchQuery(e.target.value);
  }

  onViewTaskAuthor(task) {
    this.handleOpenModal(task);  
  }

  renderTask(task) {
    return (
      <h5>{task.name}</h5>
    );
  }

  taskTypeToName(taskType) {
    return TaskTypesToNameMap[taskType];
  }

  renderLatestTasks() {
    let that = this;
    
    let latestTasks = this.props.tasks.slice(0).sort(function(a, b) {
      return b.creationDate - a.creationDate;
    });

    console.log("latestTaskslatestTaskslatestTaskslatestTaskslatestTaskslatestTaskslatestTasks");
    console.dir(latestTasks);

    return (
      <div className="row">
        {
          latestTasks.map(function(task, i) {
            if (i < MAX_LATEST_TASKS) {
              return (<article className="jobTile feature-col col-md-4" key={i}>
              <ActionLink href='#' className="thumbnail linked" onClick={()=> that.onViewTaskAuthor(task)}>
                <div className="caption">
                <p>{that.taskTypeToName(task.type)}</p>
                  <p >{task.roadmapName ? task.roadmapName : task.name}</p>
                </div>
              </ActionLink>
            </article>);
            }
            else {
              return null;
            }
          })
        }
      </div>
    );
  }

  renderTasks() {
    console.log("renderTasks this.props.tasks: " + this.props.tasks.length);
    if (this.props.tasks.length > 0) {
      const LatestTasks = this.renderLatestTasks();
      return (
        <div>
          <section className="feature-columns">          
            {LatestTasks}
          </section>
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderSearhForm() {
    const waitingText = (this.props.isFetchInProgress) ? <b>(Wait...)</b> : "";
    
    const TextInput = this.props.isFetchInProgress ? <h6>Searching...</h6> 
    : (
        <input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
          id="form-name" name="query" autoComplete="off"
            placeholder="Key in a job or a skill you are exploring" 
              onChange={(e) => this.HandleChange(e)} autoFocus/>
    );

    return (
      <form className="form-inline" action="#" onSubmit={(e) => this.handleStartSearch(e)}>
        <div className="form-group">
          {TextInput}
        </div>
      </form>
    );
  }

  render() {
    const SearchForm = this.renderSearhForm();
    const Tasks = this.renderTasks();

    return (
      <article id="intro" className="section-wrapper clearfix" 
        data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg5.jpg">
        {this.state.isDetailsOpen ? <DetailsPopup modalIsOpen={this.state.isDetailsOpen} 
          onCloseModal={()=>this.handleCloseModal()} task={this.state.currentTask}/> : null}
          <div className="clearfix" data-wow-delay="0.3s">
            <div className="col-sm-10 col-md-9 col-lg-10 pull-right">
                <section className="feature-text">
                  <h1>What should I learn next</h1>
                  <p>Soqqle helps you develop your learning map, connect with friends and earn by sharing your knowledge and experience</p>
                  {SearchForm}
                </section>
                <section className="feature-text">
                  {Tasks}
                </section>
            </div>
          </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  isFetchInProgress: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,

  setSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

const mapStateToProps = state => ({
  isFetchInProgress: state.isFetchInProgress,
  tasks: state.tasks,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);