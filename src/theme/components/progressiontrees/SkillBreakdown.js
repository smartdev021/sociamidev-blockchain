/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import Axios from 'axios'
import ConfigMain from '~/configs/main'

import "~/src/theme/css/treebrowser.css"

class SkillBreakdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     skillInfo: undefined, 
    }
  }

  componentWillMount() {
    const url = `${ConfigMain.getBackendURL()}/skillGet?name=${this.props.skillName}`;
    const that = this;
    Axios.get(url)
      .then(function(response) {
        that.setState( {skillInfo: response.data} );
        console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
      that.setState( {skillInfo: undefined} );
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="content-2-columns-left-title">
            <span>Skill Breakdown</span>
            <ActionLink className="pull-right" onClick={()=> {} }>Hangout</ActionLink>
            <ActionLink className="pull-right" onClick={()=> this.props.onCloseSkillBreakdown()}>Close</ActionLink>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>{this.state.skillInfo && this.state.skillInfo.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>Related Sub-Skills</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>{this.state.skillInfo && this.state.skillInfo.relatedTopics}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>Gigs, Jobs, Training, Events</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillBreakdown;