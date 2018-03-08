import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {Icon} from 'react-fa'

import {ProgressBar} from 'react-bootstrap'

import ActionLink from '~/src/components/common/ActionLink'

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import "./common.css"
import "./traitsSelection.css"

class TraitsSelection extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};
    }

    componentWillMount() {
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.background = "white";
      Modal.defaultStyles.content.color = 'initial';
      Modal.defaultStyles.content["height"] = '80%';
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
      this.props.onSelect(index);
    }

    handleSelectConfirm() {
      this.props.onClose();
    }

    render() {
      if (this.props.isFetchingCharacterTraits) {
        return (<Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Traits Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-traits-selection-container">
              <div id="character-traits-selection-container-inner">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <Icon spin name="spinner" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Modal>)
      }
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Traits Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-traits-selection-container">
              <div id="character-traits-selection-container-inner">
                <div className="text-center text-uppercase" id="character-selection-header">
                  Select Your Traits
                </div>
                <div className="container-fluid">
                  <div className="row">
                    {
                      this.props.traitsList.map((trait, i) => {
                        return (
                          <div className="col-lg-4 col-md-12" key={i}>
                            <div onClick={()=>this.handleSelectTrait(i)} 
                              className={`character-trait-container ${i == this.props.selectedIndex ? "character-trait-container-active" : ""}`}>
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
                        <ActionLink href="#" onClick={()=>this.props.onNextStep()} id="character-selection-next"
                           className="btn-base-landing btn-red-landing btn-login-landing text-uppercase">
                             Next
                        </ActionLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="character-creation-progressbar-container">
                  <ProgressBar striped bsStyle="danger" now={this.props.progressValue} />
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