import React,{Component} from 'react';

import ConfigMain from '~/configs/main';
import Axios from 'axios';

class ThemeSettings extends Component{

  constructor(props) {
    super(props);

    this.state = {
      dominant: '',
      background: '',
      background2: '',
      accent1: '',
      accent2: '',
      accent3: '',
      gamified: 'default',
      settingsFetched: false,
      settingsFinished: false
    };
    this.updateDominate = this.updateDominate.bind(this);
    this.updateBackground = this.updateBackground.bind(this);
    this.updateBackground2 = this.updateBackground2.bind(this);
    this.updateAccent1 = this.updateAccent1.bind(this);
    this.updateAccent2 = this.updateAccent2.bind(this);
    this.updateAccent3 = this.updateAccent3.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.fetchThemes();
  }

  fetchThemes() {
    var that = this;
      const url = `${ConfigMain.getBackendURL()}/personalise/${localStorage.getItem('company_id')}&1`
        Axios.get(url).then(function(response) {
      if (response.data && response.data.companyId){
        that.setState({ settingsFetched: true });
        that.setState({ 
          dominant: response.data.dominant ? response.data.dominant : '',
          background: response.data.background ? response.data.background : '',
          background2: response.data.background2,
          accent1: response.data.accent1 ? response.data.accent1 : '',
          accent2: response.data.accent2 ? response.data.accent2 : '',
          accent3: response.data.accent3 ? response.data.accent3 : '',
          gamified: response.data.gamified,
          themeId: response.data._id
        });
      }
    }).catch(function(error) { 
      that.setState({ settingsFetched: true });
      console.log(error);
    });
  }

  updateDominate(event) {
    this.setState({
      dominant: event.target.value
    });

    this.setState({
      settingsFinished: false
    });
  }

  updateBackground(event) {
    this.setState({
      background: event.target.value
    });

    this.setState({
      settingsFinished: false
    });
  }

  updateBackground2(event) {
    this.setState({
      background2: event.target.value
    });

    this.setState({
      settingsFinished: false
    });
  }

  updateAccent1(event) {
    this.setState({
      accent1: event.target.value
    });

    this.setState({
      settingsFinished: false
    });
  }

  updateAccent2(event) {
    this.setState({
      accent2: event.target.value
    });

    this.setState({
      settingsFinished: false
    });
  }

  updateAccent3(event) {
   this.setState({
      accent3: event.target.value
    });

   this.setState({
      settingsFinished: false
    });
  }

  handleChange(event) {
    this.setState({
      gamified: event.target.value
    });

    this.setState({
      settingsFinished: false
    });
  }

  saveSettings() {

    if(!this.state.settingsFetched) {
      Axios.post(`${ConfigMain.getBackendURL()}/personalise`, {
      userType: 'Company',
      userValue: '1',
      dominant: this.state.dominant,
      companyId: localStorage.getItem('company_id'),
      background: this.state.background,
      background2: this.state.background2,
      accent1: this.state.accent1,
      accent2: this.state.accent2,
      accent3: this.state.accent3,
      gamified: this.state.gamified
    })
      .then(response => {
        this.fetchThemes();
        this.setState({
          settingsFinished: true
        });
      })
      .catch(err => {

      });
    } else {
      Axios.put(`${ConfigMain.getBackendURL()}/personalise/${this.state.themeId}`, {
      userType: 'Company',
      userValue: '1',
      dominant: this.state.dominant,
      companyId: localStorage.getItem('company_id'),
      background: this.state.background,
      background2: this.state.background2,
      accent1: this.state.accent1,
      accent2: this.state.accent2,
      accent3: this.state.accent3,
      gamified: this.state.gamified
    })
      .then(response => {
        this.fetchThemes();
        this.setState({
          settingsFinished: true
        });
      })
      .catch(err => {

      });
    }

  }

  render(){
    return(
      <div className="ThemeSettings-holder">
        <div className="ThemeSettings-box">
          <div className="ThemeSettings-box-header">
            <h3>Color Theme</h3>
            <div className="ThemeSettings-box-header-icon">
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Change
            </div>
          </div>
          <div className="ThemeSettings-form-holder">
            <div className="ThemeSettings-form-table">
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Dominate</div>
                <input value={this.state.dominant} onChange={this.updateDominate} type="text"/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Background</div>
                <input  value={this.state.background} onChange={this.updateBackground} type="text"/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Background2</div>
                <input value={this.state.background2} onChange={this.updateBackground2} type="text"/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Accent</div>
                <input value={this.state.accent1} onChange={this.updateAccent1} type="text"/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Accent2</div>
                <input value={this.state.accent2} onChange={this.updateAccent2} type="text"/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Accent3</div>
                <input value={this.state.accent3} onChange={this.updateAccent3} type="text"/>
              </div>
            </div>
            <div className="ThemeSettings-option">
              <select>
                <option>Default No</option>
                <option>Default Yes</option>
              </select>
            </div>
          </div>
          <div className="ThemeSettings-gamifi">
            <div className="ThemeSettings-form-label">Gamification</div>
            <select value={this.state.gamified} onChange={this.handleChange}>
              <option value="Default">Default</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          {this.state.settingsFinished ? <p className="settings-finished">Settings are updated sueccesfully</p> : null}
          <div className="col-sm-12 text-center">
          <button onClick={ () => this.saveSettings() } className="yellow-btn mtb-1 theme-save-button">SAVE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ThemeSettings;
