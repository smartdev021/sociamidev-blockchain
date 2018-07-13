import React from 'react';
import PropTypes from 'prop-types';

import '~/src/theme/css/characterTraitSelection.css';

class CharacterTraitsSelection extends React.Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {
    
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
    // if (this.props.isFetchingCharacterTraits) {
    //   return (
    //     <Modal
    //       isOpen={true}
    //       onRequestClose={() => {}}
    //       contentLabel={'Traits Selection'}
    //       parentSelector={getPopupParentElement}
    //     >
    //       <Icon
    //         onClick={() => this.handleClose()}
    //         className="character-creation-popup-close-icon"
    //         name="times"
    //         aria-hidden="true"
    //       />
    //       <div id="character-traits-selection-container">
    //         <div id="-inner">
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
    return (
      <div className="select-trait-wrapper">
        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/select-trait-background.png" alt="step background" />
        <div>
            <p className="title-desktop">
                <span className="active">select your traits</span>
                <span>select your house</span>
                <span>plug in</span>
            </p>
            <p className="title-mobile">
                <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/step-title-mobile.png" alt="step title mobile" />
                <span className="active">select your traits</span>
                <span>select your house</span>
            </p>
            <div className="traits-wrapper">
                {this.props.traitsList.map((trait, i) => {
                let imgUrl
                let imgHoverUrl
                if(trait.name === "Realistic (Do'er)"){
                    imgUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/doer.png"
                    imgHoverUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/white-doer.png"
                }else if(trait.name === "Enterprising (Persuander)"){
                    imgUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/persuander.png"
                    imgHoverUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/white-persuander.png"
                }else if(trait.name === "Social (Helper)"){
                    imgUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/helper.png"
                    imgHoverUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/white-helper.png"
                }else if(trait.name === "Conventional (Organizer)"){
                    imgUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/organizer.png"
                    imgHoverUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/white-organizer.png"
                }else if(trait.name === "Investigative (Thinker)"){
                    imgUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/thinker.png"
                    imgHoverUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/white-thinker.png"
                }else if(trait.name === "Artistic (Creator)"){
                    imgUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/creator.png"
                    imgHoverUrl = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/white-creator.png"
                }
                return (
                    <div className="col-xs-6 col-sm-6 col-md-4 trait-card-container" key={i}>
                        <div className="trait-card" onClick={() => this.handleSelectTrait(i)}>
                            <img src={imgUrl} alt="" />
                            <img className="hover-image" src={imgHoverUrl} alt="" />
                            <h3>{trait.name}</h3>
                            <p>{trait.description}
                            </p>
                        </div>
                    </div>
                );
                })}
            </div>
            <div className="trait-button-wrapper">
              <button type="button" className="next-button" 
              onClick={() => this.props.onNextStep()}>
                <p>Next</p>
              </button>
            </div>
        </div>
    </div>
    );
  }
}

CharacterTraitsSelection.propTypes = {
  
};

export default (CharacterTraitsSelection);
