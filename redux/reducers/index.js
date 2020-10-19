import { combineReducers } from "redux";
import * as types from "../types";


const topTracks = (state = [], action) => {
  switch (action.type) {
    case types.SET_TOPS_TRACKS:
      return action.payload;

    default:
      return state;
  }
};
const findedTracks = (state = [], action) => {
  switch (action.type) {
    case types.SET_FINDED_TRACKS:
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  topTracks,
  findedTracks,  
});
