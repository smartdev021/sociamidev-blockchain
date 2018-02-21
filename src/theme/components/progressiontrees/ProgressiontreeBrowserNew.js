/*
    author: Alexander Zolotov
*/
import React from 'react';

import Axios from 'axios'

import {Icon} from 'react-fa'

import {Link} from 'react-router-dom'

import ConfigMain from '~/configs/main'

import ActionLink from '~/src/components/common/ActionLink';

import StarRatings from 'react-star-ratings';

import SkillBreakdown from "~/src/theme/components/progressiontrees/SkillBreakdown";

import UserInteractions from "~/src/common/UserInteractions"

import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  userInteractionPush,
} from '~/src/redux/actions/userInteractions'

import {
  startProgressionTree,
} from '~/src/redux/actions/authorization'

import "~/src/theme/css/treebrowser.css";

class ProgressiontreeBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     selectedSkill: undefined,
     tree: undefined,
     isLoading: true,
    }
  }

  treeFetchSuccess(response) {
    this.setState({isLoading: false, tree: response.data});
  }

  treeFetchFailed(error) {
    console.log("Tree fetch error: " + error);
    this.setState({isLoading: false});
  }

  isAddedTree() {
    return this.props.userProfile.progressionTrees.find((tree) => {
      return tree._id == this.state.tree._id;
    })
  }

  componentDidMount() {
    const URLParams = new URLSearchParams(this.props.location.search);

    console.log("this.props.location");
    console.dir(this.props.location);

    const treeId = URLParams.get("id");

    console.log("URLParams");
    console.dir(URLParams);

    if (treeId) {
      this.setState({isLoading: true});
      Axios.get(`${ConfigMain.getBackendURL()}/roadmapGet?id=${treeId}`)
      .then((response)=>this.treeFetchSuccess(response))
      .catch((error)=>this.treeFetchFailed(error));
    }
    else {
      this.setState({isLoading: false});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.tree && this.state.tree) {
      if (this.props.userProfile && this.props.userProfile._id) {
        this.props.userInteractionPush(this.props.userProfile._id, 
          UserInteractions.Types.PAGE_OPEN, 
          UserInteractions.SubTypes.PROG_TREE_VIEW, 
          { 
            treeId: this.state.tree._id,
          }
        );
      }
    }
  }

  componentWillUnmount() {
    if (this.state.tree && this.props.userProfile && this.props.userProfile._id) {
      this.props.userInteractionPush(this.props.userProfile._id, 
        UserInteractions.Types.PAGE_CLOSE, 
        UserInteractions.SubTypes.PROG_TREE_VIEW, 
        { 
          treeId: this.state.tree._id,
        }
      );
    }
  }

  render() {
    console.log("%cBrowsing Single Tree", "background: purple; color: white;");
    console.dir(this.state.tree);

    return this.renderTree();
  }

  handleCloseSkillBreakdown() {
    this.setState( { selectedSkill: undefined });
    this.props.progressionTreeSS();
  }

  handleOpenSkillBreakdown(skill) {
    this.setState( { selectedSkill: skill });
  }

  handleAddToMyTree() {
    this.props.startProgressionTree(this.props.userProfile._id, {_id: this.state.tree._id, name: this.state.tree.name});
  }

  renderSkills(skills) {
    const that = this;
    //TODO: Fix incorrect database structure
    let skillParsed = skills.length > 1 ? skills : skills[0].split(',');
    for (let i = 0; i < skillParsed.length; ++i) {
      skillParsed[i] = skillParsed[i].trim();
    }
    return (
    <div className="list-skill-wrap">
      {
        skillParsed.map(function(skill, i) {
          return (<Link key={i} to={{pathname:`/skillBrowser`, state: {tree: that.state.tree}, search:`?name=${skill}`}}>{skill}</Link>);
        })
      }
    </div>);
  }

  renderTree() {
    if (this.state.isLoading || this.props.isProfileLoading) {
      return (
      <div className="container-fluid progress-browser-wrap">
        <div className="row">
          <div className="content-2-columns-left-title">
            Loading...<Icon spin name="spinner" />
          </div>
        </div>
      </div>);
    }
    
    if (!this.state.tree) {
      return (
      <div className="container-fluid progress-browser-wrap">
        <div className="row">
          <div className="content-2-columns-left-title">
            Tree Not Found
          </div>
        </div>
      </div>);
    }

    return (
      <div className="container-fluid progress-browser-wrap">
        <div className="row">
          <div className="content-2-columns-left-title">
            <ActionLink className="skill-breakdown-control pull-right" id="button-arrow-back" onClick={()=> this.props.history.goBack()}>
              <span className="glyphicon glyphicon-arrow-left"/>
            </ActionLink>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="progress-browser-name">
              <h3>{this.state.tree.name}</h3>
            </div>
            <span className="tree-scaner-star-rating">
              <StarRatings rating={3.5} 
              isSelectable={false} isAggregateRating={true} numOfStars={ 5 } 
                starWidthAndHeight={'20px'} starSpacing={'2px'}
                starEmptyColor={"white"}
                starRatedColor={"rgb(180, 177, 3)"}/>
            </span>
            <p>{this.state.tree.description}</p>
            <div className="row">
              <div id="tree-skills">
                <div className="col-md-3 col-sm-12">
                  <div className="weightage-section">
                    <h4>Essentials skills</h4>
                    {this.renderSkills(this.state.tree.weightage1)}
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="weightage-section">
                    <h4>Complimentary skils</h4>
                    {this.renderSkills(this.state.tree.weightage2)}
                  </div>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="weightage-section">
                    <h4>Related skills</h4>
                    {this.renderSkills(this.state.tree.weightage3)}
                  </div>
                </div>
                {!this.isAddedTree() && <div className="col-md-2 col-sm-12">
                  <div className="add-tom-my-tree" onClick={() => this.handleAddToMyTree()}>
                    Add to My tree
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProgressiontreeBrowser.PropTypes = {
  userInteractionPush: PropTypes.func.isRequired,
  startProgressionTree: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userProfile: state.userProfile.profile,
  isProfileLoading: state.userProfile.isLoading,
});

const mapDispatchToProps = dispatch => ({
  userInteractionPush: bindActionCreators(userInteractionPush, dispatch),
  startProgressionTree: bindActionCreators(startProgressionTree, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressiontreeBrowser);