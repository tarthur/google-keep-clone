import React, {Component} from 'react'
import style from './note-bottom-panel.module.scss'
import ChooseСolor from '../choose-color/choose-color'
import MoreButton from '../more-button/more-button'
// import className from 'classnames'
import ReactTooltip from 'react-tooltip'
import InputFile from '../input-file/input-file'
import FixMark from '../fix-mark/fix-mark'


const NoteBottomPanel = ({params}) => {
  const showPanels = params.map(item => {
    switch (item.panelName) {
      case 'color' :
        const {getColor} = item;

        return (
          <div className={style.icon} data-tip="Изменить цвет">
            <ChooseСolor getColor={getColor} />
          </div>
        )
      case 'more' :
        const {moreItems} = item;

        return (
          <div className={style.icon} data-tip="Еще">
            <MoreButton toggle={<i class="fas fa-ellipsis-v"></i>}
                        items={moreItems} />
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

  return (
    <div className={style.noteBottomPanel}>
      {showPanels}
      <ReactTooltip place="bottom" type="dark" effect="solid"/>
    </div>
  )
}



export default NoteBottomPanel;