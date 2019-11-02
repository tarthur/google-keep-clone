import {createSelector} from "reselect";


const notesSelector = (state) => {
  return state.firestore.ordered.notes;
}

export const notes = createSelector(notesSelector, (notes) => {
  return notes;
})