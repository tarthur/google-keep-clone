import React, {Component} from 'react'
import SimpleNotePreview from './simple-note-preview';
import NotePreviewContent from '../note-preview/note-preview-content/note-preview-content'
import ListNotePreview from './list-note-preview/list-note-preview'
import ImageNotePreview from './image-note-preview/image-note-preview'

import './note-preview.scss'


class NotesPreview extends Component {
  getColor = bgColor => this.props.updateNote(this.props.note.id, {bgColor})

  buildMain() {
    switch(this.props.note.type) {
      case 'note' :
        return <SimpleNotePreview note={this.props.note} updateNote={this.props.updateNote} />
      case 'list' :
        return <ListNotePreview note={this.props.note} updateNote={this.props.updateNote} />
      case 'img' :
        return <ImageNotePreview note={this.props.note} updateNote={this.props.updateNote} />
      default :
        return <div>no note</div>
    }
  }

  render() {
    return (
      <div className="note-preview">
        <NotePreviewContent getColor={this.getColor} onClickDeleteBtn={this.props.onClickDeleteBtn}>
          {this.buildMain()}
        </NotePreviewContent>
      </div>
    )
  }
}

export default NotesPreview;