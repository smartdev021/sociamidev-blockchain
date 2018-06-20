import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import TeamPanel from './TeamPanel';
import '~/src/theme/css/teams.css';

import { 
  fetchTeams,
  addNewTeam,
  saveTeam,
  addTeamEmail,
  updateTeamEmail,
  deleteTeam,
  cancelTeam
} from '~/src/redux/actions/teams';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addToTeam: {},
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTeamSave = this.handleTeamSave.bind(this);
    this.handleEmailAdd = this.handleEmailAdd.bind(this);
    this.handleTeamDelete = this.handleTeamDelete.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeams();
  }

  handleCancel(index, team) {
    this.props.cancelTeam(index, team);
  }

  handleTeamSave(index, team) {
    this.props.saveTeam(index, team);
  }

  handleEmailAdd(index, email, team) {
    this.props.addTeamEmail(index, email, team);
  }

  handleEmailUpdate(emailIndex, prevEmail, newEmail, team) {
    this.props.updateTeamEmail(emailIndex, prevEmail, newEmail, team);
  }

  handleTeamDelete(index, _id) {
    this.props.deleteTeam(index, _id);
  }

  renderTeamPanels(team) {
    let listItems = team.map((item, index) => {
      return <TeamPanel 
        team={item}
        onCancel={(val) => this.handleCancel(index,val)}
        onSave={(val) => this.handleTeamSave(index, val)}
        onAddEmail={(email,team) => this.handleEmailAdd(index,email,team)}
        onUpdateEmail={(emailIndex,prevEmail,newEmail,team) => this.handleEmailUpdate(emailIndex,prevEmail,newEmail,team)}
        onDeleteTeam={(_id) => this.handleTeamDelete(index, _id)}
        key={item._id} 
        index={index} />;
    });
    return listItems;
  }

  render() {
    return (
      <div className="my-teams-container">
        <div className="row team-header">
          <div className="my-teams-header">
            <b>My teams</b>
          </div>
          <h5>Some dummy text here</h5>
          <div className="create-new-team-btn">
            <a href="#" onClick={()=>this.props.addNewTeam()} className="create-team-btn create-new-team">
              <p className="unskew-create-team">Create New Team</p>
            </a>
          </div>
        </div>
        <div>
          <div className="team-panels">
            {this.renderTeamPanels(this.props.teams)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	isFetchingTeams: state.teams.isFetchingTeams,
	teams: state.teams.data
});

const mapDispatchToProps = dispatch => ({
    fetchTeams: bindActionCreators(fetchTeams, dispatch),
    addNewTeam: bindActionCreators(addNewTeam, dispatch),
    cancelTeam: bindActionCreators(cancelTeam, dispatch),
    saveTeam: bindActionCreators(saveTeam, dispatch),
    addTeamEmail: bindActionCreators(addTeamEmail, dispatch),
    updateTeamEmail: bindActionCreators(updateTeamEmail, dispatch),
    deleteTeam: bindActionCreators(deleteTeam, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Teams));
