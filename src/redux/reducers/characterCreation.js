
import {
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX,
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX,
    SET_CHARACTER_CREATION_DATA,
    START_CHARACTER_CREATION,
    FINISH_CHARACTER_CREATION,
} from '~/src/redux/actions/actionTypes';

const characterCreationDataInitialState = {
  selectedCharacterIndex: 0,
  selectedTraitsIndex: 0,
  isInProgress: false,
};

export function characterCreationData(state = characterCreationDataInitialState, action) {
  switch (action.type) {
    case SET_CHARACTER_CREATION_DATA:
      return action.data;
    case SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX:
      return {...state, selectedCharacterIndex: action.index}
    case SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX:
      return {...state, selectedTraitsIndex: action.index}
    case START_CHARACTER_CREATION:
      return {...characterCreationDataInitialState, isInProgress: true}
    case FINISH_CHARACTER_CREATION:
      return {...state, isInProgress: false}
    default:
      return state;
  }
}

const characters = [
  {
    name: "Ashe", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Ashe.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Ashe_big.png",
    descriptionText1: "Ashe is a kin enthusias is in robotics and AI",
    descriptionText2: "Ashe is a kin enthusias is in robotics and AI",
    descriptionText3: "Ashe is a kin enthusias is in robotics and AI",
  },
  {
    name: "Kaye", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Kaye.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Kaye_big.png",
    descriptionText1: "Kaye is a kin enthusias is in robotics and AI",
    descriptionText2: "Kaye is a kin enthusias is in robotics and AI",
    descriptionText3: "Kaye is a kin enthusias is in robotics and AI",
  },
  {
    name: "Leo", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leo.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leo_big.png",
    descriptionText1: "Leo is a kin enthusias is in robotics and AI",
    descriptionText2: "Leo is a kin enthusias is in robotics and AI",
    descriptionText3: "Leo is a kin enthusias is in robotics and AI",
  },
  {
    name: "Leona", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leona.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leona_big.png",
    descriptionText1: "Leona is a kin enthusias is in robotics and AI",
    descriptionText2: "Leona is a kin enthusias is in robotics and AI",
    descriptionText3: "Leona is a kin enthusias is in robotics and AI",
  },
  {
    name: "Max", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Max.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Max_big.png",
    descriptionText1: "Max is a kin enthusias is in robotics and AI",
    descriptionText2: "Max is a kin enthusias is in robotics and AI",
    descriptionText3: "Max is a kin enthusias is in robotics and AI",
  },
  {
    name: "Nelson", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson_big.png",
    descriptionText1: "Nelson is a kin enthusias is in robotics and AI",
    descriptionText2: "Nelson is a kin enthusias is in robotics and AI",
    descriptionText3: "Nelson is a kin enthusias is in robotics and AI",
  },
];

const traits = [
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

export function characterCreation(state = {listCharacters: characters, listCharacterTraits: traits}, action) {
  switch (action.type) {
    default:
      return state;
  }
}