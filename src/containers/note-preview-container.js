import React from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateNote, addMarkNote, addNote, 
         addImage, deleteNote, replaceImage, 
         delImg, addStartImage } from '../actions/notes';
import { notes } from '../selectors';
import NotesPreviewContainer from '../components/note-preview/note-preview-container';

const mapStateToProps = (state) => {
  return {
    notes: notes(state),
  }
}

const mapDispatchToProps = {
  delImg, addImage, updateNote,
  addMarkNote, addNote, deleteNote,
  replaceImage, addStartImage
} 

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(NotesPreviewContainer)
