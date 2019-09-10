import React, {Component} from 'react'
import style from './simple-note-preview.module.scss'
import NoteBottomPanel from './../../note-bottom-panel';

import {updateNote} from '../../../redux/notes-reducer'
import {connect} from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import ModalBox from './../../modal-box'



class SimpleNotePreview extends Component {
  state = {
    modalIsOpen: false,
    text: this.props.note.addInputText,
    bgColor: this.props.note.bgColor,
    time: +(new Date()),
  }

  onChange = e => {
    this.setState({
      text: e.target.value,
      time: +(new Date())
    })
  }
  
  closeModal = () => {
    this.props.updateNote(this.props.note.id, {
      ...this.props.note,
      addInputText: this.state.text,
      time: this.state.time,
      bgColor: this.state.bgColor
    })

    return this.setState({
      modalIsOpen: false
    });
  }

  openModal = () => this.setState({
    modalIsOpen: true,
  });
  
  getColor = bgColor => {
    this.setState({
      bgColor
    })
    
    this.props.updateNote(this.props.note.id, {
      ...this.props.note,
      bgColor
    })
  }

  onClickMark = () => {
    alert(1)
  }

  render() {
    const date = new Date(this.props.note.time);
    const modalContent = (
      <div>
        <div>
          <div><input value={this.state.text} onChange={this.onChange} /></div>
          <br />
          <div>update data: {`${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`}</div>
        </div>
        <button onClick={this.closeModal}>close</button>
      </div>
    )

    return (
      <div className={style.notePreview} style={{backgroundColor: this.state.bgColor}}>
        <div>
          <div className={style.mark} onClick={this.onClickMark}></div>
          <div onClick={this.openModal}>
            {this.props.note.addInputText}
          </div>
          <div className={style.NoteBottomPanel}>
            <NoteBottomPanel onClickDeleteBtn={this.props.onClickDeleteBtn}
                            getColor={this.getColor} />
          </div>
        </div>

        <ModalBox isOpen={this.state.modalIsOpen} >
          {modalContent}
        </ModalBox>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // delNote: () => alert(111),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'items' },
    { collection: 'notes' }
  ])
)(SimpleNotePreview)