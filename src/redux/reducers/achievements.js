import { FETCH_ACHIEVEMENTS_INITIATE, FETCH_ACHIEVEMENTS_COMPLETE } from '~/src/redux/actions/actionTypes';

const achievementsInitialState = {
  data: [],
  isFetchingAchievements: false,
};

export function achievements(state = achievementsInitialState, action) {
  switch (action.type) {
    case FETCH_ACHIEVEMENTS_INITIATE:
      return { ...state, isFetchingAchievements: true };
    case FETCH_ACHIEVEMENTS_COMPLETE:
      return { ...state, data: action.data, isFetchingAchievements: false };
    default:
      return state;
  }
}
