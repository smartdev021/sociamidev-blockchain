/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActivityTypes from "~/src/common/ActivityTypes"

const RenderDummyFriends = false;

class TasksMy extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTasks() {
      if (!this.props.tasks || this.props.tasks.length == 0) {
          return null;
      }
      

      return this.props.tasks.map(function(task, i) {
          return (
            <div className="col-deep col-sm-6" key={i}>
            <div className="item-deep">
            <div className="deep-content">
                <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                <p>{`Skill: ${task.name}`}</p>
                <p>Time: Tomorrow, 1am</p>
            </div>
            <div className="deep-tools">
                <ul>
                    <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                    <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                    <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                </ul>
            </div>
        </div>
        </div>
          )
      });
  }

  render() {
    return (<div className="scrollbar-inner">
    <div className="block-deepdive">
        <div className="scrollbar-inner">
        <div className="row">
            {this.renderTasks()}
        </div>
          </div>
    </div>
</div>
    );
  }
}

TasksMy.propTypes = {
}

export default TasksMy;