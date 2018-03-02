import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {Icon} from 'react-fa'

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import "./common.css"
import "./traitsSelection.css"

const TraitsData = [
  {
    name: "Realistic (Do'er)",
    description: "Prefers physical activities that require skill, strenth and coordination."
  },
  {
    name: "Investigative (Thinker)",
    description: "Prefers working theory and information, thinking, organizing and understanding."
  },
  {
    name: "Artistic (Creator)",
    description: "Prefers creative, original and unsystematic activities that allow creative expression."
  },
  {
    name: "Social (Helper)",
    description: "Prefers activities that involve helping healing or developing others."
  },
  {
    name: "Enterprising (Persuander)",
    description: "Prefers competitive environments, leadership, influence, selling and status."
  },
  {
    name: "Conventional (Organizer)",
    description: "Prefers precise, rule regulated or derly and unambiguous activities."
  },
];

class TraitsSelection extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};

      this.state = {
        selectedIndex: 0,
      }
    }

    componentWillMount() {
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.background = "white";
      Modal.defaultStyles.content.color = 'initial';
      Modal.defaultStyles.content["height"] = '85%';
      Modal.defaultStyles.content["width"] = '75%';
      Modal.defaultStyles.content["minWidth"] = 'initial';
      Modal.defaultStyles.content["maxWidth"] = 'initial';
      Modal.defaultStyles.content["overflowX"] = "hidden";
      Modal.defaultStyles.content["overflowY"] = "hidden";
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
    }
      
    componentWillUnmount() {
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    handleClickOutside() {
       /* () => this.handleClose();*/
    }

    handleClose() {
      this.props.onClose();
    }

    handleSelectTrait(index) {
      this.setState({selectedIndex: index});
    }

    handleSelectConfirm() {
      this.props.onClose();
    }

    render() {
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Traits Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-traits-selection-container">
              <div id="character-traits-selection-container-inner">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="text-center" id="character-seelection-header">
                        <h3 className="text-uppercase">Select Your Traits</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {
                      TraitsData.map((trait, i) => {
                        return (
                          <div className="col-lg-4 col-md-12" key={i}>
                            <div onClick={()=>this.handleSelectTrait(i)} 
                              className={`character-trait-container ${i == this.state.selectedIndex ? "character-trait-container-active" : ""}`}>
                              <h3 className="charactet-trait-name">{trait.name}</h3>
                              <p className="charactet-trait-description">{trait.description}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div id="character-trait-select-confirm-button-container" className="text-center">
                        <button className="btn btn-danger text-uppercase"  onClick={()=>this.props.onNextStep({characterTraitsIndex: this.state.selectedIndex})}>
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
      )
    }
  }

  TraitsSelection.propTypes = {
  }
 
  export default require('react-click-outside')(TraitsSelection);