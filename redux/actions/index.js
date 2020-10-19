import * as types from "../types";

export const setTopTracks = (arr) => ({
    type: types.SET_TOPS_TRACKS,
    payload: arr
})

export const setFindedTracks = (arr) => ({
    type: types.SET_FINDED_TRACKS,
    payload: arr
})



