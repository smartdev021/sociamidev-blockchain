/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClose: true,
      active: false,
      selectedTeam: 'The misfits'
    }

    this.toggleTeam = this.toggleTeam.bind(this);
  }

  toggleTeam() {
    this.setState({
      isClose: !this.state.isClose,
      active: !this.state.active
    });
  }

  selectTeam(selectedTeam) {
    this.setState({
      isClose: !this.state.isClose,
      active: !this.state.active,
      selectedTeam: selectedTeam
    });
  }

  renderTeamSelect(options) {
    return (
      <div>
        <div className="custom-select">
          <select>
            {options.map((team, i) => {
              return(
                <option value={ team.value } key={ i }>{ team.label }</option>
              )
            })}
          </select>
          <div
            className={ this.state.active ? 'select-selected select-arrow-active' : 'select-selected' }
            onClick={ () => this.toggleTeam() }>
            { this.state.selectedTeam }
          </div>
          <div
            className={ this.state.isClose ? 'select-items select-hide' : 'select-items' }>
            {options.map((team, i) => {
              return(
                <div
                  onClick={ () => this.selectTeam(team.label) } key={ i }>
                  { team.label }
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="black-box bg-right-team">
        <div className="team-wp">
          <h3 className="col-heading">Team</h3>
          { this.renderTeamSelect([{value: "0", label: "The misfits"}, {value: "1", label: "Legendary"}, {value: "2", label: "Marry Christmas"}]) }
        </div>
      </div>
    );
  }
}

export default Team;
