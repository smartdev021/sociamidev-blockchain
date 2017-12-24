/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'
import DetailsPopup from '~/src/theme/components/DetailsPopupLatestTask';

import ProgressionTreesLanding from '~/src/theme/ProgressionTreesLanding';
import TaskManagement from '~/src/theme/TaskManagement';

import {
  setSearchQuery,
} from '~/src/redux/actions/fetchResults'

const MAX_LATEST_TASKS = 3;
const TaskTypesToNameMap = {find_mentor: "Find Mentor",};

import "~/src/theme/css/homePage.css"

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
    this.props.onFetchAllTasks(false);
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

    let publishedTasks = [];
    
    publishedTasks = this.props.tasks.filter(function(task) {
      return !task.isHidden;
    });
    
    let latestTasks = publishedTasks.slice(0).sort(function(a, b) {
      return b.creationDate - a.creationDate;
    });

    return (
      <div className="row">
        {
          latestTasks.map(function(task, i) {
            if (i < MAX_LATEST_TASKS) {
              return (<div className="col-lg-4" key={i}>
              <ActionLink href='#' className="latest-task-tile" onClick={()=> that.onViewTaskAuthor(task)}>
                <div>
                <p>{that.taskTypeToName(task.type)}</p>
                  <p >{task.roadmapName ? task.roadmapName : task.name}</p>
                </div>
              </ActionLink>
            </div>);
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
        this.renderLatestTasks()
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
        <input type="text" id="search-query" name="query" autoComplete="off"
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
    //const SearchForm = this.renderSearhForm();
    const Tasks = this.renderTasks();

    return (
      <div id="main-content_1">
        <div id="wrapper-home-page">
        
          {this.state.isDetailsOpen ? <DetailsPopup modalIsOpen={this.state.isDetailsOpen} 
            onCloseModal={()=>this.handleCloseModal()} task={this.state.currentTask}/> : null}
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                     {this.props.isFetchInProgress ? <h1>Searching... <Icon spin name="spinner"/></h1> : <h1>What should I learn next</h1>}
                    <p>Soqqle helps you develop your learning map, connect with friends and earn by sharing your knowledge and experience</p>
                  </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <ProgressionTreesLanding />
                </div>
                <div className='col-lg-6'>
                  <TaskManagement />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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