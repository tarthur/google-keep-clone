import React, {Component} from 'react'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'


class Main extends Component {
  addSimpleNote = () => {
    alert('addSimpleNote')
  }

  addListNote = () => {
    alert('addListNote')
  }

  addImgNote = () => {
    alert('addImgNote')
  }

  render() {
    return (
      <div>
        <AddNotesPanel addSimpleNote={this.addSimpleNote}
                       addListNote={this.addListNote}
                       addImgNote={this.addImgNote} />
        <AllNotes notes="notes" />
      </div>
    )
  }
}

export default Main