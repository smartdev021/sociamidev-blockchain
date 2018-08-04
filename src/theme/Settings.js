import React, { Component } from 'react';

import '~/src/theme/css/settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'Dark',
      visibility: 'Public',
      autoAccept: 'No',
      IsLondon: 'none',
      IsDropDownOpen: 'none',
      themeToggle: 'none',
      visibilityToggle: 'none',
      autoAcceptToggle: 'none',
      IsAccountOpen: 'none',
      IsPrivacyOpen: 'block',
      IsCommOpen: 'none',
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleAutoAcceptChange = this.handleAutoAcceptChange.bind(this);
    this.toggleAutoAccept = this.toggleAutoAccept.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);

    this.toggleAccountOption = this.toggleAccountOption.bind(this);
    this.togglePrivacyOption = this.togglePrivacyOption.bind(this);
    this.toggleCommunicationOption = this.toggleCommunicationOption.bind(this);
  }

  toggleTheme() {
    this.state.themeToggle == 'none'
      ? this.setState({ themeToggle: 'block' })
      : this.setState({ themeToggle: 'none' });
  }

  toggleVisibility() {
    this.state.visibilityToggle == 'none'
      ? this.setState({ visibilityToggle: 'block' })
      : this.setState({ visibilityToggle: 'none' });
  }

  toggleAutoAccept() {
    this.state.autoAcceptToggle == 'none'
      ? this.setState({ autoAcceptToggle: 'block' })
      : this.setState({ autoAcceptToggle: 'none' });
  }

  handleThemeChange(e) {
    this.setState({ theme: e.target.value });
  }

  handleVisibilityChange(e) {
    this.setState({ visibility: e.target.value });
  }
  handleAutoAcceptChange(e) {
    this.setState({ autoAccept: e.target.value });
  }

  toggleAccountOption() {
    this.setState({ IsAccountOpen: 'block', IsPrivacyOpen: 'none', IsCommOpen: 'none' });
  }

  togglePrivacyOption() {
    this.setState({ IsAccountOpen: 'none', IsPrivacyOpen: 'block', IsCommOpen: 'none' });
  }

  toggleCommunicationOption() {
    this.setState({ IsAccountOpen: 'none', IsPrivacyOpen: 'none', IsCommOpen: 'block' });
  }
  render() {
    return (
      <div className="soqqle-content-container">
        <div>
          <button className="tablink" onClick={this.toggleAccountOption}>
            Account
          </button>
          <button className="tablink" onClick={this.togglePrivacyOption}>
            Privacy
          </button>
          <button className="tablink" onClick={this.toggleCommunicationOption}>
            Communication
          </button>
        </div>

        <div id="account" style={{ display: this.state.IsAccountOpen }}>
          <p></p>
          <div className="sidebar">
            <a href="#">Account Settings</a>
          </div>
          <div id="Content">
            <div id="privacyTitle">Account Settings</div>
            <hr />
            <div id="visibility">
              <label id="changeBtn" onClick={this.toggleTheme}>
                Change
              </label>
              <h3>Soqqle Theme?</h3>
              <p>
                Soqqle theme with dark theme will see pages with black color as background in the platform.
                Soqqle theme with light theme will see pages with white color as background in the platform.
              </p>
              <div style={{ display: this.state.themeToggle }}>
                <div className="dropdown">
                  <div>
                    <select value={this.state.theme} onChange={this.handleThemeChange}>
                      <option value="Dark">Dark</option>
                      <option value="Light">Light</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div id="privacy" style={{ display: this.state.IsPrivacyOpen }}>
          <div className="sidebar">
            <a href="#">Privacy Settings</a>
          </div>
          <div id="Content">
            <div id="privacyTitle">Privacy Settings</div>
            <hr />
            <div id="visibility">
              <label id="changeBtn" onClick={this.toggleVisibility}>
                Change
              </label>
              <h3>Who sees my tasks?</h3>
              <p>
                Users flagged with public will see tasks from all users in the platform. Users flagged with
                private wil see tasks from only friends.
              </p>
              <div style={{ display: this.state.visibilityToggle }}>
                <div className="dropdown">
                  <div>
                    <select value={this.state.visibility} onChange={this.handleVisibilityChange}>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div id="autoAccept">
              <label id="changeBtn" onClick={this.toggleAutoAccept}>
                Change
              </label>
              <h3>Auto Send / Accept Facebook Friends?</h3>
              <p>
                If flagged yes, the user will automatically add all facebook friends that join the system The
                user will also auto accept requests from facebook friends.
              </p>
              <div style={{ display: this.state.autoAcceptToggle }}>
                <div className="dropdown">
                  <div>
                    <select value={this.state.autoAccept} onChange={this.handleAutoAcceptChange}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div id="communication" style={{ display: this.state.IsCommOpen }}>
          <p>This is the communication tab</p>
        </div>
      </div>
    );
  }
}

export default Settings;
