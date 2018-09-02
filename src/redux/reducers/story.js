import {
    FETCH_SKILLS_INITIATE,
    FETCH_SKILLS_COMPLETE,
} from '~/src/redux/actions/actionTypes';

const skillsInitialState = {
    data: [],
    isFetchingSkills: false
}

export function skills (state = skillsInitialState, action) {
    switch(action.type) {
        case FETCH_SKILLS_INITIATE: return {...state, isFetchingSkills: true};
        case FETCH_SKILLS_COMPLETE: return {...state, data: action.data, isFetchingSkills: false};
        default: return state;
    }
}