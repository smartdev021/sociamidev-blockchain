/*
    author: Alexander Zolotov
*/
import React from 'react';

import MySubtasks from './MySubtasks'
import ActionLink from '~/src/components/common/ActionLink'

const MyTasks = (props) => {
    
    let filteredTasks = [];

    filteredTasks = props.tasks.filter(function(task) {
      return task.name && task.name != "";
    });

    console.log("MyTasks!!!!!!!!!!!");
    console.dir(filteredTasks);

    if (filteredTasks.length > 0) {
      const DummyImages = [
        "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/medium.png",
        "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/howcast.png",
      ];

      return (
        <div className="row">
          {
            filteredTasks.map(function(task, i) {
              return (
              <div className="col-md-12 col-lg-4" key={i}>
              {task.milestones ? 
                <div className="tasks-management-my-task">
                  <img src={DummyImages[Math.floor(Math.random() * (DummyImages.length - 0)) + 0]}></img>
                  <span>{task.name}</span>
                  <MySubtasks task={task} handleOpenCancelTaskDetailsPopup={(task)=>props.handleOpenCancelTaskDetailsPopup(task)}/>
                </div>
              :
                <ActionLink href="#" onClick={()=>props.handleOpenCancelTaskDetailsPopup(task)} className="tasks-management-my-task">
                  <span>{task.name}</span>
                </ActionLink>
              }  
              </div>
              );
            })
          }
        </div>
      );
    }
    else {
      return (<ul></ul>);
    }
}

export default MyTasks;