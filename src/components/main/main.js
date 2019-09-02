import React, {Component} from 'react'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'


const Main = () => {
  return (
    <div>
      <AddNotesPanel />
      <AllNotes />
    </div>
  )
}

export default Main