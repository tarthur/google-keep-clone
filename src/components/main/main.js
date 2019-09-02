import React, {Component} from 'react'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'


class Main extends Component {
  state = {
    notes: []
  }

  onClickAddBtn = (obj) => {
    this.setState({
      notes: [
        ...this.state.notes,
        obj
      ]
    })
  }  

  render() {
    const {notes} = this.state;

    return (
      <div>
        <AddNotesPanel onClickAddBtn={this.onClickAddBtn} />
        <AllNotes notes={notes} />
      </div>
    )
  }
}

export default Main