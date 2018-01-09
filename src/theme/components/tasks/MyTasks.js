/*
    author: Alexander Zolotov
*/
import React from 'react';

import MySubtasks from './MySubtasks'
import ActionLink from '~/src/components/common/ActionLink'

const RenderSingleTask = (task, i, props) => {
  const DummyImages = [
    "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/medium.png",
    "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/howcast.png",
  ];

  return (
    <div className="col-md-12 col-lg-4" key={i}>
    {task.milestones ? 
      <div className="tasks-management-my-task">
        <img src={DummyImages[Math.floor(Math.random() * (DummyImages.length - 0)) + 0]}></img>
        <span>{task.name}</span>
        <MySubtasks task={task} handleOpenCancelTaskDetailsPopup={(task)=>props.handleOpenCancelTaskDetailsPopup(task)}/>
      </div>
    :
      <div>
        <div href="#" onClick={()=>props.handleOpenCancelTaskDetailsPopup(task)} className="tasks-management-my-task">
          <span>{task.type == "hangout" ? `Hangout for skill "${task.metaData.subject.skill.name}." Creator: ${task.creator.firstName}` 
          : task.name}</span>
        </div>
      
        {/*(task.type == "hangout" && task.creator._id == props.currentUserID) && <ActionLink href="#" className="tasks-management-my-task"
          onClick={()=>props.onHangoutActionPerform("start", task)}>Start</ActionLink>
    */}
      </div>
    }  
    </div>
    );
}

const RenderTasks = (tasks, props) => {
  return (
    <div className="row">
      {
        tasks.map(function(task, i) {
          return RenderSingleTask(task, i, props);
        })
      }
    </div>
  );
}

const RenderSingleHangout = (hangout, i, props) => {
  if (props.selectedCategory.type == "requested_hangouts") {
    const FirstPendingParticipant = hangout.metaData.participants.find(function(participant){
      return participant.status == "pending";
    });

    if (FirstPendingParticipant) {
      return(
        <li key={i}>
          {
            <span>
              {FirstPendingParticipant.user.firstName} (level 5) wants to join your {hangout.metaData.subject.roadmap.name} Hangout
            </span>
          }
          <span>
            <ActionLink href="#" onClick={()=>props.onHangoutRequestAccept(hangout, FirstPendingParticipant.user)}>Accept</ActionLink>
            <ActionLink href="#" onClick={()=>props.onHangoutRequestReject(hangout, FirstPendingParticipant.user)}>Reject</ActionLink>
          </span>
        </li>
      );
    }
    else if (hangout.metaData.participants.length > 1) {
      return(
        <li key={i}>
          {
            <span>
               Your hangout ({hangout.metaData.subject.roadmap.name}) has no new meets.
            </span>
          }
        </li>
      );
    }
    else {
      return(
        <li key={i}>
          {
            <span>
               Your hangout ({hangout.metaData.subject.roadmap.name}) has not received any meets yet.
            </span>
          }
        </li>
      );
    }
  }
  else {
    return(
      <li key={i}>
        You've requested to join a Hangout on a roadmap {hangout.metaData.subject.roadmap.name}
      </li>
    );
  }
  
};

const RenderHangouts = (hangouts, props) => {

  console.log("MyHangouts!!!!!!!!!!!");
  console.dir(hangouts);
 
  if (hangouts.length > 0) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div id="my-hangouts">
            <h3>My Hangouts</h3>
          </div>
        </div>
        <div className="col-lg-12">
          <div id="my-hangouts-list">
            <ul>
              {
                hangouts.map(function(hangout, i){
                  return (RenderSingleHangout(hangout, i, props));
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div id="my-hangouts">
            <h1>My Hangouts</h1>
          </div>
        </div>
      </div>
    );
  }
}

const MyTasks = (props) => {
    
    let filteredTasks = [];

    filteredTasks = props.tasks.filter(function(task) {
      return task.name && task.name != "";
    });

    if (filteredTasks.length > 0) {
      if ((props.selectedCategory.type == "requested_hangouts" || props.selectedCategory.type == "requests_sent_hangouts")) {
        return RenderHangouts(filteredTasks, props);
      }
      else {
        return RenderTasks(filteredTasks, props);
      }
    }
    else {
      return (<ul></ul>);
    }
}

export default MyTasks;