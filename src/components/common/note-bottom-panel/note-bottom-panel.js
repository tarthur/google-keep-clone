import React, {Component} from 'react'
import style from './note-bottom-panel.module.scss'
import ChooseСolor from '../choose-color/choose-color'
import ClickIcon from '../click-icon'
import ReactTooltip from 'react-tooltip'
import InputFile from '../input-file/input-file'
import FixMark from '../fix-mark/fix-mark'
import cn from 'classnames'


const NoteBottomPanel = props => {

  const showPanels = props.panels.map(item => {
    switch (item.name) {
      case 'color' :
        const {position, getColor, currentColor} = item;
        const props = {position, getColor, currentColor};

        return (
          <div className={style.icon} data-tip="Изменить цвет">
            <ChooseСolor {...props} />
          </div>
        )
      case 'delNote' :
        const {onClickDelNoteBtn} = item;

        return (
          <div className={style.icon}>
            <ClickIcon tooltipText="Удалить заметку" onClick={onClickDelNoteBtn}>
              <i class="far fa-trash-alt"></i>
            </ClickIcon>
          </div>
        )
      case 'createClone' :
        const {onClickCreateCloneBtn} = item;

        return (
          <div className={style.icon}>
            <ClickIcon tooltipText="Создать Копию" onClick={onClickCreateCloneBtn}>
              <i class="far fa-clone"></i>
            </ClickIcon>
          </div>
        )
      case 'addImg' :
        const {addImg} = item;

        return (
          <div className={style.icon} data-tip="Добавить картинку">
            <InputFile onChangeFile={addImg}>
              <i class="far fa-image" />
            </InputFile>
          </div>
        )
      case 'fixMark' :
        const {fixMark, onClickFixMark} = item;

        return (
          <div className={style.icon}>
            <FixMark check={fixMark} onClick={onClickFixMark} />
          </div>
        )
    }
  })

  const noteBottomClass = props.noteBottomClass ? props.noteBottomClass : ''

  return (
    <div className={cn(style.noteBottomPanel, noteBottomClass)} >
      {showPanels}
      <ReactTooltip place="bottom" type="dark" effect="solid"/>
    </div>
  )
}



export default NoteBottomPanel;