import {
  SELECT_RESULTS_CATEGORY,
  OPEN_USER_PROFILE, 
  OPEN_USER_PROFILE_COMPLETE,
  OPEN_SEARCH_RESULTS,
  OPEN_SEARCH_RESULTS_COMPLETE,

  FETCH_USER_PROFILE_COMPLETE,

  FETCH_JOB_ITEMS_COMPLETE,
  FETCH_EVENT_ITEMS_COMPLETE,
  FETCH_COURSE_ITEMS_COMPLETE,
  FETCH_GIG_ITEMS_COMPLETE,
  
  FETCH_RESULTS_INITIATE,
  FETCH_RESULTS_COMPLETE,

  BOOKMARK_ADD,
  BOOKMARK_REMOVE,
  BOOKMARK_REMOVE_ALL,
} from '../actions/actionTypes';

export function currentCategory(state = "RESULTS_CATEGORY_JOBS", action) {
    switch (action.type) {
        case SELECT_RESULTS_CATEGORY:
          return action.category;
        default:
          return state;
      }
}

export function isOpenProfilePending(state = false, action) {
    switch (action.type) {
        case OPEN_USER_PROFILE:
          return (!state) ? true : state;
        case OPEN_USER_PROFILE_COMPLETE:
          return (state) ? false : state;
        default:
          return state;
      }
}

export function isOpenSearchResultsPending(state = false, action) {
  switch (action.type) {
      case OPEN_SEARCH_RESULTS:
        return (!state) ? true : state;
      case OPEN_SEARCH_RESULTS_COMPLETE:
        return (state) ? false : state;
      default:
        return state;
    }
}

export function isFetchInProgress(state = false, action) {
  switch (action.type) {
      case FETCH_RESULTS_INITIATE:
        return (!state) ? true : state;
      case FETCH_RESULTS_COMPLETE:
        return (state) ? false : state;
      default:
        return state;
    }
}

const searchResultsInitialState = {jobs: [], events: [], courses: [], gigs: [], numJobs: 0, numCourses: 0, numEvents: 0, numGigs: 0};

export function searchResults(state = searchResultsInitialState, action) {
  switch (action.type) {
      case FETCH_JOB_ITEMS_COMPLETE:
        return {...state, jobs : action.items, numJobs: action.items.length};
      case FETCH_EVENT_ITEMS_COMPLETE:
        return {...state, events : action.items, numEvents: action.items.length};
      case FETCH_COURSE_ITEMS_COMPLETE:
        return {...state, courses : action.items, numCourses: action.items.length};
      case FETCH_GIG_ITEMS_COMPLETE:
        return {...state, gigs : action.items, numGigs: action.items.length};
      default:
        return state;
    }
}

const userProfileInitialState = {
  firstName: 'John', 
  lastName: 'Doe', 
  interests: 'programming, study',
  skills: 'javascript, c++', 
  experience: 'Google',
  education: 'Harvard'
};

export function userProfile(state = userProfileInitialState, action) {
  switch (action.type) {
      case FETCH_USER_PROFILE_COMPLETE:
        return action.profile;
      default:
        return state;
    }
}

const bookmarksInitialState = {bookmarks: [], amount: 0};

export function bookmarks(state = bookmarksInitialState, action) {
  switch (action.type) {
      case BOOKMARK_ADD:
      {
        for (let i = 0; i < state.bookmarks.length; ++i) {
          if (state.bookmarks[i]._id == action.bookmark._id) {
            return state;
          }
        }
        let newBookMarks = state.bookmarks.concat(action.bookmark);
        return {...state, bookmarks: newBookMarks, amount: newBookMarks.length};
      }
      case BOOKMARK_REMOVE:
      {
        for (let i = 0; i < state.bookmarks.length; ++i) {
          if (state.bookmarks[i]._id == action._id) {
            let newBookMarks = Object.assign(state.bookmarks);
            newBookMarks.splice(i, 1);
            return {...state, bookmarks: newBookMarks, amount: newBookMarks.length};
          }
        }
        return state;
      }
      case BOOKMARK_REMOVE_ALL:
          return bookmarksInitialState;
      default:
        return state;
    }
}