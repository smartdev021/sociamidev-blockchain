/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActivityTypes from "~/src/common/ActivityTypes"

const RenderDummyFriends = false;

import ActionLink from '~/src/components/common/ActionLink'

import TaskTypes from "~/src/common/TaskTypes"

const DayFromNumber = (dayNum)=> {
  const DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return DayNames[dayNum];
}

const MonthFromNumber = (monthNum)=> {
  const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];

  return MonthNames[monthNum];
}

const Hours12 = (date) => { return (date.getHours() + 24) % 12 || 12; }

const RenderSingleTask = (task, i, props)=> {
  console.log("Render Single Task");
  if (task.type == TaskTypes.HANGOUT) {
    const date = new Date(task.metaData.time);

    const dateNow = new Date(Date.now());
    const dateTomorrow = new Date(Date.now() + (60 * 60 * 24));

    const Noon = new Date(date.getFullYear(), date.getMonth(),date.getDate(), 12, 0, 0);
    const AmPm = (date.getTime() < Noon.getTime()) ? 'am' : 'pm';

    const Hours = String(Hours12(date)) + AmPm;
    let time = "";

    if (dateNow.getDate() == date.getDate() && dateNow.getMonth() == date.getMonth() && dateNow.getFullYear() == date.getFullYear()) {
      time = `${Hours} today`;
    }
    else if (dateTomorrow.getDate() == date.getDate() && dateTomorrow.getMonth() == date.getMonth() && dateTomorrow.getFullYear() == date.getFullYear()) {
      time = `${Hours} tomorrow`;
    }
    else {
      time = `${Hours} on ${DayFromNumber(date.getDay())} (${date.getDate()} ${MonthFromNumber(date.getMonth())})`; 
    }
    
    return (
    <div className="col-tokens col-sm-12" key={i}>
      <div className="item-tokens tokens-red">
      <h4><a href="#" className="link-red">{task.creator.firstName}</a> {` is looking to hangout to discuss ${task.metaData.subject.roadmap.name} at ${time}`}
     </h4>
     <p className="text-1">Alex is in your wider network</p>
     <p className="text-2">Earn up to 10 tokens completing this task</p>
     <div className="token-bottom">
      {!task.isLocked ? <ActionLink href="#" className="btn-bg-red" data-toggle="modal" 
        data-target="#token" onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
          <span className="font-small">Register for</span></ActionLink>
          :
          <span className="tasks-scanner-task-locked-icon glyphicon glyphicon-lock">Locked</span>}
     </div>
   </div>
   </div>
    );
  }
  else {
    if (!task.creator) {
      console.log("%cNo Creator For Task", "color:orange; background:grey;");
      console.dir(task);
    }

    return (
      <div className="col-tokens col-sm-12" key={i}>
        <div className="item-tokens tokens-red">
        <h4>{task.name}</h4>
       <p className="text-1">{task.creator.firstName} is in your wider network</p>
       <p className="text-2">Earn up to 10 tokens completing this task</p>
       <div className="token-bottom">
        {!task.isLocked ? <ActionLink href="#" className="btn-bg-red" data-toggle="modal" data-target="#token" 
          onClick={()=>props.handleOpenConfirmTaskDetailsPopup(task)}>
            <span className="font-small">Register for</span></ActionLink>
            :
            <span className="tasks-scanner-task-locked-icon glyphicon glyphicon-lock">Locked</span>}
       </div>
     </div>
     </div>
      );
  }
};

class TaskScanner extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTasks() {
    console.log("%cRender Tasks:", "background:cyan;color:white;font-size:16px;");
    let foundTasks = [];
  
    const scannerQuery = this.props.scannerQuery.toLowerCase();

    console.log("scannerQuery: " + scannerQuery);

    console.log("this.props.tasks: ");
    console.dir(this.props.tasks);
  
    if (scannerQuery != "") {
      foundTasks = this.props.tasks.filter(function(task) {
        return (this.props.currentUserID == undefined || task.userID != this.props.currentUserID) 
          && task.name && task.name.toLowerCase().startsWith(scannerQuery);
      });
    }
    else {
      foundTasks = this.props.tasks;
    }

    console.log("foundTasks: ");
    console.dir(foundTasks);
  
    let that = this;
    
      if (foundTasks.length == 0) {
          return null;
      }
      else {
          return foundTasks.map(function(task, i) {
              return RenderSingleTask(task, i, that.props)
          });
      }
  }

  render() {
    return (<div className="block-tokens">
    <div className="expanding">
        <a href="#" className="open-expanding"><Icon name="chevron-left" aria-hidden="true"></Icon></a>
        <a href="#" className="close-expanding"><Icon name="chevron-right" aria-hidden="true"></Icon></a>
    </div>

    <div className="expanding expanding-mobile">
        <a href="#" className="open-expanding"><Icon name="chevron-left" aria-hidden="true"></Icon></a>
        <a href="#" className="close-expanding"><Icon name="chevron-right" aria-hidden="true"></Icon></a>
    </div>

    <div className="bt-search">
        <a href="#" className="icon-search">
            <Icon name="search" aria-hidden="true"></Icon>
        </a>

        <div className="block-search">
            <div className="close-search">
                <a href="#"><Icon name="times" aria-hidden="true"></Icon></a>
            </div>
            <div className="form-search-tokens">
                <div id="imaginary_container">
                    <div className="input-group stylish-input-group">
                        <input type="text" className="form-control input-text"  placeholder="Search" />
                        <span className="input-group-addon">
                            <button type="submit">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="box-head">
        <h1 className="text-heading heading-border">
            <span>Complete quests to earn tokens</span>
        </h1>
    </div>

    <div className="box-location clearfix">
        <div className="text-location">
            <span>Hong Kong Island</span>
        </div>
    </div>


      <div className="scrollbar-inner clearfix">
        <div className="wrapper-tokens clearfix">
            <div className="scrollbar-inner clearfix">
              {this.renderTasks()}
            </div>
        </div>
    </div>
</div>
    );
  }
}

TaskScanner.propTypes = {
}

export default TaskScanner;