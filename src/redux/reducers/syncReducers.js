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

  BOOKMARKS_SET,

  ROADMAP_ADD,
  ROADMAP_REMOVE,
  ROADMAP_REMOVE_ALL,
  
  ROADMAPS_SET,

  SIGNUP_FORM_OPEN,
  SIGNUP_FORM_CLOSE,

  SEARCH_QUERY_SET,

  SET_USER_AUTHORIZED,
} from '../actions/actionTypes';

export function isSignUpFormOpen(state = false, action) {
  switch (action.type) {
      case SIGNUP_FORM_OPEN:
        return (!state) ? true : state;
      case SIGNUP_FORM_CLOSE:
        return (state) ? false : state;
      default:
        return state;
    }
}

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
          if (state.bookmarks[i]._id == action.bookmark._id && state.bookmarks[i]._type == action.bookmark._type) {
            return state;
          }
        }
        let newBookMarks = state.bookmarks.concat({_id: action.bookmark._id, _type: action.bookmark._type});
        return {...state, bookmarks: newBookMarks, amount: newBookMarks.length};
      }
      case BOOKMARKS_SET:
      {
        let newBookmarks = action.bookmarks.map(function(bookmark){
          return ({_id: bookmark._id, _type: bookmark._type});
        });

        return {...state, bookmarks: newBookmarks, amount: newBookmarks.length};
      }
      case BOOKMARK_REMOVE:
      {
        for (let i = 0; i < state.bookmarks.length; ++i) {
          if (state.bookmarks[i]._id == action.bookmark._id && state.bookmarks[i]._type == action.bookmark._type) {
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

const userRoadmapsInitialState = {roadmaps: [], amount: 0};

export function userRoadmaps(state = userRoadmapsInitialState, action) {
  switch (action.type) {
      case ROADMAP_ADD:
      {
        if (state.roadmaps.indexOf(action.roadmapId) != -1) {
          return state;
        }

        let newRoadmaps = state.roadmaps.concat(action.roadmapId);
        return {...state, roadmaps: newRoadmaps, amount: newRoadmaps.length};
      }
      case ROADMAPS_SET:
      {
        return {...state, roadmaps: action.roadmapIds, amount: action.roadmapIds.length};
      }
      case ROADMAP_REMOVE:
      {
        let foundRoadmapIndex = state.roadmaps.indexOf(action.roadmapId);

        if (foundRoadmapIndex != -1) {
          let newRoadmapIds = Object.assign(state.roadmaps);
          newRoadmapIds.splice(foundRoadmapIndex, 1);

          return {...state, roadmaps: newRoadmapIds, amount: newRoadmapIds.length};
        }

        return state;
      }
      case ROADMAP_REMOVE_ALL:
          return userRoadmapsInitialState;
      default:
        return state;
    }
}

export function searchQuery(state = "", action) {
  switch (action.type) {
      case SEARCH_QUERY_SET:
        return action.query;
      default:
        return state;
    }
}

export function isAuthorized(state = false, action) {
  switch (action.type) {
    case SET_USER_AUTHORIZED:
        return action.authorized;
    default:
        return state;
  }
}