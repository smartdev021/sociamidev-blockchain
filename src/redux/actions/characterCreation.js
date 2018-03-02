import {
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_INDEX,
    SET_CHARACTER_CREATION_SELECTED_CHARACTER_TRAITS_INDEX
} from './actionTypes'

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