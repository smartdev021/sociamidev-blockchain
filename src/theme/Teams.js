import React from 'react'

import "~/src/theme/css/teams.css";

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
        name: 'Team 1',
        emails: emailSet,
        date: '11.05.2017'
    },
    {
        name: 'Team 2',
        emails: emailSet,
        date: '12.06.2017'
    },
    {
        name: 'Team 3',
        emails: emailSet,
        date: '11.05.2017'
    },
    {
        name: 'Team 4',
        emails: emailSet,
        date: '11.05.2017'
    }
]

class Teams extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            teams: teams
        }
    }

    renderEmails(emails){
        let listItems = emails.map((item,index)=>{
            if(item.accepted){
                return(
                    <div className="team-email-item-accepted" key={index}>
                        <div className="team-email">{item.email}</div>
                        <div className="team-email-checkbox">
                            <i className="fa fa-check"></i>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="team-email-item" key={index}>
                        <div className="team-email">{item.email}</div>
                    </div>
                )
            }
        })

    return listItems

    }

    renderTeamPanels(team){
        let listItems = team.map((item,index)=>(
            <div className="team-container" key={index}>
                <div className="team-list">
                    <div className="team-title">{item.name}</div>
                    <div className="team-date">{item.date}</div>
                    <div className="team-email-container">
                        {this.renderEmails(item.emails)}
                    </div>
                </div>  
                <div className="team-add-email">
                    <a className="team-add-email-link">
                    <i className="fa fa-plus"></i> Add new email</a>
                </div>
            </div>
        ))

        return listItems
    }

    render(){
        return(
            <div className="">
                <div className="row team-header">
                    <div className="my-teams-header"><b>My Teams</b></div>
                    <h5>Some dummy text here</h5>
                    <div className="create-new-team1">
                        <a href="#" className="create-team-btn create-new-team">
                            <p className="unskew-create-team">Create New Team</p>
                        </a>
                    </div>
                </div>
                <div className="row team-panels">
                    {this.renderTeamPanels(this.state.teams)}
                    {this.renderTeamPanels(this.state.teams)}
                </div>
            </div>
        )
    }
}

export default Teams