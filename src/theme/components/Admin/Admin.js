import React, { Component, useRef } from "react";
import plus from "~/src/theme/images/plus.png";
import cross from "~/src/theme/images/cross.png";
import cloud from "~/src/theme/images/cloud.png";
import deleteimg from "~/src/theme/images/delete.png";
import ConfigMain from "~/configs/main";
import Axios from "axios";

import "~/src/theme/css/teams.css";
import "~/src/theme/css/darkTheme.css";
import "~/src/theme/css/lightTheme.css";
import AddRole from "~/src/theme/components/Admin/AddRole";
import "react-datepicker/dist/react-datepicker.css";
import UserGuides from "./UserGuides";

const profilePic =
  "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "MyChallenges",
      editableStoryKey: "",
      editableStoryIndex: "",
      RoleData: [],
      page: "view",
      modifiedData: undefined,
      deleteItems: [],
      activeTab: 'users',
    };

    this.handleStoryInputClick = this.handleStoryInputClick.bind(this);
    this.handleStoryDataChange = this.handleStoryDataChange.bind(this);
    this.onClickEditable = this.onClickEditable.bind(this);
    this.pageSwitch = this.pageSwitch.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onAddRecord = this.onAddRecord.bind(this);
    this.onRemoveRecords = this.onRemoveRecords.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
  }

  handleStoryInputClick(e) {
    e.stopPropagation();
  }

  deleteUsers() {
    if (this.state.deleteItems.length > 0) {
      Axios.delete(`${ConfigMain.getBackendURL()}/userRoles`, {
        data: { ids: this.state.deleteItems }
      })
        .then(response => {
          var that = this;
          Axios.get(`${ConfigMain.getBackendURL()}/userRoles`)
            .then(function(response) {
              if (response.data) {
                that.setState({ RoleData: response.data });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(err => {
          this.setState({ message: "Cannot delete" });
        });
    }
  }

  handleCheckbox(event) {
    let items = this.state.deleteItems;
    if (event.target.checked == true) {
      items.push(event.target.id.toString());
    } else {
      items = items.filter(function(a) {
        return a != event.target.id;
      });
    }

    this.setState({ deleteItems: items });

    event.stopPropagation();
  }

  handleStoryDataChange(e) {
    let storyParent = e.currentTarget.dataset.indexparent;
    let storyChild = "";
    if (e.currentTarget.dataset.indexchild) {
      storyChild = e.currentTarget.dataset.indexchild;
    }
    let index = this.state.editableStoryIndex;
    let storiesCopy = JSON.parse(JSON.stringify(this.state.RoleData));
    if (storyChild === "") {
      storiesCopy[index][storyParent] = e.currentTarget.value;
    } else {
      storiesCopy[index][storyParent][storyChild] = e.currentTarget.value;
    }

    if (!Array.isArray(storiesCopy[index].role)) {
      storiesCopy[index].role = storiesCopy[index].role.split(",");
    }

    this.setState({
      RoleData: storiesCopy,
      modifiedData: storiesCopy[index]
    });
  }

  /* Handle Editable TR click event */
  onClickEditable(e) {
    if (this.state.editableStoryKey != e.currentTarget.dataset.key) {
      this.setState({
        storiesDataBackup: this.state.storiesData,
        editableStoryKey: e.currentTarget.dataset.key,
        editableStoryIndex: e.currentTarget.dataset.index
      }); //make tr editable in story table
    } else {
      if (this.state.modifiedData) {
        Axios.put(
          `${ConfigMain.getBackendURL()}/userRole/${
            this.state.modifiedData._id
          }`,
          {
            email: this.state.modifiedData.email,
            role: this.state.modifiedData.role,
            category: this.state.modifiedData.category,
            sub_category: this.state.subCategory,
            start_date: new Date(this.state.modifiedData.start_date),
            end_date: new Date(this.state.modifiedData.end_date)
          }
        )
          .then(response => {})
          .catch(err => {});
      }
      this.setState({ editableStoryKey: "", editableStoryIndex: "" }); //make tr non-editable on doubleclick
    }
  }

  handleAddRoleClose() {
    this.setState({ page: "view" });
  }

  handleAddRoleSubmit() {
    var that = this;
    const url = `${ConfigMain.getBackendURL()}/userRoles`;
    Axios.get(url)
      .then(function(response) {
        if (response.data) {
          that.setState({ RoleData: response.data });
          that.setState({ page: "view" });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUserRoles() {
    if (this.state.RoleData.length < 1) {
      var that = this;
      const url = `${ConfigMain.getBackendURL()}/userRoles`;
      Axios.get(url)
        .then(function(response) {
          if (response.data) {
            that.setState({ RoleData: response.data });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  pageSwitch() {
    this.getUserRoles();
    if (this.state.page == "view") {
      if (this.state.RoleData.length > 0) {
        return (
            <div id="stories" className="theme-box-right admin-list-inner">
              <div className="box" style={{ padding: "1px" }}>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th />
                        <th>Email</th>
                        <th>Role</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Startdate</th>
                        <th>EndDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {_.map(this.state.RoleData, (que, index) => {
                        if (this.state.editableStoryKey === que._id) {
                          return (
                            <tr
                              key={que._id}
                              data-key={que._id}
                              data-index={index}
                              onClick={this.onClickEditable}
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  name={que._id}
                                  id={que._id}
                                  onClick={event => this.handleCheckbox(event)}
                                />
                              </td>
                              <td>
                                <input
                                  onClick={this.handleStoryInputClick}
                                  onChange={this.handleStoryDataChange}
                                  data-indexParent="email"
                                  value={que.email}
                                />
                              </td>
                              <td>
                                <input
                                  onClick={this.handleStoryInputClick}
                                  onChange={this.handleStoryDataChange}
                                  data-indexParent="role"
                                  value={que.role}
                                />
                              </td>
                              <td>
                                <input
                                  onClick={this.handleStoryInputClick}
                                  onChange={this.handleStoryDataChange}
                                  data-indexParent="category"
                                  value={que.category}
                                />
                              </td>
                              <td>
                                <input
                                  onClick={this.handleStoryInputClick}
                                  onChange={this.handleStoryDataChange}
                                  data-indexParent="sub_category"
                                  value={que.sub_category}
                                />
                              </td>
                              <td>
                                <input
                                  onClick={this.handleStoryInputClick}
                                  onChange={this.handleStoryDataChange}
                                  data-indexParent="start_date"
                                  value={que.start_date}
                                />
                              </td>
                              <td>
                                <input
                                  onClick={this.handleStoryInputClick}
                                  onChange={this.handleStoryDataChange}
                                  data-indexParent="end_date"
                                  value={que.end_date}
                                />
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              key={que._id}
                              data-key={que._id}
                              data-index={index}
                              onClick={this.onClickEditable}
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  name={que._id}
                                  id={que._id}
                                  onClick={event => this.handleCheckbox(event)}
                                />
                              </td>
                              <td>{que.email}</td>
                              <td>{que.role.join(",")}</td>
                              <td>{que.category}</td>
                              <td>{que.sub_category}</td>
                              <td>{que.start_date}</td>
                              <td>{que.end_date}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        );
      }
    } else {
      return (
        <AddRole
          theme={this.props.userProfile.theme.toLowerCase()}
          onSubmit={() => this.handleAddRoleSubmit()}
          onClose={() => this.handleAddRoleClose()}
        />
      );
    }
  }

  onChangeTab(activeTab) {
    this.setState({activeTab})
  }

  onAddRecord() {
    const {activeTab} = this.state;
    if (activeTab === 'users') {
      this.setState({ page: "add" });
    } else if (this.child) {
      this.child.addNewStep({});
    }
  }

  onRemoveRecords() {
    const {activeTab} = this.state;
    if (activeTab === 'userGuides') {
      this.child.removeSteps();
    }
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div
        className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper settings-wrapper main-bg profile-wrapper`}
      >
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <div className="col-box-wp wider-strip mb-20 p-0">
                    <ul className="tab-wp">
                      <li onClick={()=> this.onChangeTab('users')} className={activeTab === 'users'?'active':''}><a href="#">Users</a></li>
                      <li onClick={()=> this.onChangeTab('userGuides')} className={activeTab === 'userGuides'?'active':''}><a>User Guides</a></li>
                      <li style={{ float: "right" }}>
                        <a title="Add new item"><img
                          style={{ marginLeft: "7px" }}
                          onClick={() => this.onAddRecord()}
                          src={plus}
                        />
                        </a>
                        <a title="Remove selected item(s)"><img style={{ marginLeft: "7px" }} src={cross} onClick={() => this.onRemoveRecords()} /></a>
                        {activeTab === 'users' && <a><img
                          style={{ marginLeft: "7px" }}
                          onClick={this.deleteUsers}
                          src={deleteimg}
                        /></a>}
                      </li>
                    </ul>
                </div>
                {activeTab === 'users' && this.pageSwitch()}
                {activeTab === 'userGuides' && <UserGuides onRef={ref => (this.child = ref)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
