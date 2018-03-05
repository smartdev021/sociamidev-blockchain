import {
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX,
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX,
    SET_CHARACTER_CREATION_DATA,
    START_CHARACTER_CREATION,
    FINISH_CHARACTER_CREATION,

    FETCH_LIST_CHARACTER_CLASSES_INITIATE,
    FETCH_LIST_CHARACTER_CLASSES_COMPLETE,
} from './actionTypes'

import Axios from 'axios'

import ConfigMain from '~/configs/main'

export function setCharacterCreationData(data) {
    return {
        type: SET_CHARACTER_CREATION_DATA,
        data: data,
    }
}

export function startCharacterCreation() {
    return {
        type: START_CHARACTER_CREATION,
    }
}

export function finishCharacterCreation() {
    return {
        type: FINISH_CHARACTER_CREATION,
    }
}

export function setSelectedCharacterIndex(index) {
    return {
        type: SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX,
        index: index
    }
}

export function setSelectedCharacterTraitsIndex(index) {
    return {
        type: SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX,
        index: index
    }
}

export function fetchListCharacterClassesInitiate() {
    return {
        type: FETCH_LIST_CHARACTER_CLASSES_INITIATE,
    }
}

export function fetchListCharacterClassesComplete(data) {
    return {
        type: FETCH_LIST_CHARACTER_CLASSES_COMPLETE,
        data: data,
    }
}

export function fetchListCharacterClasses() {
    return function (dispatch) {
      dispatch(fetchListCharacterClassesInitiate());
      
      const url = `${ConfigMain.getBackendURL()}/characterClassesGet`;
        return (
        Axios.get(url)
        .then(function(response) {
            dispatch(fetchListCharacterClassesComplete(response.data));
        })
        .catch(function(error) {
            dispatch(fetchListCharacterClassesComplete([]));
        }));
    }
}