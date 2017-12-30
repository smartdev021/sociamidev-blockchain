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
      return (<SkillBreakdown onCloseSkillBreakdown={()=>this.handleCloseSkillBreakdown()} skillName={this.state.selectedSkill}/>);
    }
  }

  handleCloseSkillBreakdown() {
    this.setState( { selectedSkill: undefined });
  }

  handleOpenSkillBreakdown(skill) {
    this.setState( { selectedSkill: skill });
  }

  renderTree() {
    const that = this;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="content-2-columns-left-title">
            <span>Progression Tree</span>
            <ActionLink className="pull-right" onClick={()=> this.props.onCloseSingleTree()}>Close</ActionLink>
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
                <ul>
                  {
                    this.props.tree.weightage1[0].split(',').map(function(skill, i) {
                      return (<ActionLink key={i} onClick={()=> that.handleOpenSkillBreakdown(skill)}><li>{skill}</li></ActionLink>);
                    })
                  }
                </ul>
              </div>
              <div className="weightage-section">
                <b>Weightage 2</b>
                <ul>
                  {
                    this.props.tree.weightage2[0].split(',').map(function(skill, i) {
                      return (<ActionLink key={i} onClick={()=> that.handleOpenSkillBreakdown(skill)}><li>{skill}</li></ActionLink>);
                    })
                  }
                </ul>
              </div>
              <div className="weightage-section">
                <b>Weightage 3</b>
                <ul>
                  {
                    this.props.tree.weightage3[0].split(',').map(function(skill, i) {
                      return (<ActionLink key={i} onClick={()=> that.handleOpenSkillBreakdown(skill)}><li>{skill}</li></ActionLink>);
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressiontreeBrowser;