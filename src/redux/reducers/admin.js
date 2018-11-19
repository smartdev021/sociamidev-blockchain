import {
  ADD_USER_GUIDES_COMPLETE,
  ADD_USER_GUIDES_INITIATE,
  DELETE_USER_GUIDES_COMPLETE,
  DELETE_USER_GUIDES_INITIATE,
  FETCH_USER_GUIDES_COMPLETE,
  FETCH_USER_GUIDES_INITIATE,
  UPDATE_USER_GUIDES_COMPLETE,
  UPDATE_USER_GUIDES_INITIATE
} from '~/src/redux/actions/actionTypes';

const adminInitialState = {
  userGuides: [],
  updated: null,
}

export function admin(state = adminInitialState, action) {
  switch (action.type) {
    case FETCH_USER_GUIDES_INITIATE:
      return {...state, isFetchingUserGuides: true};
    case FETCH_USER_GUIDES_COMPLETE:
      return {...state, userGuides: action.userGuides, isFetchingUserGuides: false};
    case UPDATE_USER_GUIDES_INITIATE:
      return {...state, isUpdatingUserGuide: true};
    case UPDATE_USER_GUIDES_COMPLETE:
      const newItem =  action.updated
      return {...state,
        userGuides: {
          ...state.userGuides,
          data: state.userGuides.data.map(item => item._id === newItem._id?newItem:item),
        },
        isUpdatingUserGuide: false};
    case ADD_USER_GUIDES_INITIATE:
      return {...state, isSavingUserGuide: true};
    case ADD_USER_GUIDES_COMPLETE:
      return {
        ...state,
        userGuides: {
          ...state.userGuides,
          data: action.data ? [action.data, ...state.userGuides.data] : state.userGuides.data,
          total: action.data? state.userGuides.total + 1: state.userGuides.total,
        },
        isSavingUserGuide: false
      };
    case DELETE_USER_GUIDES_INITIATE:
      return {...state, isDeletingUserGuide: true};
    case DELETE_USER_GUIDES_COMPLETE:
      return {...state, userGuides: action.userGuides, isDeletingUserGuide: false};
    default:
      return state;
  }
}
