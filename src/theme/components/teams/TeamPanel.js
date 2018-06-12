import React from 'react'
import Modal from 'react-modal'
import {Icon} from 'react-fa'

import EmailBlock from './EmailBlock'

class TeamPanel extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            addEmailBoolean : false,
            deleteModal: false
        }
    }

    componentWillMount() {
        this.modalDefaultStyles = Modal.defaultStyles;
  
        Modal.defaultStyles.content.background = "white";
        Modal.defaultStyles.content.color = 'initial';
        Modal.defaultStyles.content["position"] = "relative";
        Modal.defaultStyles.content["height"] = "100px";
        Modal.defaultStyles.content["width"] = '300px';
        
        Modal.defaultStyles.content["minWidth"] = 'initial';
        Modal.defaultStyles.content["maxWidth"] = 'initial';
        Modal.defaultStyles.content["overflowX"] = "hidden";
        Modal.defaultStyles.content["overflowY"] = "hidden";
        Modal.defaultStyles.content["marginLeft"] = 'auto';
        Modal.defaultStyles.content["marginRight"] = 'auto';
        Modal.defaultStyles.content["top"] = '50%';
        Modal.defaultStyles.content["left"] = '50%';
        // Modal.defaultStyles.content["padding"] = '20px';
        Modal.defaultStyles.content["margin"] = '0';
        Modal.defaultStyles.content["transform"] = 'translate(-50%, -50%)';
        Modal.defaultStyles.content["boxShadow"]= '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      }

    addEmailToTeam(){
        this.setState({addEmailBoolean : !this.state.addEmailBoolean})
    }

    deleteTeam(){
        this.setState({deleteModal : !this.state.deleteModal})
    }

    renderEmails(emails){
        let listItems = emails.map((item,index)=>{
            return <EmailBlock email={item} index={index} />
        })

        return listItems
    }

    render(){
        const { team, index } = this.props

        let footer
        if(this.state.addEmailBoolean){
            footer = (
                <div className="team-add-email-input">
                    <div className="">
                        <input className="team-email-input" type="text" />
                    </div>
                    
                    <div className="team-email-options">
                        <a className="pull-left" onClick={()=>this.addEmailToTeam()}>Cancel</a>
                        <a className="pull-right">Add</a>
                    </div>
                </div>
            )
        }else{
            footer = (
                <div className="team-add-email">
                    <a className="team-add-email-link" onClick={()=>this.addEmailToTeam()}>
                    <i className="fa fa-plus"></i> Add new email</a>
                </div>
            )
        }

        let deleteModalPopup

        if(this.state.deleteModal){
            deleteModalPopup = (
                <Modal isOpen={true} onRequestClose={() => this.deleteTeam()} 
                contentLabel={"Delete Team"} >
                 {/* parentSelector={getPopupParentElement}> */}
                 <div className="delete-team-popup">
                    <span aria-hidden="true" onClick={()=>this.deleteTeam()} className=" character-creation-popup-close-icon"></span>
                    
                    <p>Do you want to delete <strong>{this.props.team.name}</strong> ?</p>
                    <div className="delete-team-btn-group">
                        <button className="btn delete-team-btn-yes">Yes</button>
                        <button className="btn  delete-team-btn-no" onClick={() => this.deleteTeam()}>No</button>
                    </div>
                 </div>
            
            </Modal>
            )
            
        }

        return(
            <div className="team-container" key={index}>
                {deleteModalPopup}
                <div className="team-list">
                    <div className="team-headers">
                        <div className="team-titles">
                            <div className="team-title">{team.name}</div>
                            <div className="team-date">{team.date}</div>
                        </div>
                        <div className="btn-group team-menu-group">
                            <button type="button" id="team-menu" className="team-menu dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-bars"></i>
                            </button>
                            <ul className="dropdown-menu team-dropdown-menu" style={{right:'0',left:'auto',minWidth:'70px'}}>
                                <li><a href="#">Rename</a></li>
                                <li><a onClick={()=>this.deleteTeam()}>Delete</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="team-email-container">
                        {this.renderEmails(team.emails)}
                    </div>
                </div>  

                {footer}
                
            </div>
        )
    }
}

export default TeamPanel