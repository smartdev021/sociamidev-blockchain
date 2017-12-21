/*
    author: Alexander Zolotov
*/
import React from 'react';

import {Link} from 'react-router-dom'

const renderProjects = (props) => {
  const currentUserId = props.currentUserId;
  
  const filterProjectsAll = (project) => {
    return project.userID != currentUserId;
  }
        
  const projectsFiltered = props.projects.filter(filterProjectsAll);

  return (
    <ul id="project-scanner-list-projects">
      {
        projectsFiltered.map(function(project, i) {
          return (<li key={i}>
          <div className="project-scanner-list-item">
            <Link to={`/projectBrowser?id=${project._id}`}>{project.name}</Link>
          </div>
        </li>);
        })
      }
    </ul>
  );
}

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
        <div className="row">
          <div className="col-lg-12">
            <div id="project-scanner-list-projects-container">
              {renderProjects(props)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsScanner;