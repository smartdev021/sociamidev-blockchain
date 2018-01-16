/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import "~/src/theme/css/common.css"
import "~/src/theme/css/progressionTrees.css"

import PopupAcceptProgressionTree from "~/src/theme/components/PopupAcceptProgressionTree"

import ProgressiontreesScanner from "~/src/theme/components/progressiontrees/ProgressiontreesScanner"
import ProgressiontreesMyProgress from "~/src/theme/components/progressiontrees/ProgressiontreesMyProgress"
import ProgressiontreeBrowser from "~/src/theme/components/progressiontrees/ProgressiontreeBrowser"

import ActionLink from '~/src/components/common/ActionLink'

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

class ProgressionTrees extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scannerQuery: "",
      isAcceptProgressionTreePopupOpen: false,
      scannerSelectedTreeId: undefined,
      scannerSelectedTreeName: "",

      selectedTreeFromMyProgressIndex: -1,

      isScannerExpanded: false,
    }

    this.handleStopProgressionTree = this.handleStopProgressionTree.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({scannerQuery: e.target.value});
  }

  handleOpenSingleTree(id) {
    const foundTreeIndex = this.props.roadmapsAdmin.data.findIndex(function(tree) {
      return tree._id == id;
    })

    if (foundTreeIndex != -1) {
      this.setState({ selectedTreeFromMyProgressIndex: foundTreeIndex });
    }
  }

  handleStopProgressionTree(id) {
    console.log("Removing progression tree");
    this.props.stopProgressionTree(this.props.userProfile._id, {_id: id});
  }

  handleCloseSingleTree(id) {
    this.setState({ selectedTreeFromMyProgressIndex: -1 });
  }

  componentWillMount() {
    this.props.fetchRoadmaps();

    this.props.fetchRoadmapsFromAdmin();
  }

  renderUserProgressionTrees() {
    return (
      <div id="progression-trees-trees">
      {
        this.state.selectedTreeFromMyProgressIndex != -1 ?
          <ProgressiontreeBrowser tree={this.props.roadmapsAdmin.data[this.state.selectedTreeFromMyProgressIndex]} 
            onCloseSingleTree={()=>this.handleCloseSingleTree()} userProfile={this.props.userProfile} saveTask={this.props.saveTask}/>
          :
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="content-2-columns-left-title">
                <ActionLink href="#" onClick={()=> {
                  if (this.props.isAuthorized && this.props.userProfile.progressionTrees.length > 0) {
                    this.setState({isScannerExpanded: this.state.isScannerExpanded});
                  }
                     
                  }}>
                  My Progress
                </ActionLink>
                </div>
              </div>
            </div>
            <ProgressiontreesMyProgress trees={this.props.userProfile.progressionTrees} 
              isAuthorized={this.props.isAuthorized} openSingleTree={(id)=>this.handleOpenSingleTree(id)}
              stopProgressionTree={(id)=>this.handleStopProgressionTree(id)}/>
          </div>
      }
        
      </div>
    );
  }

  openTreeAcceptConfirmationPopup(treeId, treeName) {
    console.log(`treeId: ${treeId}, treeName: ${treeName}`);
    if (this.props.isAuthorized) {
        this.setState({scannerSelectedTreeId: treeId, scannerSelectedTreeName: treeName, isAcceptProgressionTreePopupOpen: true});
    }
  }

  onTreeAcceptConfirmationPopupClose(option, treeId) {
    this.setState({scannerSelectedTreeId: undefined, scannerSelectedTreeName: "", isAcceptProgressionTreePopupOpen: false});
    console.log(`Confirmation popup option: ${option} treeId: ${treeId}`);

    if (option === true && treeId) {
      let foundRoadmaps = [];
      
      const scannerQuery = this.state.scannerQuery.toLowerCase();
          
      if (scannerQuery != "") {
        foundRoadmaps = this.props.roadmapsAdmin.data.filter(function(roadmap) {
          return roadmap.name && roadmap.name.toLowerCase().startsWith(scannerQuery);
        });
      }
      else {
        foundRoadmaps = this.props.roadmapsAdmin.data;
      }

      const findById = (currentRoadmap) => {
        return currentRoadmap._id == treeId;
      }

      const foundRoadmap = foundRoadmaps.find(findById);

      if (foundRoadmap) {
       this.props.startProgressionTree(this.props.userProfile._id, {_id: foundRoadmap._id, name: foundRoadmap.name});
      }
    }
  }

  render() {
    const that = this;
    const treesScanner = this.props.roadmapsAdmin.data.filter(function(roadmap) {
      return that.props.userProfile.progressionTrees.findIndex(function(tree) {return tree._id == roadmap._id;}) == -1;
    });

    let rightSideClassName = "col-lg-3";

    if (!this.props.isAuthorized) {
      rightSideClassName = "col-lg-12";
    }
    else {
      if (this.props.userProfile.progressionTrees.length == 0 || this.state.isScannerExpanded) {
        rightSideClassName = "col-lg-11";
      }
    }

    let leftSideClassName = "col-lg-9";

    if (this.props.userProfile.progressionTrees.length == 0 || this.state.isScannerExpanded) {
      leftSideClassName = "col-lg-1";
    }

    return (
        <div className="content-2-columns-wrapper" id="progression-trees">
          {this.state.isAcceptProgressionTreePopupOpen 
              && <PopupAcceptProgressionTree treeId={this.state.scannerSelectedTreeId}
              treeName={this.state.scannerSelectedTreeName}
              modalIsOpen={this.state.isAcceptProgressionTreePopupOpen}
                onConfirmationPopupClose={(option, treeId)=>this.onTreeAcceptConfirmationPopupClose(option, treeId)}
              />
          }
          <div className="container-fluid">
            <div className="row">
              {this.props.isAuthorized && 
                <div className={leftSideClassName}>
                  <div className="content-2-columns-left">
                    {this.renderUserProgressionTrees()}
                  </div>
                </div>
              }
              {/*Right Side*/}
              <div className={rightSideClassName}>
                <div id="progression-trees-scanner">
                  <div id="progression-trees-scanner-container">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-12">
                          <div id="scanner-input-container">
                            <input type="text" autoComplete="off" id="scanner_trees" placeholder="" onChange={(e) => this.handleChange(e)}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div id="trees-scanner-container">
                            <ProgressiontreesScanner scannerQuery={this.state.scannerQuery} trees={treesScanner} 
                              openTreeAcceptConfirmationPopup={(treeId, treeName)=>this.openTreeAcceptConfirmationPopup(treeId, treeName)}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

ProgressionTrees.propTypes = {
  fetchRoadmaps: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
  fetchRoadmapsFromAdmin: PropTypes.func.isRequired,
  startProgressionTree: PropTypes.func.isRequired,
  roadmaps: PropTypes.object.isRequired,
  roadmapsAdmin: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  userProfile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  roadmaps: state.roadmaps,
  roadmapsAdmin: state.roadmapsAdmin,
  isAuthorized: state.userProfile.isAuthorized,
  userProfile: state.userProfile.profile,
})

const mapDispatchToProps = dispatch => ({
  fetchRoadmaps: bindActionCreators(fetchRoadmaps, dispatch),
  saveTask: bindActionCreators(saveTask, dispatch),
  startProgressionTree: bindActionCreators(startProgressionTree, dispatch),
  stopProgressionTree: bindActionCreators(stopProgressionTree, dispatch),
  fetchRoadmapsFromAdmin: bindActionCreators(fetchRoadmapsFromAdmin, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionTrees);