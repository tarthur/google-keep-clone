import React, {Component} from 'react'
import style from './note-preview-content.module.scss'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';

import {updateNote} from '../../../redux/notes-reducer'
import {connect} from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import ModalBox from './../../modal-box'



class NotePreviewContent extends Component {
  onClickMark = () => {
    alert(1)
  }

  render() {
    console.log(this.props)

    return (
      <div className={style.notePreview} 
      style={{backgroundColor: this.props.bgColor}}
      >
        <div className={style.notePreviewWrap} >
        <div>
          <div className={style.mark} onClick={this.onClickMark}></div>
          {this.props.children}
        </div>
      </div>
      <div className={style.NoteBottomPanel}>
        <NoteBottomPanel onClickDeleteBtn={this.props.onClickDeleteBtn}
                        getColor={this.props.getColor} />
      </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    notes: state.firestore.ordered.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(NotePreviewContent)