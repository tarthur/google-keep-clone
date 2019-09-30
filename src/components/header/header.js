import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addMarkNote, delNote, deleteAllNote, updateNote, clearMarkNotes, addItem} from '../../redux/notes-reducer'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Logo from '../common/logo'
import style from './header.module.scss'
import NoteBottomPanel from '../common/note-bottom-panel';
import cn from 'classnames'



class Header extends Component {

  yyyyyy = () => {
    this.props.removeAllMarkNote()
  }

  getForAllNotes = f => {
    // this.props.markNotes.forEach(el => {
    //   f()
    // })
  }

  changeColor = bgColor => {
    this.props.markNotes.forEach(el => {
      this.props.updateNote(el.id, {bgColor})
    })
    // this.getForAllNotes((this.props.updateNote )
    // 
  }

  cloneNote = () => {
    this.props.markNotes.forEach(el => {
      let {...note} = el;
      delete note.id

      this.props.addNote(note)
    })
  }
  
  render() {
    const {markNotes} = this.props;

    const fixMarkValue = markNotes.find(item => item.fixMark) ? true : false

    const onClickFixMark = () => {
      markNotes.forEach(el => {
        this.props.updateNote(el.id, {fixMark: !fixMarkValue})
      })
    }
    
    const panels = [
      {
        name: 'fixMark',
        fixMark: () => fixMarkValue,
        onClickFixMark: () => onClickFixMark(),
      }, {
        name: 'color',
        position: 'positionBottomLeft',
        getColor: this.changeColor,
      }, {
        name: 'delNote',
        onClickDelNoteBtn: () => this.props.deleteAllNote(this.props.markNotes),
      }, {
        name: 'createClone',
        onClickCreateCloneBtn: () => this.cloneNote(),
      }
    ]
    
    return (
      <div className={style.header}>
        {(markNotes.length > 0) && (
          <div className={style.headerNotice}>
            <div className={cn('container', style.noticeContainer)}>
              <div className={style.headerNoticeMain}>
                <div onClick={this.yyyyyy}>
                  <i class="fas fa-times"></i>
                </div>
                <div className={style.noticeTitle}>Выбрана {markNotes.length} заметка</div>
                <NoteBottomPanel panels={panels} />
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
    removeAllMarkNote: () => dispatch(clearMarkNotes()),
    deleteAllNote: (notes) => dispatch(deleteAllNote(notes)),
    updateNote: (id, obj) => dispatch(updateNote(id, obj)),
    addNote: (item) => dispatch(addItem(item)),
  }
}  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'notes' }
  ])
)(Header)

