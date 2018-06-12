import React from 'react'

import TeamPanel from './TeamPanel'
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

    renderTeamPanels(team){

        let listItems = team.map((item,index)=>{
            return(
                <TeamPanel team={item} index={index} />
            )
        })
        return listItems
    }

    render(){
        return(
            <div className="my-teams-container">
                <div className="row team-header">
                    <div className="my-teams-header"><b>My teams</b></div>
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