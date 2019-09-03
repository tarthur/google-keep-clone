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
          <div className={style.notePreview}>
            <SimpleNotePreview note={this.props.note} onClickDeleteBtn={this.props.onClickDeleteBtn} />
          </div>
        )
      case 'list' : 
        return (
          <div className={style.notePreview}>
            <ListNotePreview note={this.props.note} onClickDeleteBtn={this.props.onClickDeleteBtn} />
          </div>
        )
      case 'img' :
        return (
          <div className={style.notePreview}>
            <ImgNotePreview note={this.props.note} onClickDeleteBtn={this.props.onClickDeleteBtn} />
          </div>
        )
      default :
        return <div>no note</div>
    }
  }

  render() {
    return this.buildMain()
  }
}


export default NotesPreview;