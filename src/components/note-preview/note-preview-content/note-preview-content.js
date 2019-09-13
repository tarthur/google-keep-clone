import React, {Component} from 'react'
import style from './note-preview-content.module.scss'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';

import {updateNote} from '../../../redux/notes-reducer'
import {connect} from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import className from 'classnames'



class NotePreviewContent extends Component {
  onClickMark = () => {
    alert(1)
  }

  render() {
    const NoteBottomPanelParams = [
      {
        panelName: 'color',
        getColor: this.props.getColor,
      },
      {
        panelName: 'addImg'
      },
      {
        panelName: 'more',
        moreItems: [
          {text: 'Удалить', onClick: this.props.onClickDeleteBtn},
          {text: 'Создать Копию', onClick: () => {}},
          {text: 'Добавить ярлык', onClick: () => {}}
        ]
      },
    ]

    return (
      <div className={style.notePreview}  
      style={{backgroundColor: this.props.bgColor}}>
        <div className={style.notePreviewWrap} >
          <div>
            <div className={style.mark} onClick={this.onClickMark}>
              <i class="fas fa-check-circle" />
            </div>
            {this.props.children}
          </div>
        </div>
        <div className={className(style.NoteBottomPanel, style[this.props.bottomPanelPosition])}>
          <NoteBottomPanel params={NoteBottomPanelParams} />
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