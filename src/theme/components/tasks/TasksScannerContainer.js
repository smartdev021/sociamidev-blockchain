/*
    author: Alexander Zolotov
*/
import React from 'react';

import NetworkTasks from './NetworkTasks'

const TasksScannerContainer = (props) => {
    return(
      <div id="tasks-scanner-container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="content-2-columns-right-title">Network tasks scanner</div>
                </div>
              </div>
              <div id="tasks-scanner-container-bg">
              <div className="row">
                <div className="col-lg-12">
                  <div id="tasks-scanner-description">
                    <p>Complete network quests to earn tokens</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div id="scanner-input-container">
                    <input type="text" autoComplete="off" id="scanner_trees" placeholder="" onChange={(e) => props.handleChange(e)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <NetworkTasks 
                    tasks={props.tasks}
                    scannerQuery={props.scannerQuery}
                    currentUserID={props.currentUserID}
                    handleOpenConfirmTaskDetailsPopup={(task)=>props.handleOpenConfirmTaskDetailsPopup(task)}
                  />
                </div>
              </div>
              </div>
            </div>
          </div>);
}

export default TasksScannerContainer;