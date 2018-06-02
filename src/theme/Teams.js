import React from 'react'

import "~/src/theme/css/teams.css"

let emailSet = [
    {
        id:1,
        email:'anna.atonyan@gmail.com',
        accepted: true
    },
    {
        id:2,
        email:'anna.atonyan@gmail.com',
        accepted: true
    },
    {
        id:3,
        email:'anna.atonyan@gmail.com',
        accepted: false
    },
    {
        id:4,
        email:'anna.atonyan@gmail.com',
        accepted: true
    },
    {
        id:5,
        email:'anna.atonyan@gmail.com',
        accepted: false
    },
    {
        id:6,
        email:'anna.atonyan@gmail.com',
        accepted: true
    },
    {
        id:7,
        email:'anna.atonyan@gmail.com',
        accepted: false
    },
    {
        id:8,
        email:'anna.atonyan@gmail.com',
        accepted: true
    },
    {
        id:9,
        email:'anna.atonyan@gmail.com',
        accepted: true
    }
]

let teams = [
    {
        _id:1,
        name: 'Team 1',
        emails: emailSet,
        date: '11.05.2017'
    },
    {
        _id:2,
        name: 'Team 2',
        emails: emailSet,
        date: '12.06.2017'
    },
    {
        _id:3,
        name: 'Team 3',
        emails: emailSet,
        date: '11.05.2017'
    },
    {
        _id:4,
        name: 'Team 4',
        emails: emailSet,
        date: '11.05.2017'
    }
]

class Teams extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            teams: teams,
            addToTeam : {}
        }
    }

    

    renderEmails(emails){

        let editEmail = () => {
            console.log('haha')
        }

        let listItems = emails.map((item,index)=>{
            if(item.accepted){
                return(
                    <div className="team-email-item-accepted" key={index}>
                        <div>
                            <div className="team-email-accepted">{item.email}</div>
                            <div className="team-email-checkbox">
                                <i className="fa fa-check"></i>
                            </div>
                            <a className="fa fa-pencil edit-team-email-checkbox" onClick={editEmail}></a>
                        </div>
                        <div className="email-edit-lightbox">

                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="team-email-item" key={index}>
                        <div className="team-email">{item.email}</div>
                        <a className="fa fa-pencil edit-team-email-checkbox"></a>
                    </div>
                )
            }
        })

        return listItems

    }

    renderTeamPanels(team){

        let listItems = team.map((item,index)=>{
        return(
            <div className="team-container" key={index}>
                <div className="team-list">
                    <div className="team-headers">
                        <div className="team-titles">
                            <div className="team-title">{item.name}</div>
                            <div className="team-date">{item.date}</div>
                        </div>
                        <div className="btn-group team-menu-group">
                            <button type="button" id="team-menu" className="team-menu dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-bars"></i>
                            </button>
                            <ul className="dropdown-menu team-dropdown-menu" style={{right:'0',left:'auto',minWidth:'70px'}}>
                                <li><a href="#">Rename</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="team-email-container">
                        {this.renderEmails(item.emails)}
                    </div>
                </div>  

                {/* <div className="team-add-email-input">
                    <div className="">
                        <input className="team-email-input" type="text" />
                    </div>
                    
                    <div className="team-email-options">
                        <a className="pull-left">Cancel</a>
                        <a className="pull-right">Add</a>
                    </div>
                </div> */}

                <div className="team-add-email">
                    <a className="team-add-email-link" >
                    <i className="fa fa-plus"></i> Add new email</a>
                </div>
                
                
            </div>
        )
    })
        return listItems
    }

    render(){
        return(
            <div className="my-teams-container">
                <div className="row team-header">
                    <div className="my-teams-header"><b>My Teams</b></div>
                    <h5>Some dummy text here</h5>
                    <div className="create-new-team-btn">
                        <a href="#" className="create-team-btn create-new-team">
                            <p className="unskew-create-team">Create New Team</p>
                        </a>
                    </div>
                </div>
                <div >
                    <div className="team-panels">
                        {this.renderTeamPanels(this.state.teams)}
                        {this.renderTeamPanels(this.state.teams)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Teams