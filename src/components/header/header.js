import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addMarkNote, delNote, deleteAllNote, updateNote} from '../../redux/notes-reducer'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Logo from '../common/logo'
import style from './header.module.scss'
import NoteBottomPanel from '../common/note-bottom-panel/note-bottom-panel';



class Header extends Component {
  onClickDeleteBtn = () => {
    this.props.deleteAllNote(this.props.markNotes)
  }
  
  render() {
    const {markNotes} = this.props;

    const fixMarkValue = markNotes.find(item => item.fixMark) ? true : false

    const onClickFixMark = () => {
      markNotes.forEach(el => {
        this.props.updateNote(el.id, {fixMark: !fixMarkValue})
      })
    }
    


    const NoteBottomPanelParams = [
      {
        panelName: 'fixMark',
        fixMark: fixMarkValue,
        onClickFixMark,
      },
      {
        panelName: 'color',
        getColor: this.props.getColor,
      },
      {
        panelName: 'more',
        moreItems: [
          {text: 'Удалить', onClick: this.onClickDeleteBtn},
          {text: 'Создать Копию', onClick: () => {}},
          {text: 'Добавить ярлык', onClick: () => {}}
        ]
      },
    ]
    
    return (
      <div className={style.header}>
        {(markNotes.length > 0) && (
          <div className={style.headerNotice}>
            <div className="container">
              <div className={style.headerNoticeMain}>
                <div>Close</div>
                <div className={style.noticeTitle}>Выбрана {markNotes.length} заметка</div>
                <NoteBottomPanel params={NoteBottomPanelParams} />
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className={style.main}>
            <Logo />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    markNotes: state.notesReducer.markNotes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMarkNote: id => dispatch(addMarkNote(id)),
    deleteNote: (note) => dispatch(delNote(note)),
    deleteAllNote: (notes) => dispatch(deleteAllNote(notes)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notes' }
  ])
)(Header)

