import React, {Component} from 'react'
import NotePreview from '../note-preview'
import {connect} from 'react-redux';
import {delNote, updateNote} from '../../redux/notes-reducer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from './../spinner'
import './all-notes.scss'


const AllNotes = ({notes, deleteNote, updateNote}) => {
  let notesList;
  
  if (notes) {
    let [...sortNotes] = notes;
    
    sortNotes.sort((a, b) => {
      if (a.time > b.time) return -1;
      if (a.time == b.time) return 0;
      if (a.time < b.time) return 1;
    });

    notesList = sortNotes.map(note => {
      return <NotePreview key={note.id} 
                          note={note} 
                          onClickDeleteBtn={() => deleteNote(note.id)} 
                          updateNote={updateNote} />
    });
  }

  if (!notes) {
    return <Spinner />;
  }

  return (
    <div className="all-notes">
      <div className="all-notes__container container">
        <div className="all-notes__main">
          {notesList}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteNote: (id) => dispatch(delNote(id)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notes' }
  ])
)(AllNotes)