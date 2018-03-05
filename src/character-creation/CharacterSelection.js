import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import "./common.css"
import "./characterSelection.css"

class CharacterSelection extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};
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

    handleChangeSelectedChatacter(index) {
      this.props.onSelect(index);
    }

    handleCharacterSelectConfirm() {
      this.props.onClose();
    }

    renderCharacters(characters, firstIndex, lastIndex) {
      return (
        <div className="row">
          {
            characters.map((character, i) => {
              if (i >= firstIndex && i <= lastIndex) {
                return (
                  <div className="col-lg-12 col-md-4 col-sm-4 col-xsm-12" key={i}>
                    <div className="character-selection-button-container">
                      <ActionLink onClick={()=>this.handleChangeSelectedChatacter(i)} 
                        className={`character-selection-button ${this.props.selectedIndex == i ? 
                        'character-selected' : ""}`}>
                        <img src={this.props.charactersList[i].image}/>
                      </ActionLink>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      )
    }

    render() {
        const SelectedCharacter = this.props.charactersList[this.props.selectedIndex];
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Character Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-selection-container">
              <div id="character-selection-container-inner">
                <div className="container-fluid">
                  <div id="character-selection-image-big">
                    <img src={SelectedCharacter.imageBig}/>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="text-center" id="character-seelection-header">
                        <h3 className="text-uppercase">Select Your Character</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2 col-md-12">
                      {this.renderCharacters(this.props.charactersList, 0, 2)}
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <div className="text-center" id="character-info">
                        <div id="character-name">
                          <h4 className="text-uppercase">{SelectedCharacter.name}</h4>
                        </div>
                        <div id="character-description">
                          <p>{SelectedCharacter.descriptionText1}</p>
                          <p>{SelectedCharacter.descriptionText2}</p>
                          <p>{SelectedCharacter.descriptionText3}</p>
                        </div>
                        <div id="character-skills">
                          {
                            SelectedCharacter.skills.map((skill, i) => {
                              return <span className="character-skill">{skill}</span>
                            })
                          }
                        </div>
                        <div id="character-select-confirm-button-container">
                          <button className="btn btn-danger text-uppercase" onClick={()=>this.props.onNextStep({characterIndex: this.props.selectedIndex})}>
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-12">
                      {this.renderCharacters(this.props.charactersList, 3, this.props.charactersList.length - 1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
      )
    }
  }

  CharacterSelection.propTypes = {
  }
 
  export default require('react-click-outside')(CharacterSelection);