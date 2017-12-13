/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

const MySubtasks = (props) => {
    const project = props.task;

    if (project.milestones && project.milestones.length > 0) {
      return (
        <div id="subtasks">
        {project.milestones.map(function(milestone, i) {
              return (
                <ActionLink key={i} href="#" onClick={()=>props.handleOpenCancelTaskDetailsPopup(milestone)}>
                  <div className="subtask"><span>{milestone.name}</span></div>
                </ActionLink>
              );
            })
        }
      </div>
      );
    }
    else {
      return (<div id="subtasks">
    </div>);
    }
}

export default MySubtasks;