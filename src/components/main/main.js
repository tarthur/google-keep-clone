import React, {Component} from 'react'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'


class Main extends Component {
  noteId = 1;

  state = {
    notes: []
  }

  onClickAddBtn = (obj) => {
    this.setState({
      notes: [
        ...this.state.notes,
        {...obj, id: this.noteId++}
      ]
    })
  }  

  onClickDeleteBtn = id => {
    const targetNote = this.state.notes.findIndex(note => note.id === id)
    
    const [...notes] = this.state.notes;
    const idx = notes.findIndex((item) => item.id === id);
    const oldItem = notes[idx];

    this.setState({
      notes: [
        ...notes.slice(0, idx),
        ...notes.slice(idx + 1)
      ]
    })
    
  }

  render() {
    const {notes} = this.state;

    return (
      <div>
        <AddNotesPanel onClickAddBtn={this.onClickAddBtn} />
        <AllNotes notes={notes} onClickDeleteBtn={this.onClickDeleteBtn} />
      </div>
    )
  }
}

export default Main