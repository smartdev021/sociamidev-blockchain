import { 
  USER_ACCOUNTING_FETCH_INITIATE,
  USER_ACCOUNTING_FETCH_COMPLETE,
} from '~/src/redux/actions/actionTypes';

const initialState = {data: {numTokens: 0}, isLoading: false};

export function accounting(state = initialState, action) {
  switch (action.type) {
    case USER_ACCOUNTING_FETCH_INITIATE:
      return {...state, isLoading: true};
    case USER_ACCOUNTING_FETCH_COMPLETE: {
      if (!action.data) {
        return initialState;
      }
      return {...state, isLoading: false, data: action.data};
    }
    
    default:
      return state;
    }
}