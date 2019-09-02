import React, {Component} from 'react'
import AddNotesPanel from '../add-notes-panel'
import AllNotes from '../all-notes'


class Main extends Component {
  state = {
    addPanel: true
  }

  addSimpleNote = () => {
    alert('addSimpleNote')
  }

  addListNote = () => {
    alert('addListNote')
  }

  addImgNote = () => {
    alert('addImgNote')
  }

  onClickAddPanel = () => {
    this.setState(state => { 
      const addPanel = !state.addPanel;

      return {addPanel} 
    })
  }

  onBlur = () => {
    this.setState(state => { 
      const addPanel = !state.addPanel;

      return {addPanel} 
    })
  }

  addPanel = () => {
    const {addPanel} = this.state;

    if (addPanel) {
      return (
        <AddNotesPanel onClick={this.onClickAddPanel}
                       addSimpleNote={this.addSimpleNote}
                       addListNote={this.addListNote}
                       addImgNote={this.addImgNote} />
      )
    } else {
      return (
        <div>
          <input type="text" onBlur={this.onBlur} />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.addPanel()}
        <AllNotes notes="notes" />
      </div>
    )
  }
}

export default Main