/*
    author: Alexander Zolotov
*/
import React from 'react';

const ProjectsScanner = (props) => {
  return (
    <div id="project-manager-project-scanner-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="content-2-columns-right-title">Project Scanner</div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p id="project-scanner-text">
              You are not involved in other campaigns. Check out and get involved with other soqqle projects.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div id="scanner-input-container">
              <input type="text" autoComplete="off" id="scanner_trees" placeholder=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsScanner;