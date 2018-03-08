import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {ProgressBar} from 'react-bootstrap'

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import "./common.css"
import "./characterSelection.css"

class CharacterSelection extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};

      this.state = {
        mouseOveredIndex: undefined,
      }
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
      Modal.defaultStyles.content["padding"] = '0px 20px';
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

    handleMouseOverCharacter(index) {
      this.setState({mouseOveredIndex: index});
    }

    handleMouseOutCharacter() {
      this.setState({mouseOveredIndex: undefined});
    }

    renderCharacters(characters, firstIndex, lastIndex) {
      return (
        <div className="row">
          {
            characters.map((character, i) => {
              if (i >= firstIndex && i <= lastIndex) {
                return (
                  <div className="col-lg-12 col-md-4 col-sm-4 col-xsm-12" key={i}>
                    <div className={`character-selection-button ${this.props.selectedIndex == i ? 
                      'character-selected' : ""}`}
                      onClick={()=>this.handleChangeSelectedChatacter(i)} 
                      onMouseOver={()=>this.handleMouseOverCharacter(i)}
                      onMouseOut={()=>this.handleMouseOutCharacter()}
                      >
                      <img src={this.props.charactersList[i].imageURL}/>
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
      if (this.props.isFetchingCharacters) {
        return(
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Character Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-selection-container">
              <div id="character-selection-container-inner">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <Icon spin name="spinner" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      }
        const SelectedCharacter = this.state.mouseOveredIndex ? this.props.charactersList[this.state.mouseOveredIndex] 
        : this.props.charactersList[this.props.selectedIndex];
        console.log("SelectedCharacter");
        console.dir(SelectedCharacter);
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Character Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-selection-container">
              <div id="character-selection-container-inner">
                <div className="text-center text-uppercase" id="character-selection-header">
                  Select Your Character
                </div>
                <div className="container-fluid">
                  <div id="character-selection-image-big">
                    <img src={SelectedCharacter.imageBigURL}/>
                  </div>
                  <div className="row">
                    <div className="col-lg-2 col-md-12">
                      {this.renderCharacters(this.props.charactersList, 0, 2)}
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <div className="text-center" id="character-info">
                        <div id="character-name">
                          <div className="text-uppercase">{SelectedCharacter.name}</div>
                        </div>
                        <div id="character-description">
                          {SelectedCharacter.description1 && <p>{SelectedCharacter.description1}</p>}
                          {SelectedCharacter.description2 && <p>{SelectedCharacter.description2}</p>}
                          {SelectedCharacter.description3 && <p>{SelectedCharacter.description3}</p>}
                        </div>
                        <div id="character-skills">
                          {
                            SelectedCharacter.skills.map((skill, i) => {
                              return <span className="character-skill text-uppercase" key={i}>{skill}</span>
                            })
                          }
                        </div>
                      </div>
                      <div id="character-select-confirm-button-container" className="text-center">
                        <ActionLink href="#" onClick={()=>this.props.onNextStep({characterTraitsIndex: this.props.selectedIndex})}
                          className="btn-base-landing btn-red-landing btn-login-landing text-uppercase" id="character-select">
                          Select
                        </ActionLink>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-12">
                      {this.renderCharacters(this.props.charactersList, 3, this.props.charactersList.length - 1)}
                    </div>
                  </div>
                  <div className="character-creation-progressbar-container">
                    <ProgressBar striped bsStyle="danger" now={this.props.progressValue} />
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