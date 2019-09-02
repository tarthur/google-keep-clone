import React from 'react'
import NotePreview from '../note-preview'

const AllNotes = props => {
  const notes = props.notes.map(note => {
    return <NotePreview key={note.id} note={note} onClickDeleteBtn={() => props.onClickDeleteBtn(note.id)} />
  })

  return <div>{notes}</div>
}

export default AllNotes