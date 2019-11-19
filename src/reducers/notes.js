import * as types from '../constants/notes';


let initialState = {
  markNotes: []
};

const notes = (state = initialState, action) => {
  switch(action.type) {
    case types.CLEAR_MARKNOTES_REQUEST: {
      return { markNotes: [] }
    }
    case types.ADD_MARK_NOTE: {
      return { ...state, markNotes: action.payload };
    }
    default:
        return state;
  }
}


export default notes;
