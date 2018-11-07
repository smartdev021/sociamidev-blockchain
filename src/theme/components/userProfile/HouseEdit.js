import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';

import axios from 'axios';

import ConfigMain from '~/configs/main';

import '~/src/theme/css/characterHouseSelection.css';

class HouseEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseOveredIndex: undefined,
      selectedIndex:0,
      isModalOpen:false,
    };
  }

  componentWillMount() {
    this.modalDefaultStyles = Modal.defaultStyles;

    Modal.defaultStyles.content.background = 'unset';
    Modal.defaultStyles.content.border = 'unset';
    Modal.defaultStyles.content['overflow'] = 'auto';
  }

  handleChangeSelectedChatacter(index) {
    this.setState({ selectedIndex: index });
  }

  handleChangeSelectedChatacterMobile(index) {
    this.setState({ selectedIndex: index,isModalOpen: true });
  }

  closeHouseModalPopup(){
    this.setState({ isModalOpen: false });
  }

  handleMouseOverCharacter(index) {
    this.setState({ mouseOveredIndex: index });
  }

  handleMouseOutCharacter() {
    this.setState({ mouseOveredIndex: undefined });
  }

  handleHouseChange() {
     this.props.afterUpdateHouse(this.props.charactersList[this.state.selectedIndex]);
     const updatedCharacter = {
        characterId: this.props.charactersList[this.state.selectedIndex]._id,
        characterName: this.props.charactersList[this.state.selectedIndex].name,
        characterImage: this.props.charactersList[this.state.selectedIndex].imageUrl,
        characterIndex: this.state.selectedIndex
     };

     const data = {
       id: this.props.userProfileId,
       updatedCharacter: updatedCharacter
     };
     axios
     .post(`${ConfigMain.getBackendURL()}/updateHouseUserProfile`, data)
     .then(response => { })
     .catch(error => { });
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
                    className={`character-selection-button character-order ${
                      this.state.selectedIndex == i ? 'character-selected' : ''
                      }`}
                    onClick={() => this.handleChangeSelectedChatacter(i)}
                    onMouseOver={() => this.handleMouseOverCharacter(i)}
                    onMouseOut={() => this.handleMouseOutCharacter()}
                  >
                    <img src={character.imageUrl} />
                  </div>
                  <div className="character-name">{this.props.charactersList[i].name}</div>
                </div>
              );
            }
            return null;
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
                    className={`character-selection-button character-order ${
                      this.state.selectedIndex == i ? 'character-selected' : ''
                      }`}
                    onClick={() => this.handleChangeSelectedChatacterMobile(i)}>
                    <img src={character.imageUrl} />
                  </div>
                  <div className="character-name">{this.props.charactersList[i].name}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  renderMobileView(SelectedCharacter){
    const HouseModal = this.state.isModalOpen ? this.renderHouseModal(SelectedCharacter) : null;

    return(
      <div className="container house-mobile-view">
        {HouseModal}
        <div className="houses-wrapper">
          <div className="character-description-container">
            <div className='character-description-box'>
              <div className="character-header">
                {SelectedCharacter.name}
              </div>
              <div className="character-description">
                {SelectedCharacter.description && SelectedCharacter.description}
              </div>
              <ul className="character-skills">
                <li className="character-skill">
                  {SelectedCharacter.category}
                </li>
              </ul>
            </div>
          </div>
          {this.renderMobileCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
        </div>
        <div className="house-button-wrapper">
          <button type="button" className="back-button" onClick={this.props.handleHouseEditModal}>
            <p>Cancel</p>
          </button>
          <button type="button" className="next-button" onClick={()=>this.handleHouseChange()}>
            <p>Save</p>
          </button>
        </div>
      </div>
    )
  }

  renderHouseModal(SelectedCharacter){
    return (
      <div className="select-house-lightbox">
        <a
          className="fa fa-2x fa-times close-house-lightbox"
          onClick={() => this.closeHouseModalPopup()}
        />
        <div className="character-description-box-modal">
          <div className="character-header-modal">
            {SelectedCharacter.name}
          </div>
          <div className="character-description-modal">
            {SelectedCharacter.description && SelectedCharacter.description}
          </div>
          <ul className="character-skills-modal">
            <li className="character-skill-modal">
              {SelectedCharacter.category}
            </li>
          </ul>
        </div>

        <div className="house-button-wrapper-modal">
          <button type="button" className="back-button" onClick={() => this.closeHouseModalPopup()}>
            <p>Cancel</p>
          </button>
          <button type="button" className="next-button" onClick={()=>this.handleHouseChange()}>
            <p>Save</p>
          </button>
        </div>
      </div>
    );
  }

  render() {

    const SelectedCharacter = this.state.mouseOveredIndex
      ? this.props.charactersList[this.state.mouseOveredIndex] || {}
      : this.props.charactersList[this.state.selectedIndex] || {};

    return (
      <Modal
        isOpen={this.props.isHouseEdit}
      >
        <div className="user-profile-house-edit materialize-warper select-house-wrapper">
          <div className="container house-desktop-view">
            <div className="houses-wrapper">
              {this.renderCharacters(this.props.charactersList, 0, this.props.charactersList.length - 1)}
              <div className="character-description-container">
                <div className='character-description-box'>
                  <div className="select-house-header">
                    Select your House
                  </div>
                  <div className="select-house-desc">
                    Team members will be suggested to you based on your house,
                    including benefits that can aid your progression
                  </div>
                  <div className="select-house-desc">
                    What do you like?
                  </div>
                  <ul className="character-skills">
                    <li className="character-skill">
                      {SelectedCharacter.category}
                    </li>
                  </ul>
                  <div className="character-header">
                    {SelectedCharacter.name}
                  </div>
                  <div className="character-description">
                    {SelectedCharacter.description && SelectedCharacter.description}
                  </div>
                  <div className="house-button-wrapper">
                    <button type="button" className="back-button" onClick={this.props.handleHouseEditModal}>
                      <p>Cancel</p>
                    </button>
                    <button type="button" className="next-button" onClick={()=>this.handleHouseChange()}>
                      <p>Save</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.renderMobileView(SelectedCharacter)}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  charactersList: state.characterCreation.listCharacters,
});

export default connect(mapStateToProps)(HouseEdit);
