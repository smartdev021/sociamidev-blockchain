
import {
    PREPARE_TIMERS_IN_PROGRESS,
    PREPARE_TIMERS_COMPLETE,
} from '~/src/redux/actions/actionTypes';

const timersInitialState = {data: [], isTimersInProgress: undefined};

export function timers(state = timersInitialState, action) {
    switch (action.type) {
      case PREPARE_TIMERS_IN_PROGRESS:
          return {...state, isTimersInProgress: true};
      case PREPARE_TIMERS_COMPLETE:
          return {...state, data : action.data, isTimersInProgress: false};
      default:
          return state;
      }
  }