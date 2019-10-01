import React, {Component} from 'react'
import PanelTitle from '../../common/panel-title'
import NotePanel from '../../common/note-panel'
import {updateNote, addMarkNote, addItem, addImage, delNote, replaceImage, delImg} from '../../../redux/notes-reducer'
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import getImgSizes from '../../../utils/get-image-sizes'
import cn from 'classnames'
import ModalContainer from '../modal-container/modal-container'
import style from './simple-note-preview.module.scss'


class SimpleNotePreview extends Component {
  state = {
    note: {
      title: this.props.note.title || '',
      text: this.props.note.text || '',
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

  setData = (obj) => {   
    const isEmptyFields = (this.state.note.title === '') && (this.state.note.text === ''); 

    this.props.setData({
      ...obj,
      isEmptyFields
    })

    if (!isEmptyFields) {
      this.props.updateNote(this.props.note.id, {
        ...this.state.note,
        time: +(new Date()),
      });
    }
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

const mapStateToProps = (state) => {
  return {
    notes: state.firestore.ordered.notes,
    markNotes: state.notesReducer.markNotes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delImg: (note) => dispatch(delImg(note)),
    addImage: (image, id) => dispatch(addImage(image, id)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
    addMarkNote: note => dispatch(addMarkNote(note)),
    addNote: (item) => dispatch(addItem(item)),
    deleteNote: (note, notes) => dispatch(delNote(note, notes)),
    // replaceImage: (note, imgWidth, imgHeight, image) => dispatch(replaceImage(note, imgWidth, imgHeight, image)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(SimpleNotePreview)