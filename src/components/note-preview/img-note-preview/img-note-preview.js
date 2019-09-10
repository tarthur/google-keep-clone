import React, {Component} from 'react'
import style from './img-note-preview.module.scss'
import Modal from 'react-modal';
import NoteBottomPanel from './../../note-bottom-panel';

import {updateNote} from '../../../redux/notes-reducer'
import {connect} from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'




const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ImgNotePreview extends Component {
  
  state = {
    modalIsOpen: false,
    text: this.props.note.addInputText
  }

  onChange = e => {
    this.setState({
      text: e.target.value
    })
  }
  
  closeModal = () => {
    this.props.updateNote(this.props.note.id, {
      ...this.props.note,
      addInputText: this.state.text
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
  
  render() {
    console.log('==========>>>>>>>>>>>>')

    return (
      <div className={style.notePreview} style={{backgroundColor: this.state.bgColor}}>
        <div>
        <div className={style.mark}></div>
          {/*  onClick={onClickMark} */}
          <strong>img img</strong>
          <div onClick={this.openModal}>
            {this.props.note.addInputText}
          </div>
          <div className={style.NoteBottomPanel}>
            <NoteBottomPanel onClickDeleteBtn={this.props.onClickDeleteBtn}
                            getColor={this.getColor} />
                            
          </div>
        </div>


        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        
        <input value={this.state.text} onChange={this.onChange} />
        
        <button onClick={this.closeModal}>close</button>
        </Modal>
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
)(ImgNotePreview)