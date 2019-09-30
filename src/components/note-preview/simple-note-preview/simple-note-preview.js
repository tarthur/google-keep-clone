import React, {Component} from 'react'
import PanelTitle from '../../common/panel-title/panel-title'
import NotePanel from '../../common/note-panel/note-panel'
import cn from 'classnames'
import ModalContainer from '../modal-container/modal-container'
import style from './simple-note-preview.module.scss'


class SimpleNotePreview extends Component {
  state = {
    note: {
      title: this.props.note.title,
      text: this.props.note.text,
    }
  }
  
  onChangeText = text => {
    this.setState(state => {
      const note = {
        ...state.note,
        text: text
      }

      return { note }
    })
  }

  onChangeTitle = title => {
    this.setState(state => {
      const note = {
        ...state.note,
        title: title
      }

      return { note }
    })
  }

  setData = () => {
    this.props.updateNote(this.props.note.id, {
      ...this.state.note,
      time: +(new Date()),
    });
  }

  render() {
    const previewContent = (
      <div className={style.note}>
        <div className={style.main}>
          {this.props.note.title && (
            <div className={style.title}>{this.props.note.title}</div>
          )}
          {this.props.note.text && (
            <div className={style.text}>{this.props.note.text}</div>
          )}
        </div>
      </div>
    )
    
    return (
      <ModalContainer note={this.props.note} 
                      previewContent={previewContent} 
                      modalIsOpen={this.props.modalIsOpen} 
                      modal={this.props.modal} 
                      setData={this.setData}>

        <PanelTitle value={this.props.note.title} getTitle={this.onChangeTitle} textareaClass={style.modalTitle} />
        <NotePanel value={this.props.note.text} placeholder="Текст заметки" getText={this.onChangeText} />
        
      </ModalContainer>
    )
  }
}

export default SimpleNotePreview