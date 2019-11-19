import {createSelector} from "reselect";


const notesSelector = (state) => {
  return state.firestore.ordered.notes;
}

const markNotesSelector = (state) => {
  return state.notes.markNotes;
}

export const notes = createSelector(notesSelector, (notes) => {
  return notes;
})

export const markNotes = createSelector(markNotesSelector, (notes) => {
  return notes;
})


