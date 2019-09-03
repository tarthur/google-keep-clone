import React, {Component} from 'react'
import NotePreview from '../note-preview'
import {connect} from 'react-redux';
import {delNote, updateNote} from '../../redux/notes-reducer'

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import Spinner from './../spinner'

import style from './all-notes.module.scss'



const AllNotes = ({notes, delNote, updateNote}) => {
  let notesList;
  
  if (notes) {
    notesList = notes.map(note => {
      return <NotePreview key={note.id} 
                          note={note} 
                          onClickDeleteBtn={() => delNote(note.id)} 
                          updateNote={(value) => updateNote(note.id, value)} />
    });
  
  }

  if (!notes) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className={style.main}>
        {notesList}
      </div>
    </div>
  )
}


// let mapStateToProps = (state) => {
//   return {
//     notes: state.notesReducer.notes,
//   }
// }

// let mapDispatchToProps = (dispatch) => {
//   return {
//     delNote: (id) => dispatch(delNote(id)),
//     updateNote: (id, value) => dispatch(updateNote(id, value)),
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(AllNotes)


const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // delNote: () => alert(111),
    delNote: (id) => dispatch(delNote(id)),
    updateNote: (id, value) => dispatch(updateNote(id, value)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'items' },
    { collection: 'notes' }
  ])
)(AllNotes)
