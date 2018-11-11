import React,{Component} from 'react';

class ThemeSettings extends Component{
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
                <input/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Background</div>
                <input/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Background2</div>
                <input/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Accent</div>
                <input/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Accent2</div>
                <input/>
              </div>
              <div className="ThemeSettings-form-row">
                <div className="ThemeSettings-form-label">Accent3</div>
                <input/>
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
            <select>
              <option>Default</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default ThemeSettings;
