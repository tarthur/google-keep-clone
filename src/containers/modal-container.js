import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { markNotes, notes } from '../selectors';
import { updateNote, addMarkNote, addNote, 
         addImage, deleteNote, delImg } from '../actions/notes';
import ModalContainer from '../components/note-preview/modal-container';


const mapStateToProps = (state) => {
  return {
    notes: notes(state),
    markNotes: markNotes(state),
  }
}

const mapDispatchToProps = {
  addImage, updateNote, addMarkNote, 
  addNote, deleteNote, delImg, 
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(ModalContainer)
