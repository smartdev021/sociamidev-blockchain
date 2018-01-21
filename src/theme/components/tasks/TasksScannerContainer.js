/*
    author: Alexander Zolotov
*/
import React from 'react';

import NetworkTasks from './NetworkTasks'

import ActionLink from '~/src/components/common/ActionLink'

const TasksScannerContainer = (props) => {
    return(
      <div id="tasks-scanner-container">
            {!props.isExpanded &&
              <ActionLink id="tasks-scanner-expand" href="#" onClick={()=> props.onSetTreeScannerExpanded(true)}>
                <span className="glyphicon glyphicon-menu-left"></span>
              </ActionLink>
            }
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