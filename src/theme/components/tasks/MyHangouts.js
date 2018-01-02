/*
    author: Alexander Zolotov
*/
import React from 'react';

import MySubtasks from './MySubtasks'
import ActionLink from '~/src/components/common/ActionLink'

const MyHangouts = (props) => {
    
    let filteredTasks = [];

    filteredTasks = props.tasks.filter(function(task) {
      return task.name && task.name != "";
    });

    console.log("MyHangouts!!!!!!!!!!!");
    console.dir(filteredTasks);

    if (filteredTasks.length > 0) {
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
    else {
      return (<ul></ul>);
    }
}

export default MyHangouts;