import React, { Component } from 'react';
import Axios from 'axios';
import ConfigMain from '~/configs/main';
import ActionLink from '~/src/components/common/ActionLink';

export class AddChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidationClose: true,
      validation: '3rd party basic',
      isRewardClose: true,
      isCompanyClose: true,
      isAccessClose: true,
      isRefreshClose: true, 
      reward: 'Token',
      company: 'Soqqle1',
      access: 'private',
      refresh: 'Daily',
      name: '',
      description: '',
      success: '',
      rewardValue: '',
      quota: ''
    };
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateSuccess = this.updateSuccess.bind(this);
    this.updateQuota = this.updateQuota.bind(this);
    this.updateRewardValue = this.updateRewardValue.bind(this);
  }

  toggleValidationState() {
    this.setState({
      isValidationClose: !this.state.isValidationClose
    });
  }

  updateDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }

  updateSuccess(event) {
    this.setState({
      success: event.target.value
    });
  }

  updateRewardValue(event) {
    this.setState({
      rewardValue: event.target.value
    });
  }

  handleClose() {
    this.props.onClose();
  }

  updateQuota(event) {
    this.setState({
      quota: event.target.value
    });
  }

  submitChallenges() {
    if (this.state.name == '' || this.state.description == '' || this.state.success == '') {
      this.setState({ message: '* Name, Description, Success are mandatory' });
      return;
    }
    var soqqleAuthorisation = JSON.parse(localStorage.soqqleAuth);
    var userId = soqqleAuthorisation.userID || soqqleAuthorisation.faceBookID || soqqleAuthorisation.linkedInID;
    Axios.post(`${ConfigMain.getBackendURL()}/challenges`, {
      userID: userId,
      name: this.state.name,
      description: this.state.description,
      success: this.state.success,
      validation: this.state.validation,
      reward: this.state.reward,
      rewardValue: this.state.rewardValue,
      company: this.state.company,
      refresh: this.state.refresh,
      quota: this.state.quota,
      access: this.state.access
    })
      .then(response => {
        this.setState({ message: null });
        this.props.onSubmit();
      })
      .catch(err => {
        this.setState({ message: '* Name, Description, Success are mandatory' });
      });
  }

  selectValidation(validation) {
    this.setState({
      isValidationClose: !this.state.isValidationClose,
      validation: validation
    });
  }

  renderValidationSelect(options) {
    return (
      <div className="custom-select challenge-select">
        <select>
          {options.map((validation, i) => {
            return(
              <option value={ validation.value } key={ i }>{ validation.label }</option>
            )
          })}
        </select>
        <div
          className={ !this.state.isValidationClose ? 'select-selected select-arrow-active' : 'select-selected' }
          onClick={ () => this.toggleValidationState() }>
          { this.state.validation }
        </div>

        <div
          className={ this.state.isValidationClose ? 'select-items select-hide' : 'select-items' }>
          {options.map((validation, i) => {
            return(
              <div
                onClick={ () => this.selectValidation(validation.label) } key={ i }>
                { validation.label }
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  toggleRewardState() {
    this.setState({
      isRewardClose: !this.state.isRewardClose
    });
  }

  selectReward(reward) {
    this.setState({
      isRewardClose: !this.state.isRewardClose,
      reward: reward
    });
  }

  renderRewardSelect(options) {
    return (
      <div className="custom-select challenge-select">
        <select>
          {options.map((reward, i) => {
            return(
              <option value={ reward.value } key={ i }>{ reward.label }</option>
            )
          })}
        </select>
        <div
          className={ !this.state.isRewardClose ? 'select-selected select-arrow-active' : 'select-selected' }
          onClick={ () => this.toggleRewardState() }>
          { this.state.reward }
        </div>

        <div
          className={ this.state.isRewardClose ? 'select-items select-hide' : 'select-items' }>
          {options.map((reward, i) => {
            return(
              <div
                onClick={ () => this.selectReward(reward.label) } key={ i }>
                { reward.label }
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  toggleCompanyState() {
    this.setState({
      isCompanyClose: !this.state.isCompanyClose
    });
  }

  selectCompany(company) {
    this.setState({
      isCompanyClose: !this.state.isCompanyClose,
      company: company
    });
  }

  renderCompanySelect(options) {
    return (
      <div className="custom-select challenge-select">
        <select>
          {options.map((company, i) => {
            return(
              <option value={ company.value } key={ i }>{ company.label }</option>
            )
          })}
        </select>
        <div
          className={ !this.state.isCompanyClose ? 'select-selected select-arrow-active' : 'select-selected' }
          onClick={ () => this.toggleCompanyState() }>
          { this.state.company }
        </div>

        <div
          className={ this.state.isCompanyClose ? 'select-items select-hide' : 'select-items' }>
          {options.map((company, i) => {
            return(
              <div
                onClick={ () => this.selectCompany(company.label) } key={ i }>
                { company.label }
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  toggleAccessState() {
    this.setState({
      isAccessClose: !this.state.isAccessClose
    });
  }

  selectAccess(access) {
    this.setState({
      isAccessClose: !this.state.isAccessClose,
      access: access
    });
  }

  renderAccessSelect(options) {
    return (
      <div className="custom-select challenge-select">
        <select>
          {options.map((access, i) => {
            return(
              <option value={ access.value } key={ i }>{ access.label }</option>
            )
          })}
        </select>
        <div
          className={ !this.state.isAccessClose ? 'select-selected select-arrow-active' : 'select-selected' }
          onClick={ () => this.toggleAccessState() }>
          { this.state.access }
        </div>

        <div
          className={ this.state.isAccessClose ? 'select-items select-hide' : 'select-items' }>
          {options.map((access, i) => {
            return(
              <div
                onClick={ () => this.selectAccess(access.label) } key={ i }>
                { access.label }
              </div>
            )
          })}
        </div>
      </div>
    );
  }


  toggleRefreshState() {
    this.setState({
      isRefreshClose: !this.state.isRefreshClose
    });
  }

  selectRefresh(refresh) {
    this.setState({
      isRefreshClose: !this.state.isRefreshClose,
      refresh: refresh
    });
  }

  renderRefreshSelect(options) {
    return (
      <div className="custom-select challenge-select">
        <select>
          {options.map((refresh, i) => {
            return(
              <option value={ refresh.value } key={ i }>{ refresh.label }</option>
            )
          })}
        </select>
        <div
          className={ !this.state.isRefreshClose ? 'select-selected select-arrow-active' : 'select-selected' }
          onClick={ () => this.toggleRefreshState() }>
          { this.state.refresh }
        </div>

        <div
          className={ this.state.isRefreshClose ? 'select-items select-hide' : 'select-items' }>
          {options.map((refresh, i) => {
            return(
              <div
                onClick={ () => this.selectRefresh(refresh.label) } key={ i }>
                { refresh.label }
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-middle ml-fixed">
      <ActionLink href="#" className="modal-close-button" onClick={ () => this.handleClose() } />
        <div className="col-box-wp black-bg">
          <h4 className="top-heading">Add Challenge</h4>
            <div className="row">
              <div className="col-sm-12">
                <input value={this.state.name} onChange={this.updateName} type="text" className="form-control" placeholder="Name" />
              </div>
              <div className="col-sm-12">
                <textarea value={this.state.description} onChange={this.updateDescription} className="form-control" placeholder="Description" className="form-control" rows="3"></textarea>
              </div>
              <div className="col-sm-12">
                <textarea value={this.state.success} onChange={this.updateSuccess} className="form-control" placeholder="Success" className="form-control" rows="3"></textarea>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-4 pr-7 pt-3">
                    {
                      this.renderCompanySelect([
                        { value: "Soqqle1", label: "Soqqle1" },
                        { value: "Soqqle", label: "Soqqle" },
                        { value: "Soqqle2", label: "Soqqle2" }
                      ])
                    }
                  </div>

                  <div className="col-sm-4 pr-7 pl-7 pt-3">
                    {
                      this.renderRewardSelect([
                        { value: "Token", label: "Token" },
                        { value: "Achievement", label: "Achievement" },
                        { value: "Cash", label: "Cash" }
                      ])
                    }
                  </div>

                  <div className="col-sm-4 pl-7 challege-right">
                    <input value={this.state.rewardValue} onChange={this.updateRewardValue} type="text" className="form-control" placeholder="How Much" />
                  </div>
                  
                </div>
              </div>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-4 pr-7 pt-3">
                    {
                      this.renderValidationSelect([
                        { value: "3rd party basic", label: "3rd party basic" },
                        { value: "3rd party intermediate", label: "3rd party intermediate" },
                        { value: "Admin", label: "Admin" },
                        { value: "Maker", label: "Maker" }
                      ])
                    }
                  </div>

                  <div className="col-sm-4 pr-7 pl-7 pt-3">
                    {
                      this.renderRefreshSelect([
                        { value: "Daily", label: "Daily" },
                        { value: "Weekly", label: "Weekly" },
                        { value: "Monthly", label: "Monthly" }
                      ])
                    }
                  </div>

                  <div className="col-sm-4 pl-7 challege-right">
                    <input value={this.state.quota} onChange={this.updateQuota} type="text" className="form-control" placeholder="Quota" />
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-4 pr-7 pt-3">
                    {
                      this.renderAccessSelect([
                        { value: "private", label: "private" },
                        { value: "public", label: "public" }
                      ])
                    }
                  </div>
                </div>
              </div>
              this.state.message ? <p className="challenge-mandatory">{this.state.message}</p> : ''
              <div className="col-sm-12 text-center"><button onClick={ () => this.submitChallenges() } className="yellow-btn mtb-1">+ Add challenge</button></div>
            </div>
    
        </div>
      </div>
    )
  }
}

export default AddChallenge;
