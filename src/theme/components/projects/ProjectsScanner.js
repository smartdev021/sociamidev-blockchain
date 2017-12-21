/*
    author: Alexander Zolotov
*/
import React from 'react';

import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

const CategoryAll = 'All projects';
const CategoryFriends = 'Friend projects';

const Categories = [CategoryAll, CategoryFriends];

class ProjectsScanner extends React.Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selectedCategoryIndex: 0,
        searchQuery: "",
        projectsAll: [],
        projectsFriends: [],
      }
    }

    getAllProjects() {
      const currentUserId = this.props.currentUserId;

      const filterFunction = (project)=> {
        return project.userID != currentUserId;
      }

      return this.props.projects.filter(filterFunction);
    }

    refreshProjects() {
      if (this.props.isAuthorized) {
        const allProjects = this.getAllProjects();
        
        const userFriends = this.props.userFriends;
        
        const filterFriendsProjects = (project) => {
          console.log("filterFriendsProjects");
          console.dir(project);
          return userFriends.friends.findIndex(function(friend) {return friend.id == project.userID}) != -1;
        }

        console.log("Refresh projects");
        console.dir(userFriends);
        
        const friendsProjects = allProjects.filter(filterFriendsProjects);
              
        this.setState({projectsAll: allProjects, projectsFriends: friendsProjects});
      }
      else {
        this.setState({projectsAll: this.props.projects, projectsFriends: []});
      }
    }

    toggleCategory() {
      this.setState({selectedCategoryIndex: (this.state.selectedCategoryIndex + 1) % Categories.length})
    }

    handleSearchQueryChange(e) {
      e.preventDefault();

      this.setState({searchQuery: e.target.value})
    }

    componentWillMount() {
      this.refreshProjects();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.isAuthorized != this.props.isAuthorized || this.props.projects != prevProps.projects) {
        this.refreshProjects();
      }

      if (prevState.selectedCategoryIndex != this.state.selectedCategoryIndex) {
        this.refreshProjects();
      }
    }

    renderProjects(props) {
      let ProjectsFiltered = Categories[this.state.selectedCategoryIndex] == CategoryFriends ? this.state.projectsFriends : this.state.projectsAll;

      const SerchQuery = this.state.searchQuery;

      if (SerchQuery != "") {
        const filterBySearchQuery = (project) => {
          return project.name.toLowerCase().startsWith(SerchQuery.toLowerCase());
        }

        ProjectsFiltered = ProjectsFiltered.filter(filterBySearchQuery);
      }

      return (
        <ul id="project-scanner-list-projects">
          {
            ProjectsFiltered.map(function(project, i) {
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

    render() {
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
                  <input type="text" autoComplete="off" id="scanner_trees" placeholder="" onChange={(e)=>this.handleSearchQueryChange(e)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div id="project-scanner-category-switch">
                  <ActionLink onClick={()=>this.toggleCategory()}>{Categories[this.state.selectedCategoryIndex]}</ActionLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div id="project-scanner-list-projects-container">
                  {this.renderProjects(this.props)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }


export default ProjectsScanner;