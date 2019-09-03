import React, {Component} from 'react'
import style from './note-preview.module.scss'
import Modal from 'react-modal';
import NoteBottomPanel from './../note-bottom-panel';
import ListNotePreview from './list-note-preview';
import SimpleNotePreview from './simple-note-preview';


class NotesPreview extends Component {

  buildMain = () => {
    switch(this.props.note.type) {
      case 'note' : 
        return <SimpleNotePreview note={this.props.note} />
      case 'list' :
        return <ListNotePreview note={this.props.note} />
    }
  }

  render() {
    return this.buildMain()
  }
}


export default NotesPreview;