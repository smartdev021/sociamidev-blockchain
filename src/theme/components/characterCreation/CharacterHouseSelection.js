  import React from 'react';
  import Modal from 'react-modal';
  import PropTypes from 'prop-types';

  import { getPopupParentElement } from '~/src/common/PopupUtils.js';

  import { Icon } from 'react-fa';

  import '~/src/theme/css/characterHouseSelection.css';

  class CharacterHouseSelection extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        mouseOveredIndex: undefined,
        isModalOpen: false
      };
    }

    componentWillMount() {
      
    }

    componentWillUnmount() {
      
    }

    componentDidMount(){
      window.scrollTo(0, 0);
    }

    handleClickOutside() {
      
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
              let backgroundImageUrl
              if(character.name == 'The business clairvoyants'){
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img6.jpg'
              }else if(character.name == 'The executives'){
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img1.jpg'
              }else if(character.name == 'The network clairvoyants'){
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img4.jpg'
              }else if(character.name == 'The Science illuminati'){
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img3.jpg'
              }else if(character.name == 'The bot tinkerers'){
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img2.jpg'
              }else if(character.name == 'The app ninjas'){
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
              }else{
                backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
              }
              if (i >= firstIndex && i <= lastIndex) {
                return (
                  <div className="col-xs-6 character-grid" key={i}>
                    <div
                      className={`character-selection-button character-order ${
                        this.props.selectedIndex == i ? 'character-selected' : ''
                      }`}
                      onClick={() => this.handleChangeSelectedChatacter(i)}
                      onMouseOver={() => this.handleMouseOverCharacter(i)}
                      onMouseOut={() => this.handleMouseOutCharacter()}
                    >
                      {/* <img src={this.props.charactersList[i].imageURL} /> */}
                      <img src={backgroundImageUrl} />
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
                let backgroundImageUrl
                if(character.name == 'The business clairvoyants'){
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img6.jpg'
                }else if(character.name == 'The executives'){
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img1.jpg'
                }else if(character.name == 'The network clairvoyants'){
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img4.jpg'
                }else if(character.name == 'The Science illuminati'){
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img3.jpg'
                }else if(character.name == 'The bot tinkerers'){
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img2.jpg'
                }else if(character.name == 'The app ninjas'){
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
                }else{
                  backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
                }
                return (
                  <div className="col-xs-6 character-grid" key={i}>
                    <div
                      className={`character-selection-button character-order ${
                        this.props.selectedIndex == i ? 'character-selected' : ''
                      }`}
                      onClick={() => this.handleChangeSelectedChatacterMobile(i)}>
                      {/* <img src={this.props.charactersList[i].imageURL} /> */}
                      <img src={backgroundImageUrl} />
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
      let backgroundImageUrl
      if(SelectedCharacter.name == 'The business clairvoyants'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img6.jpg'
      }else if(SelectedCharacter.name == 'The executives'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img1.jpg'
      }else if(SelectedCharacter.name == 'The network clairvoyants'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img4.jpg'
      }else if(SelectedCharacter.name == 'The Science illuminati'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img3.jpg'
      }else if(SelectedCharacter.name == 'The bot tinkerers'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img2.jpg'
      }else if(SelectedCharacter.name == 'The app ninjas'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
      }else{
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
      }
        return(
          <div className="container house-mobile-view">
              {HouseModal}
              <div className="character-wizard-steps-mobile">
                  <div className="col-xs-6 step-1">
                      <div className="wizard-circle" style={{float:'left'}}></div>
                      <div className="wizard-line" style={{float:'right'}}></div>
                      <div className="wizard-step" >SELECT YOUR TRAITS</div>
                  </div>
                  <div className="col-xs-6 step-2">
                      <div className="active-wizard-circle" style={{float:'left'}}></div>
                      <div className="wizard-line" style={{float:'right'}}></div>
                      <div className="wizard-step active">SELECT YOUR HOUSE</div>
                  </div>
              </div>
              <div className="houses-wrapper">
                <div className="character-description-container">
                  <div className='character-description-box' style={{backgroundImage: `url(${backgroundImageUrl})`}}>
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
                <button type="button" className="back-button" onClick={() => this.props.onPreviousStep()}>
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
      let backgroundImageUrl
      if(SelectedCharacter.name == 'The business clairvoyants'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img6.jpg'
      }else if(SelectedCharacter.name == 'The executives'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img1.jpg'
      }else if(SelectedCharacter.name == 'The network clairvoyants'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img4.jpg'
      }else if(SelectedCharacter.name == 'The Science illuminati'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img3.jpg'
      }else if(SelectedCharacter.name == 'The bot tinkerers'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img2.jpg'
      }else if(SelectedCharacter.name == 'The app ninjas'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
      }else{
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
      }
        return (
          <div className="select-house-lightbox">
            <a
              className="fa fa-2x fa-times close-house-lightbox"
              onClick={() => this.closeHouseModalPopup()}
            />
            <div className="character-description-box-modal" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
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

        
      let backgroundImageUrl
      if(SelectedCharacter.name == 'The business clairvoyants'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img6.jpg'
      }else if(SelectedCharacter.name == 'The executives'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img1.jpg'
      }else if(SelectedCharacter.name == 'The network clairvoyants'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img4.jpg'
      }else if(SelectedCharacter.name == 'The Science illuminati'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img3.jpg'
      }else if(SelectedCharacter.name == 'The bot tinkerers'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img2.jpg'
      }else if(SelectedCharacter.name == 'The app ninjas'){
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
      }else{
        backgroundImageUrl = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/houses/house-img5.jpg'
      }
      return (
        <div className="materialize-warper select-house-wrapper">
          {/* <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/select-trait-background.png" alt="step background" /> */}
          <div className="container house-desktop-view">
              <div className="character-wizard-steps">
                  <div className="wizard-circle" style={{float:'left'}}></div>
                  <div className="wizard-step">SELECT YOUR TRAITS</div>
                  <div className="wizard-line"></div>
                  <div className="active-wizard-circle"></div>
                  <div className="wizard-step active">SELECT YOUR HOUSE</div>
                  <div className="wizard-line"></div>
                  <div className="wizard-circle"></div>
                  <div className="wizard-step" style={{float:'right'}}>PLUGIN</div>
              </div>
              <div className="houses-wrapper">
                {this.renderCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
                <div className="character-description-container">
                  <div className='character-description-box' style={{backgroundImage: `url(${backgroundImageUrl})`}}>
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
                <button type="button" className="back-button"  onClick={() => this.props.onPreviousStep()}>
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

  CharacterHouseSelection.propTypes = {};

  export default (CharacterHouseSelection);
