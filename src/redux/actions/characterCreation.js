import {
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX,
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX,
    SET_CHARACTER_CREATION_DATA,
    START_CHARACTER_CREATION,
    FINISH_CHARACTER_CREATION,
} from './actionTypes'

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