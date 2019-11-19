import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addMarkNote, deleteNote, deleteAllNote, 
         updateNote, clearMarkNotes, addNote } from '../actions/notes';
import { markNotes } from '../selectors';
import Header from '../components/header';


const mapStateToProps = (state) => {
  return {
    markNotes: markNotes(state),
  }
}

const mapDispatchToProps = {
  addMarkNote, deleteNote, clearMarkNotes, 
  deleteAllNote, updateNote, addNote,
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notes' }
  ])
)(Header)

