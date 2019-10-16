import React from 'react'
import style from './note-preview.module.scss'
import NoteBottomPanel from '../common/note-bottom-panel/note-bottom-panel';
import SimpleNotePreview from './simple-note-preview';
import ListNotePreview from './list-note-preview/list-note-preview'
import FixMark from '../common/fix-mark/fix-mark'
import ImgHeightLoader from '../common/img-height-loader/img-height-loader'
import cn from 'classnames'
import ClickIcon from '../common/click-icon';


const NotesPreview = ({note, notes, modal, setData, updateNote, 
                      onClickMark, onClickFixMark, onLoad, mark, modalIsOpen, 
                      currentColor, loader, getColor, addImage, cloneNote, delNote}) => {

  const buildMain = () => {
    const noteProps = {note, modal, modalIsOpen, setData, updateNote}

    switch(note.type) {
      case 'note' :
        return <SimpleNotePreview {...noteProps} />
      case 'list' :
        return <ListNotePreview {...noteProps} />
      default :
        return <div>no note</div>
    }
  }

  let bottomPanelPosition = 'relative';
  let paddingTop = null;

  const panels = [
    {
      name: 'color',
      currentColor,
      getColor: bgColor => getColor(bgColor),
    }, {
      name: 'addImg',
      addImg: (input) => addImage(input),
    }, {
      name: 'delNote',
      onClickDelNoteBtn: () => delNote(note, notes),
    }, {
      name: 'createClone',
      onClickCreateCloneBtn: () => cloneNote(),
    }
  ]

  if (note.imgHeight) {
    bottomPanelPosition = 'absolute';
  } else {
    paddingTop = style.paddingTop
  }

  if (note.text || note.title || note.lists) {
    bottomPanelPosition = 'relative';
    paddingTop = style.paddingTop
  } else {
    bottomPanelPosition = 'absolute';
  }

  if ((note.imgHeight) && (note.text || note.title || note.lists)) {
    paddingTop = style.paddingTop
  }
  
  return (
    <div className={cn(style.notePreview, (mark && style.activeNote), (modalIsOpen && style.openModal), (loader && style.loader))}  
          style={{backgroundColor: note.bgColor}}
          onClick={() => modal(true)}>
      <div className={style.notePreviewWrap} >
        <ImgHeightLoader note={note} onLoad={onLoad} />
        {/* <div className={style.selectedMark} >
          <ClickIcon tooltip={false} onClick={onClickMark}>
            <i className="fas fa-check-circle" />
          </ClickIcon>
        </div> */}
        <div className={style.fixMark}>
          <FixMark check={note.fixMark} onClick={onClickFixMark} />
        </div>
        <div className={cn(style.main, paddingTop)}>
          {buildMain()}
        </div>
      </div>
      <div className={cn(style.NoteBottomPanel, style[bottomPanelPosition])}>
        <NoteBottomPanel panels={panels} />
      </div>
    </div>
  )
}

export default NotesPreview