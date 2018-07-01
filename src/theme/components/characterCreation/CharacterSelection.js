import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { ProgressBar } from 'react-bootstrap';

import { getPopupParentElement } from '~/src/common/PopupUtils.js';

import { Icon } from 'react-fa';

import ActionLink from '~/src/components/common/ActionLink';

class CharacterSelection extends React.Component {
  constructor(props) {
    super(props);
    this.modalDefaultStyles = {};

    this.state = {
      mouseOveredIndex: undefined,
    };
  }

  componentWillMount() {
    this.modalDefaultStyles = Modal.defaultStyles;

    Modal.defaultStyles.content.background = 'white';
    Modal.defaultStyles.content.color = 'initial';

    Modal.defaultStyles.content['height'] = 'auto';
    // Modal.defaultStyles.content["width"] = '75%';

    Modal.defaultStyles.content['width'] = '1093px';

    Modal.defaultStyles.content['minWidth'] = 'initial';
    Modal.defaultStyles.content['maxWidth'] = 'initial';
    Modal.defaultStyles.content['overflowX'] = 'hidden';
    Modal.defaultStyles.content['overflowY'] = 'hidden';
    Modal.defaultStyles.content['marginLeft'] = 'auto';
    Modal.defaultStyles.content['marginRight'] = 'auto';
    Modal.defaultStyles.content['left'] = '0';
    Modal.defaultStyles.content['right'] = '0';
    Modal.defaultStyles.content['padding'] = '0px 0px 0px 0px';
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
    this.setState({ mouseOveredIndex: index });
  }

  handleMouseOutCharacter() {
    this.setState({ mouseOveredIndex: undefined });
  }

  renderCharacters(characters, firstIndex, lastIndex) {
    return (
      <div className="character-panel-container">
        <div className="character-panel">
          {characters.map((character, i) => {
            if (i >= firstIndex && i <= lastIndex) {
              return (
                <div className="col-xs-6 character-grid" key={i}>
                  <div
                    className={`character-selection-button character-order-${i} ${
                      this.props.selectedIndex == i ? 'character-selected' : ''
                    }`}
                    onClick={() => this.handleChangeSelectedChatacter(i)}
                    onMouseOver={() => this.handleMouseOverCharacter(i)}
                    onMouseOut={() => this.handleMouseOutCharacter()}
                  >
                    <img src={this.props.charactersList[i].imageURL} />
                  </div>
                  <div className="character-name">{this.props.charactersList[i].name}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  render() {
    // if (this.props.isFetchingCharacters) {
    //   return (
    //     <Modal
    //       isOpen={true}
    //       onRequestClose={() => {}}
    //       contentLabel={'Character Selection'}
    //       parentSelector={getPopupParentElement}
    //     >
    //       <Icon
    //         onClick={() => this.handleClose()}
    //         className="character-creation-popup-close-icon"
    //         name="times"
    //         aria-hidden="true"
    //       />
    //       <div id="character-selection-container">
    //         <div id="character-selection-container-inner">
    //           <div className="container-fluid">
    //             <div className="row">
    //               <div className="col-lg-12">
    //                 <Icon spin name="spinner" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Modal>
    //   );
    // }
    const SelectedCharacter = this.state.mouseOveredIndex
      ? this.props.charactersList[this.state.mouseOveredIndex]
      : this.props.charactersList[this.props.selectedIndex];

    return (
      // <Modal
      //   isOpen={true}
      //   onRequestClose={() => {}}
      //   contentLabel={'Character Selection'}
      //   parentSelector={getPopupParentElement}
      // >
      //   <Icon
      //     onClick={() => this.handleClose()}
      //     className="character-creation-popup-close-icon"
      //     name="times"
      //     aria-hidden="true"
      //   />
      //   <div id="character-selection-container">
      //     <div className="box-head character-header">
      //       <h1 className="create-character-heading">
      //         <span>Select Your House</span>
      //       </h1>
      //     </div>
      //     <div className="row character-row">
      //       {this.renderCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
      //       <div className="character-center">
      //         <div className="text-center" id="character-info">
      //           <div id="character-name">
      //             <div className="text-uppercase">{SelectedCharacter.name}</div>
      //           </div>
      //           <div id="character-description">
      //             {SelectedCharacter.description1 && <p>{SelectedCharacter.description1}</p>}
      //             {SelectedCharacter.description2 && <p>{SelectedCharacter.description2}</p>}
      //             {SelectedCharacter.description3 && <p>{SelectedCharacter.description3}</p>}
      //           </div>
      //           <div id="character-skills">
      //             {SelectedCharacter.skills.map((skill, i) => {
      //               return (
      //                 <span className="character-skill text-uppercase" key={i}>
      //                   {skill}
      //                 </span>
      //               );
      //             })}
      //           </div>
      //         </div>
      //         <div id="character-select-confirm-button-container" className="text-center">
      //           <ActionLink
      //             href="#"
      //             onClick={() => this.props.onNextStep({ characterTraitsIndex: this.props.selectedIndex })}
      //             className="btn-base-landing btn-red-landing btn-login-landing text-uppercase"
      //             id="character-select"
      //           >
      //             Select
      //           </ActionLink>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="character-creation-progressbar-container character-selection-progressbar">
      //       <ProgressBar striped bsStyle="danger" now={this.props.progressValue} />
      //     </div>
      //   </div>
      // </Modal>
      <div className="select-house-wrapper">
        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/select-trait-background.png" alt="step background" />
        <div>
            <p className="title-desktop">
                <span>select your traits</span>
                <span className="active">select your house</span>
                <span>plug in</span>
            </p>
            <p className="title-mobile">
                <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/step-title-mobile.png" alt="step title mobile" 
                style={{width: '100%'}}/>
                <span>select your traits</span>
                <span className="active">select your house</span>
            </p>
            <div className="houses-wrapper">
              {this.renderCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
              <div className="character-description-container">
                <div className="character-description-box"
                // style={{}}
                >
                    <div className="character-header">
                      {SelectedCharacter.name}
                    </div>
                    <div className="character-description">
                      {SelectedCharacter.description1 && SelectedCharacter.description1}
                      {SelectedCharacter.description2 && SelectedCharacter.description2}
                      {SelectedCharacter.description3 && SelectedCharacter.description3}
                    </div>
                    <ul  className="character-skills">
                      {SelectedCharacter.skills.map((skill, i) => {
                        return (
                          <li className="character-skill" key={i}>
                            {skill}
                          </li>
                        );
                      })}
                    </ul>
                </div>
              </div>
            </div>
            <div className="house-button-wrapper">
              <button type="button" className="back-button" onClick={() => this.props.onNextStep()}>
                <p>Back</p>
              </button>
              <button type="button" className="next-button" 
              onClick={() => this.props.onNextStep({ characterTraitsIndex: this.props.selectedIndex })}>
                <p>Next</p>
              </button>
            </div>
        </div>
    </div>
    );
  }
}

CharacterSelection.propTypes = {};

export default require('react-click-outside')(CharacterSelection);
