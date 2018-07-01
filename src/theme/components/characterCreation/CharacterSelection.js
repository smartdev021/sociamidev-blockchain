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
      this.modalDefaultStyles = {
        width: '90%',
        margin: '0 auto',
        paddingTop: '40px'
      };

      this.state = {
        mouseOveredIndex: undefined,
        isModalOpen: false
      };
    }

    componentWillMount() {
      this.modalDefaultStyles = Modal.defaultStyles;
    }

    componentWillUnmount() {
      // Modal.defaultStyles = this.modalDefaultStyles;
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

    handleChangeSelectedChatacterMobile(index) {
      this.props.onSelect(index);
      this.setState({ isModalOpen: true });
    }

    closeHouseModalPopup(){
      this.setState({ isModalOpen: false });
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

    renderMobileCharacters(characters, firstIndex, lastIndex) {
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
                      onClick={() => this.handleChangeSelectedChatacterMobile(i)}>
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

    renderMobileView(SelectedCharacter){
      const HouseModal = this.state.isModalOpen ? this.renderHouseModal(SelectedCharacter) : null;
        return(
          <div className="house-mobile-view">
              {HouseModal}
              <p className="title-mobile">
                  <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/step-title-mobile.png" alt="step title mobile" 
                  style={{width: '100%'}}/>
                  <span>select your traits</span>
                  <span className="active">select your house</span>
              </p>
              <div className="houses-wrapper">
                <div className="character-description-container">
                  <div className="character-description-box">
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
                {this.renderMobileCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
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
        )
    }

    renderHouseModal(SelectedCharacter){
        return (
          <div className="select-house-lightbox" onClick={() => this.onClose()}>
            <a
              className="fa fa-2x fa-times close-house-lightbox"
              onClick={() => this.closeHouseModalPopup()}
            />
            <div className="character-description-box-modal">
                  <div className="character-header-modal">
                    {SelectedCharacter.name}
                  </div>
                  <div className="character-description-modal">
                    {SelectedCharacter.description1 && SelectedCharacter.description1}
                    {SelectedCharacter.description2 && SelectedCharacter.description2}
                    {SelectedCharacter.description3 && SelectedCharacter.description3}
                  </div>
                  <ul  className="character-skills-modal">
                    {SelectedCharacter.skills.map((skill, i) => {
                      return (
                        <li className="character-skill-modal" key={i}>
                          {skill}
                        </li>
                      );
                    })}
                  </ul>
              </div>

              <div className="house-button-wrapper-modal">
                <button type="button" className="back-button" onClick={() => this.props.onNextStep()}>
                  <p>Back</p>
                </button>
                <button type="button" className="next-button" 
                onClick={() => this.props.onNextStep({ characterTraitsIndex: this.props.selectedIndex })}>
                  <p>Next</p>
                </button>
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

      // const HouseModal = () => {
      //   const SelectedCharacter = this.state.mouseOveredIndex
      //   ? this.props.charactersList[this.state.mouseOveredIndex]
      //   : this.props.charactersList[this.props.selectedIndex];
      //   return(
      //     <Modal
      //       isOpen={this.state.isModalOpen}
      //       onRequestClose={() => this.closeHouseModalPopup()}
      //       contentLabel={'Character Selection'}
      //     >
      //       <div className="character-description-box-modal"
      //       // style={{}}
      //       >
      //           <div className="character-header-modal">
      //             {SelectedCharacter.name}
      //           </div>
      //           <div className="character-description-modal">
      //             {SelectedCharacter.description1 && SelectedCharacter.description1}
      //             {SelectedCharacter.description2 && SelectedCharacter.description2}
      //             {SelectedCharacter.description3 && SelectedCharacter.description3}
      //           </div>
      //           <ul  className="character-skills-modal">
      //             {SelectedCharacter.skills.map((skill, i) => {
      //               return (
      //                 <li className="character-skill-modal" key={i}>
      //                   {skill}
      //                 </li>
      //               );
      //             })}
      //           </ul>
      //       </div>

      //       <div className="house-button-wrapper">
      //         <button type="button" className="back-button" onClick={() => this.props.onNextStep()}>
      //           <p>Back</p>
      //         </button>
      //         <button type="button" className="next-button" 
      //         onClick={() => this.props.onNextStep({ characterTraitsIndex: this.props.selectedIndex })}>
      //           <p>Next</p>
      //         </button>
      //       </div>
            
      //     </Modal>
      //   )
      // }

      // const renderModal() {
      //   return (
      //     <div className="ptree-video-lightbox" onClick={() => this.onPlayVideo()}>
      //       <div className="ptree-video-container">
      //         <iframe
      //           className="ptree-video"
      //           width="420"
      //           height="345"
      //           id="intro-video"
      //           src="https://www.youtube.com/embed/i8PJgSclIf0"
      //         />
      //         <a
      //           className="fa fa-2x fa-times"
      //           style={{ color: 'white', verticalAlign: 'top' }}
      //           onClick={() => this.onPlayVideo()}
      //         />
      //       </div>
      //     </div>
      //   );
      // }

      // const HouseModal = this.state.isModalOpen ? this.renderVideo() : null;

      // const MobileView = () => {
      //   return(
      //     <div className="house-mobile-view">
      //         <HouseModal />
      //         <p className="title-mobile">
      //             <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/step-title-mobile.png" alt="step title mobile" 
      //             style={{width: '100%'}}/>
      //             <span>select your traits</span>
      //             <span className="active">select your house</span>
      //         </p>
      //         <div className="houses-wrapper">
      //           <div className="character-description-container">
      //             <div className="character-description-box"
      //             // style={{}}
      //             >
      //                 <div className="character-header">
      //                   {SelectedCharacter.name}
      //                 </div>
      //                 <div className="character-description">
      //                   {SelectedCharacter.description1 && SelectedCharacter.description1}
      //                   {SelectedCharacter.description2 && SelectedCharacter.description2}
      //                   {SelectedCharacter.description3 && SelectedCharacter.description3}
      //                 </div>
      //                 <ul  className="character-skills">
      //                   {SelectedCharacter.skills.map((skill, i) => {
      //                     return (
      //                       <li className="character-skill" key={i}>
      //                         {skill}
      //                       </li>
      //                     );
      //                   })}
      //                 </ul>
      //             </div>
      //           </div>
      //           {this.renderMobileCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
      //         </div>
      //         <div className="house-button-wrapper">
      //           <button type="button" className="back-button" onClick={() => this.props.onNextStep()}>
      //             <p>Back</p>
      //           </button>
      //           <button type="button" className="next-button" 
      //           onClick={() => this.props.onNextStep({ characterTraitsIndex: this.props.selectedIndex })}>
      //             <p>Next</p>
      //           </button>
      //         </div>
      //     </div>
      //   )
      // }

      return (
        <div className="select-house-wrapper">
          <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/select-trait-background.png" alt="step background" />
          <div className="house-desktop-view">
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
                  <div className="character-description-box">
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
          {this.renderMobileView(SelectedCharacter)}
      </div>
      );
    }
  }

  CharacterSelection.propTypes = {};

  export default require('react-click-outside')(CharacterSelection);
