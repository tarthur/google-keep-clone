import React from 'react';
import cn from 'classnames';
import NoteBottomPanel from '../common/note-bottom-panel';
import style from './header-marks.module.scss';

const HeaderMarks = ({ markNotes, clearMarkNotes, addNote, updateNote, deleteAllNote }) => {
  
  const fixMarkValue = markNotes.find(item => item.fixMark) ? true : false

  const changeColor = bgColor => {
    markNotes.forEach(el => {
      updateNote(el.id, {bgColor})
    })
    // this.getForAllNotes((this.props.updateNote )
  }

  const cloneNote = () => {
    this.props.markNotes.forEach(el => {
      let {...note} = el;
      delete note.id

      addNote(note)
    })
  }

  const onClickFixMark = () => {
    markNotes.forEach(el => {
      updateNote(el.id, {fixMark: !fixMarkValue})
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
      getColor: changeColor,
    }, {
      name: 'delNote',
      onClickDelNoteBtn: () => deleteAllNote(markNotes),
    }, {
      name: 'createClone',
      onClickCreateCloneBtn: () => cloneNote(),
    }
  ]

  return (
    <div className={style.headerNotice}>
      <div className={cn('container', style.noticeContainer)}>
        <div className={style.headerNoticeMain}>
          <div onClick={clearMarkNotes}>
            <i className="fas fa-times"></i>
          </div>
          <div className={style.noticeTitle}>Выбрана {markNotes.length} заметка</div>
          <NoteBottomPanel panels={panels} />
        </div>
      </div>
    </div>
  )
}

export default HeaderMarks
