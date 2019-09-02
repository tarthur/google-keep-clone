import React from 'react'
import NotePreview from '../note-preview'

const AllNotes = props => {
  const notes = props.notes.map(note => {
    return <NotePreview note={note} />
  })

  return <div>{notes}</div>
}

export default AllNotes