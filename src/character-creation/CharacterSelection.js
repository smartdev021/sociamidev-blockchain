import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import "./common.css"
import "./characterSelection.css"

const charactersData = [
  {
    name: "Ashe", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Ashe.png", 
    descriptionText: "Ashe is a kin enthusias is in robotics and AI"
  },
  {
    name: "Kaye", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Kaye.png", 
    descriptionText: "Kaye is a kin enthusias is in robotics and AI"
  },
  {
    name: "Leo", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Ashe.png", 
    descriptionText: "Leo is a kin enthusias is in robotics and AI"
  },
  {
    name: "Leona", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leona.png", 
    descriptionText: "Leona is a kin enthusias is in robotics and AI"
  },
  {
    name: "Max", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Max.png", 
    descriptionText: "Max is a kin enthusias is in robotics and AI"
  },
  {
    name: "Nelson", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson.png", 
    descriptionText: "Nelson is a kin enthusias is in robotics and AI"
  },
];

class CharacterSelection extends React.Component {
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
      Modal.defaultStyles.content["overflowY"] = "fixed";
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
      this.setState({selectedIndex: index});
    }

    renderCharacters(characters, firstIndex, lastIndex) {
      return (
        <div>
          {
            characters.map((character, i) => {
              if (i >= firstIndex && i <= lastIndex) {
                return (
                  <div className="col-lg-12 col-md-4 col-sm-4 col-xsm-12" key={i}>
                    <ActionLink onClick={()=>this.handleChangeSelectedChatacter(i)} className={`character-selection-button ${this.state.selectedIndex == i ? 
                      'character-selected' : ""}`}>
                      <img src={charactersData[i].image}/>
                    </ActionLink>
                  </div>
                )
              }
            })
          }
        </div>
      )
    }

    render() {
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Character Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-selection-container">
              <div id="character-selection-container-inner">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="text-center" id="character-seelection-header">
                        <h3 className="text-uppercase">Select Your Character</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2 col-mg-12">
                      {this.renderCharacters(charactersData, 0, 2)}
                    </div>
                    <div className="col-lg-8 col-mg-12">
                      <div className="text-center" id="character-info">
                        <div id="character-name">
                          <h4 className="text-uppercase">Ashe</h4>
                        </div>
                        <div id="character-description">
                          <p>{charactersData[this.state.selectedIndex].descriptionText}</p>
                          <p>{charactersData[this.state.selectedIndex].descriptionText}</p>
                          <p>{charactersData[this.state.selectedIndex].descriptionText}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-mg-12">
                      {this.renderCharacters(charactersData, 3, charactersData.length - 1)}
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