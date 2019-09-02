import React, {Component} from 'react'
import NotePreview from '../note-preview'
import {connect} from 'react-redux';
import {delNote, updateNote} from '../../redux/notes-reducer'

const AllNotes = ({notes, delNote, updateNote}) => {
  const notesList = notes.map(note => {
    return <NotePreview key={note.id} 
                        note={note} 
                        onClickDeleteBtn={() => delNote(note.id)} 
                        updateNote={(value) => updateNote(note.id, value)} />
  });

  return <div>{notesList}</div>
}


let mapStateToProps = (state) => {
  return {
    notes: state.notesReducer.notes,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    delNote: (id) => dispatch(delNote(id)),
    updateNote: (id, value) => dispatch(updateNote(id, value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllNotes)