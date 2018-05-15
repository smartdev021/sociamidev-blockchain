/*
    author: Akshay Menon
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import axios from 'axios'

import "~/src/theme/css/common.css"
import "~/src/theme/css/progressionTrees.css"
import "~/src/theme/css/ProgressionTreesNew.css"

import {
  fetchRoadmaps,
  fetchRoadmapsFromAdmin,
} from '~/src/redux/actions/roadmaps'

import {
  startProgressionTree,
  stopProgressionTree,
} from '~/src/redux/actions/authorization'

import {
  saveTask,
} from '~/src/redux/actions/tasks'

import ConfigMain from '~/configs/main'


class SkillCard extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {

          isLoading:false,
          isTaskSelected: {},
          flipCardClass: {},
          tree : undefined
      }
    }

    componentDidMount(){
        const treeId = this.props.skillItem._id
        if (treeId) {
            this.setState({isLoading: true});
            axios.get(`${ConfigMain.getBackendURL()}/roadmapGet?id=${treeId}`)
            .then((response)=>this.treeFetchSuccess(response))
            .catch((error)=>this.treeFetchFailed(error));
        }
        else {
            this.setState({isLoading: false});
        }
    }

    treeFetchSuccess(response) {
        this.setState({isLoading: false, tree: response.data});
    }

    treeFetchFailed(error) {
        console.log("Tree fetch error: " + error);
        this.setState({isLoading: false});
    }

    renderSkills(skills,style) {
        const that = this;
        //TODO: Fix incorrect database structure
        let skillParsed = skills.length > 1 ? skills : skills[0].split(',');
        for (let i = 0; i < skillParsed.length; ++i) {
          skillParsed[i] = skillParsed[i].trim();
        }
        const listItems = skillParsed.map(function(skill, i) {
          return (
            <div className="pskill-banner" key={i}
            style={{background:`linear-gradient(to left, ${style.background} 0%, white 45%)`}}>
                <div className="pskill-name">
                    {skill}
                </div>
            </div>
          );
        })
        return listItems
      }

    flipSkillCard(e){
        e.target.parentNode.parentNode.parentNode.parentNode.classList.toggle("hover")
    }
    
    flipSkillCardBack(e){
        e.target.parentNode.parentNode.parentNode.classList.toggle("hover")
    }

    yoyoFn(skillId,stateItem){
        let isBooleanJson = { ...this.state[stateItem],
            [skillId] : !this.state[stateItem][skillId]
        }
        this.setState({ [stateItem] : isBooleanJson})
    }

    toggleTaskView(skillId){
        let isTaskJson = { ...this.state.isTaskSelected ,
            [skillId]: !this.state.isTaskSelected[skillId]
        }
        this.setState({isTaskSelected: isTaskJson});
    }
    
    flipCardClassFn(skillId){
        let cardClass = { ...this.state.flipCardClass ,
            [skillId]: !this.state.flipCardClass[skillId]
        }
        this.setState({flipCardClass: cardClass});
    }

    render(){
        const { skillItem, customStyle } = this.props
        const flipClass = (this.state.flipCardClass[skillItem._id]) ? ' hover' : ''

        const TaskList = props => {
            const { customStyle, skillItem} = props
            return (
                    <div className="ptree-task-list">
                      <div className="ptree-back" onClick={()=>this.flipCardClassFn(skillItem._id)} >
                        <span className="fa fa-chevron-left ptree-chevron" onClick={()=>this.flipCardClassFn(skillItem._id)}></span>
                        <div className="ptree-back-text" onClick={()=>this.flipCardClassFn(skillItem._id)}>BACK</div>
                      </div>
                      <div className="ptree-back-header" style={{color:`${customStyle.color}`}}>SELECT TASK TO CONTINUE WITH THIS HERO</div>
      
                      <div className="pskill-banner" onClick={()=>this.toggleTaskView(skillItem._id)} 
                      style={{background:`linear-gradient(to left, ${customStyle.background} 0%, white 45%)`}}>
                        <div className="ptask-left">
                          <div className="pskill-name">
                            Illuminate
                          </div>
                          <div className="pskill-desc" style={{color:`${customStyle.color}`}}>
                            30 min 3 questions
                          </div>
                        </div>
                        <div className="ptask-right" style={{marginRight:'12px'}}>
                        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Single.png"
                          className="ptask-img-single" />
                        </div>
                      </div>
      
                      <div className="pskill-banner" onClick={()=>this.toggleTaskView(skillItem._id)} style={{background:`linear-gradient(to left, ${customStyle.background} 0%, white 45%)`}}>
                        <div className="ptask-left">
                          <div className="pskill-name">
                            Deepdive
                          </div>
                          <div className="pskill-desc" style={{color:`${customStyle.color}`}}>
                            30 min 10 questions
                          </div>
                        </div>
                        <div className="ptask-right">
                        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Two.png"
                          className="ptask-img-double" />
                        </div>
                      </div>

                      <div className="pskill-banner" onClick={()=>this.toggleTaskView(skillItem._id)} style={{background:`linear-gradient(to left, ${customStyle.background} 0%, white 45%)`}}>
                        <div className="ptask-left">
                          <div className="pskill-name">
                            XXX
                          </div>
                          <div className="pskill-desc" style={{color:`${customStyle.color}`}}>
                            xxx
                          </div>
                        </div>
                        <div className="ptask-right">
                        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Two.png"
                          className="ptask-img-double" />
                        </div>
                      </div>

                      <div className="pskill-banner" onClick={()=>this.toggleTaskView(skillItem._id)} style={{background:`linear-gradient(to left, ${customStyle.background} 0%, white 45%)`}}>
                        <div className="ptask-left">
                          <div className="pskill-name">
                            Brainstorm
                          </div>
                          <div className="pskill-desc" style={{color:`${customStyle.color}`}}>
                            60 min 1 challenge
                          </div>
                        </div>
                        <div className="ptask-right">
                        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/Group.png"
                          className="ptask-img-group" />
                        </div>
                      </div>
      
                    </div>
            )
          }
      
          const SkillList = props => {
            const { customStyle,skillItem } = props
            return(
              <div className="ptree-skill-list">
                  <div className="ptree-back" onClick={()=>this.toggleTaskView(skillItem._id)}>
                    <span className="fa fa-chevron-left ptree-chevron" onClick={()=>this.toggleTaskView(skillItem._id)}></span>
                    <div className="ptree-back-text" >BACK</div>
                  </div>
                  <div className="ptree-back-header" style={{color:`${customStyle.color}`}}>SELECT ONE SKILL TO IMPROVE IT</div>

                  <div className="ptree-skill-set">
                    {this.renderSkills(this.state.tree.weightage1,customStyle)}
                  </div>

                  {/* <div className="ptree-back" style={{justifyContent:'center'}} onClick={()=>this.toggleTaskView(skillItem._id)}>
                    <span className="fa fa-chevron-left ptree-chevron" onClick={()=>this.toggleTaskView(skillItem._id)}></span>
                    <div className="ptree-back-text" onClick={()=>this.toggleTaskView(skillItem._id)}>PREVIOUS SKILLS</div>
                  </div> */}
      
                </div>
            )
          }
        return(
            <div className={`col-md-4 col-sm-6 col-xs-12 ptree-card-item` + flipClass}
                    // onAnimationEnd={() => this.setState({fade: false})}
                    >
            <div className="ptree-card">
              <div className="ptree-card-front" style={{background:`linear-gradient(to left, ${customStyle.background} 0%, white 45%)`}}>
                <div className="ptree-hero-container pull-right">
                  <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/custom_ui/hero1.png"
                className="ptree-hero-img" />
                </div>
                <div className="ptree-card-heading" style={{color:`${customStyle.color}`}}>{skillItem.name}</div>
                <div className="ptree-card-body">
                    <p className="ptree-card-text">
                    {skillItem.description}
                    </p>
                </div>
                <div className="pskill-btn-group ptree-btn-group">
                  <button className="ptree-btn ptree-start" style={{backgroundColor:`${customStyle.color}`}}>QUICKSTART</button>
                  <button className="ptree-btn ptree-view" style={{border:`2px solid ${customStyle.color}`}} onClick={() => this.flipCardClassFn(skillItem._id)} 
                  onAnimationEnd={() => this.flipCardClassFn(skillItem._id)} 
                  >VIEW TASKS</button>
                </div>
              </div>
              <div className="ptree-card-back">
                {(this.state.isTaskSelected[skillItem._id]) ?  <SkillList customStyle={customStyle} skillItem={skillItem}/> 
                : <TaskList customStyle={customStyle} skillItem={skillItem} />}
              </div>
            </div>
          </div>
        )
    }
}

export default SkillCard