import React, {Component} from 'react'
import style from './note-preview.module.scss'
import Modal from 'react-modal';
import NoteBottomPanel from './../note-bottom-panel';
import ListNotePreview from './list-note-preview';
import SimpleNotePreview from './simple-note-preview';
import ImgNotePreview from './img-note-preview';


class NotesPreview extends Component {

  buildMain = () => {
    switch(this.props.note.type) {
      case 'note' : 
        return (
          <SimpleNotePreview note={this.props.note} onClickDeleteBtn={this.props.onClickDeleteBtn} />
        )
      case 'list' : 
        return (
          <ListNotePreview note={this.props.note} updateNote={this.props.updateNote} onClickDeleteBtn={this.props.onClickDeleteBtn} />
        )
      case 'img' :
        return (
          <ImgNotePreview note={this.props.note} onClickDeleteBtn={this.props.onClickDeleteBtn} />
        )
      default :
        return <div>no note</div>
    }
  }

  render() {
    return (
      <div className={style.notePreviewBox}>
        {this.buildMain()}
      </div>
    )
  }
}


export default NotesPreview;