import React, { Component } from "react";
import Axios from "axios";
import ConfigMain from "~/configs/main";
import ActionLink from "~/src/components/common/ActionLink";

import "~/src/theme/css/darkTheme.css";
import "~/src/theme/css/lightTheme.css";
import "~/src/theme/css/teams.css";

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

export class AddRole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      role: "",
      category: "",
      subCategory: "",
      startDate: moment(),
      endDate: moment(),
      tags: []
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateSubCategory = this.updateSubCategory.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  handleTagsChange(tags) {
    this.setState({ tags });
  }

  handleStartChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndChange(date) {
    this.setState({
      endDate: date
    });
  }

  updateEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  updateRole(event) {
    this.setState({
      role: event.target.value
    });
  }

  updateCategory(event) {
    this.setState({
      category: event.target.value
    });
  }

  updateSubCategory(event) {
    this.setState({
      subCategory: event.target.value
    });
  }

  updateStartDate(event) {
    this.setState({
      startDate: event.target.value
    });
  }

  updateEndDate(event) {
    this.setState({
      endDate: event.target.value
    });
  }

  handleClose() {
    this.props.onClose();
  }

  submitUser() {
    Axios.post(`${ConfigMain.getBackendURL()}/userRoles`, {
      email: this.state.email,
      role: this.state.tags,
      category: this.state.category,
      sub_category: this.state.subCategory,
      start_date: this.state.startDate,
      end_date: this.state.endDate
    })
      .then(response => {
        this.props.onSubmit();
      })
      .catch(err => {
        this.setState({
          message: "* Name, Description, Success are mandatory"
        });
      });
  }

  render() {
    return (
      <div
        className={`${
          this.props.theme
        }-theme-wrapper challenges-top profile-wrapper mychallenges-wrapper main-bg`}
      >
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <div>
                  <div className="col-middle admin-list ml-fixed">
                    <ActionLink
                      href="#"
                      className="modal-close-button"
                      onClick={() => this.handleClose()}
                    />
                    <div className="col-box-wp black-bg">
                      <h4 className="top-heading">Add User</h4>
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            value={this.state.email}
                            onChange={this.updateEmail}
                            type="text"
                            className="form-control form-input-admin"
                            placeholder="Email"
                          />
                        </div>

                        <div className="col-sm-12 tags-margin">
                          <TagsInput
                            value={this.state.tags}
                            inputProps={{ placeholder: "Add roles" }}
                            onChange={this.handleTagsChange}
                          />
                        </div>

                        <div className="col-sm-12">
                          <input
                            value={this.state.category}
                            onChange={this.updateCategory}
                            className="form-control form-input-admin"
                            placeholder="Category"
                            className="form-control"
                            rows="3"
                          />
                        </div>

                        <div className="col-sm-12">
                          <input
                            value={this.state.subCategory}
                            onChange={this.updateSubCategory}
                            className="form-control form-input-admin"
                            placeholder="Sub Category"
                            className="form-control"
                            rows="3"
                          />
                        </div>

                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-sm-4 pr-7 pt-3">
                              <span className="form-input-admin">
                                Start Date{" "}
                              </span>
                              <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartChange}
                              />
                            </div>

                            <div className="col-sm-4 pr-7 pt-3">
                              <span className="form-input-admin">
                                End Date{" "}
                              </span>
                              <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-12 text-center">
                          <button
                            onClick={() => this.submitUser()}
                            className="yellow-btn mtb-1"
                          >
                            + Add User
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRole;
