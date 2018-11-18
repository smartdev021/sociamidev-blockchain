import {
  FETCH_SKILLS_INITIATE,
  FETCH_SKILLS_COMPLETE,
  FETCH_CHALLENGE_STORY_INITIATE,
  FETCH_CHALLENGE_STORY_COMPLETE,
  UPDATE_SKILLS_INITIATE,
  UPDATE_SKILLS_COMPLETE,
  SAVE_SKILLS_INITIATE,
  SAVE_SKILLS_COMPLETE,
  DELETE_SKILLS_INITIATE,
  DELETE_SKILLS_COMPLETE
} from '~/src/redux/actions/actionTypes';

const skillsInitialState = {
  skills: [],
  isFetchingSkills: false,
  isUpdatingStory: false,
  isSavingStory: false,
  isDeletingStory: false,
  challengeStory: []
}

export function skills (state = skillsInitialState, action) {
  switch(action.type) {
    case FETCH_SKILLS_INITIATE: return {...state, isFetchingSkills: true};
    case FETCH_SKILLS_COMPLETE: return {...state, skills: action.skills, isFetchingSkills: false};
    case UPDATE_SKILLS_INITIATE:
      return { ...state, isUpdatingStory: true };
    case UPDATE_SKILLS_COMPLETE:
      return { ...state, skills: action.skills, isUpdatingStory: false };
    case SAVE_SKILLS_INITIATE:
      return { ...state, isSavingStory: true };
    case SAVE_SKILLS_COMPLETE:
      return { ...state, skills: action.skills, isSavingStory: false };
    case DELETE_SKILLS_INITIATE:
      return { ...state, isDeletingStory: true };
    case DELETE_SKILLS_COMPLETE:
      return { ...state, skills: action.skills, isDeletingStory: false };  
    case FETCH_CHALLENGE_STORY_INITIATE: return {...state, isFetchingSkills: true};
    case FETCH_CHALLENGE_STORY_COMPLETE: 
        return {...state, challengeStory: action.challengeStory, isFetchingSkills: false};
    default: return state;
  }
}
