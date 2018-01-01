/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import SkillBreakdown from "~/src/theme/components/progressiontrees/SkillBreakdown"

import "~/src/theme/css/treebrowser.css"

class ProgressiontreeBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     selectedSkill: undefined, 
    }
  }

  render() {
    console.log("%cBrowsing Single Tree", "background: purple; color: white;");
    console.dir(this.props.tree);

    if (!this.state.selectedSkill) {
      return this.renderTree();
    }
    else {
      return (<SkillBreakdown onCloseSkillBreakdown={()=>this.handleCloseSkillBreakdown()} 
                skillName={this.state.selectedSkill} userProfile={this.props.userProfile} tree={this.props.tree} saveTask={this.props.saveTask}/>);
    }
  }

  handleCloseSkillBreakdown() {
    this.setState( { selectedSkill: undefined });
  }

  handleOpenSkillBreakdown(skill) {
    this.setState( { selectedSkill: skill });
  }

  renderSkills(skills) {
    console.log("%c renderSkills: ", "color: green; background: red");
    console.dir(skills);
    const that = this;
    //TODO: Fix incorrect database structure
    let skillParsed = skills.length > 1 ? skills : skills[0].split(',');
    for (let i = 0; i < skillParsed.length; ++i) {
      skillParsed[i] = skillParsed[i].trim();
    }
    return (
    <ul>
      {
        skillParsed.map(function(skill, i) {
          return (<ActionLink key={i} onClick={()=> that.handleOpenSkillBreakdown(skill)}><li>{skill}</li></ActionLink>);
        })
      }
    </ul>);
  }

  renderTree() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="content-2-columns-left-title">
            <span>Progression Tree</span>
            <ActionLink className="skill-breakdown-control pull-right" id="button-arrow-back" onClick={()=> this.props.onCloseSingleTree()}>
              <span className="glyphicon glyphicon-arrow-left"/>
            </ActionLink>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div>{this.props.tree.name}</div>
          </div>
          <div className="col-lg-10">
            <p>{this.props.tree.description}</p>
            <div id="tree-skills">
              <div className="weightage-section">
                <b>Weightage 1</b>
                {this.renderSkills(this.props.tree.weightage1)}
              </div>
              <div className="weightage-section">
                <b>Weightage 2</b>
                {this.renderSkills(this.props.tree.weightage2)}
              </div>
              <div className="weightage-section">
                <b>Weightage 3</b>
                {this.renderSkills(this.props.tree.weightage3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressiontreeBrowser;