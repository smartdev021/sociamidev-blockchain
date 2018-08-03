import React from 'react';
import Modal from 'react-modal';
import { Icon } from 'react-fa';

import EmailBlock from './EmailBlock';
import AddAchievementModal from './AddAchievementModal';

class TeamPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addEmailBoolean: false,
      deleteModal: false,
      renameTitle: !props.team._id,
      addAchievementsFlag: false
    };
    this.updateTeamName = this.updateTeamName.bind(this);
    this.toggleEmailAdd = this.toggleEmailAdd.bind(this);
    this.toggleEditTitle = this.toggleEditTitle.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
    this.cancelRename = this.cancelRename.bind(this);
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
  }

  componentWillMount() {
    this.modalDefaultStyles = Modal.defaultStyles;

    Modal.defaultStyles.content.background = 'white';
    Modal.defaultStyles.content.color = 'initial';
    Modal.defaultStyles.content['position'] = 'relative';
    Modal.defaultStyles.content['height'] = '100px';
    Modal.defaultStyles.content['width'] = '300px';

    Modal.defaultStyles.content['minWidth'] = 'initial';
    Modal.defaultStyles.content['maxWidth'] = 'initial';
    Modal.defaultStyles.content['overflowX'] = 'hidden';
    Modal.defaultStyles.content['overflowY'] = 'hidden';
    Modal.defaultStyles.content['marginLeft'] = 'auto';
    Modal.defaultStyles.content['marginRight'] = 'auto';
    Modal.defaultStyles.content['top'] = '50%';
    Modal.defaultStyles.content['left'] = '50%';
    // Modal.defaultStyles.content["padding"] = '20px';
    Modal.defaultStyles.content['margin'] = '0';
    Modal.defaultStyles.content['transform'] = 'translate(-50%, -50%)';
    Modal.defaultStyles.content['boxShadow'] = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
  }

  componentDidUpdate(prevProps) {
    if (this.props.team._id !== prevProps.team._id || this.props.team.name !== prevProps.team.name) {
      this.setState({renameTitle: !this.props.team._id});
    }
    if (this.props.team.emails.length !== prevProps.team.emails.length) {
      this.setState({addEmailBoolean: false});
    }
  }

  addEmailToTeam() {
    this.setState({ addEmailBoolean: !this.state.addEmailBoolean });
  }

  cancelEmail(){
    this.setState({ addEmailBoolean: !this.state.addEmailBoolean });
    this.props.onCancel(this.props.team);
  }

  deleteTeam() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  toggleEmailAdd(){
    this.setState(prevState => ({addEmailBoolean : !prevState.addEmailBoolean}))
  }
  
  updateTeamName() {
    let team = Object.assign({}, this.props.team);
    team['name'] = this.teamNameInupt.value;
    this.props.onSave(team);
  }

  toggleEditTitle(){
    this.setState(prevState => ({renameTitle: !prevState.renameTitle}));
  }

  cancelRename(){
    this.setState(prevState => ({renameTitle: !prevState.renameTitle}));
    this.props.onCancel(this.props.team);
  }

  handleUpdateEmail(emailIndex,emailObj,newEmail) {
    this.props.onUpdateEmail(emailIndex, emailObj.email, newEmail, this.props.team);
  }

  renderEmails(emails) {
    let listItems = emails.map((item, index) => {
      return <EmailBlock email={item} onSave={(val) => this.handleUpdateEmail(index,item,val)} key={index} index={index} />;
    });

    return listItems;
  }

  addEmail() {
    this.props.onAddEmail(this.addEmailInupt.value, this.props.team);
  }

  handleDeleteTeam() {
    this.props.onDeleteTeam(this.props.team._id);
  }

  render() {
    const { team, index } = this.props;

    let header;
    if (this.state.renameTitle) {
        header = (
            <div className="team-headers">
                <div className="team-titles">
                    <div className="team-title">
                        <div className="team-email-item-editing">
                            <div className="team-email-edit-box">
                                <input className="team-email-edit-input" defaultValue={team.name} ref={input=>{ this.teamNameInupt = input }} />
                                <div className="team-email-edit-options">
                                    <a className="pull-left team-email-edit-button team-email-cancel-btn" onClick={this.cancelRename}>Cancel</a>
                                    <a className="pull-right team-email-edit-button  team-email-save-btn" onClick={this.updateTeamName}>Save</a>
                                </div>
                            </div>

                            <div className="email-edit-lightbox">

                            </div>              
                            
                        </div>
                    </div>
                    <div className="team-date">{team.date}</div>
                </div>
            </div>
        );
    } else {
        header = (
            <div className="team-headers">
            <div className="team-titles">
              <div className="team-title">{team.name}</div>
              <div className="team-date">{team.date}</div>
            </div>
            <div className="btn-group team-menu-group">
              <button
                type="button"
                id="team-menu"
                className="team-menu dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bars" />
              </button>
              <ul
                className="dropdown-menu team-dropdown-menu"
                style={{ right: '0', left: 'auto', minWidth: '70px' }}
              >
                <li>
                  <a href="#" onClick={this.toggleEditTitle}>Rename</a>
                </li>
                <li>
                  <a onClick={() => this.deleteTeam()}>Delete</a>
                </li>
              </ul>
            </div>
          </div>
        );
    }
    let footer;
    if (this.state.addEmailBoolean) {
      footer = (
        <div className="team-add-email-input">
          <div className="">
            <input className="team-email-input" type="text" ref={input=>{ this.addEmailInupt = input }} />
          </div>

          <div className="team-email-options">
            <a className="pull-left" onClick={() => this.cancelEmail()}>
              Cancel
            </a>
            <a className="pull-right" onClick={this.addEmail}>Add</a>
          </div>
        </div>
      );
    } else {
      // footer = (
      //   <div className="team-add-email">
      //     <a className="team-add-email-link" onClick={() => this.addEmailToTeam()}>
      //       <i className="fa fa-plus" /> Add new email
      //     </a>
      //   </div>
      // );
      footer = (
        <a className="team-add-email" style={{
          justifyContent: 'space-between',
          paddingLeft: '10px',
          paddingRight: '10px',
          height: '60px',
          fontSize: '20px'}} onClick={() => this.setState({addAchievementsFlag: true})}>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: '16px', marginBottom: '10px'}}>Achievement</span>
            <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <i className="fa fa-yahoo" />
              <i className="fa fa-fighter-jet" />
              <i className="fa fa-mobile" />
              <i className="fa fa-whatsapp" />
            </span>
          </div>
          <span className="team-add-email-link" style={{fontSize: '30px'}}>
            <i className="fa fa-plus-circle" />
          </span>
        </a>
      );
    }

    let deleteModalPopup;

    if (this.state.deleteModal) {
      deleteModalPopup = (
        <Modal isOpen={true} onRequestClose={() => this.deleteTeam()} contentLabel={'Delete Team'}>
          {/* parentSelector={getPopupParentElement}> */}
          <div className="delete-team-popup">
            <span
              aria-hidden="true"
              onClick={() => this.deleteTeam()}
              className=" character-creation-popup-close-icon"
            />

            <p>
              Do you want to delete <strong>{this.props.team.name}</strong> ?
            </p>
            <div className="delete-team-btn-group">
              <button className="btn delete-team-btn-yes" onClick={this.handleDeleteTeam}>Yes</button>
              <button className="btn  delete-team-btn-no" onClick={() => this.deleteTeam()}>
                No
              </button>
            </div>
          </div>
        </Modal>
      );
    }

    return (
      <div className="team-container" key={index}>
        <AddAchievementModal isOpen={this.state.addAchievementsFlag} onClose={() => this.setState({addAchievementsFlag: false})} />
        {deleteModalPopup}
        <div className="team-list">
          {header}
          <div className="team-email-container">{this.renderEmails(team.emails)}</div>
        </div>

        {footer}
      </div>
    );
  }
}

export default TeamPanel;
