
import {
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX,
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX,
    SET_CHARACTER_CREATION_DATA,
    START_CHARACTER_CREATION,
    FINISH_CHARACTER_CREATION,

    FETCH_LIST_CHARACTER_CLASSES_INITIATE,
    FETCH_LIST_CHARACTER_CLASSES_COMPLETE,
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
    name: "The business clairvoyants", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Ashe.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Ashe_big.png",
    descriptionText1: "The Business CLAIRVOYANTS House ensures the funding, legal and other constructs to spiral growth into the future economy.",
    descriptionText2: "",
    descriptionText3: "",
    skills: ["Finance", "Legal", "Business"],
  },
  {
    name: "The network clairvoyants", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Kaye.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Kaye_big.png",
    descriptionText1: "The Network Clairvoyants House are experts in the usage of technology to see all, or protect all from dangers that come in the future economy.",
    descriptionText2: "",
    descriptionText3: "",
    skills: ["Cybersecurity", "Networking"],
  },
  {
    name: "The bot tinkerers", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leo.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leo_big.png",
    descriptionText1: "The Bot Tinkerers House represent the usage of robots and data science for the growth of humankind in the future economy.",
    descriptionText2: "",
    descriptionText3: "",
    skills: ["Data Science", "Robotics"],
  },
  {
    name: "The Science illuminati", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leona.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Leona_big.png",
    descriptionText1: "The Science Illuminati House represent the usage of science and technology to further the cause of improving life in the future economy.",
    descriptionText2: "",
    descriptionText3: "",
    skills: ["Chemical Engineering", "BioTech"],
  },
  {
    name: "The executives", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Max.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Max_big.png",
    descriptionText1: "The Executives House manages the continued growth and operational sustainability of businesses for the future economies.",
    descriptionText2: "",
    descriptionText3: "",
    skills: ["Operations Management", "Big Data", "Data Analytics"],
  },
  {
    name: "The app ninjas", 
    image: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson.png",
    imageBig: "http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson_big.png",
    descriptionText1: "The App Ninjas House are able to build technology, across all kinds of applications, language, to develop the game-changing growth needed for the future economy.",
    skills: ["Data Science", "Programming"],
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

export function characterCreation(state = {listCharacters: [], listCharacterTraits: traits, isFetchingCharacters: false}, action) {
  switch (action.type) {
    case FETCH_LIST_CHARACTER_CLASSES_INITIATE:
      return {...state, isFetchingCharacters: true}
    case FETCH_LIST_CHARACTER_CLASSES_COMPLETE:
      return {...state, listCharacters: action.data, isFetchingCharacters: false}
    default:
      return state;
  }
}