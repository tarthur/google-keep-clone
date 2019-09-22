import React, {Component} from 'react'
import style from './default-panel.module.scss'
import className from 'classnames'
import InputFile from '../../common/input-file/input-file'


const DefaultPanel = props => {
  const { setPanelView } = props;

  const setPanel = () => {
  }
  
  const onChangeFile = (input) => {
    console.log('onChangeFileonChangeFileonChangeFileonChangeFileonChangeFileonChangeFileonChangeFileonChangeFile')
    console.log(input)
    console.log(input.files[0])
    console.log('>>><<<')

    setPanelView('img', input)
    // setPanelView('img', image, input)
  }

  return (
    <React.Fragment>
      <div className={style.textarea} onClick={() => setPanelView('note')} >
        Заметка…
      </div>
      <div className={className(style.icon, style.listIcon)} onClick={() => setPanelView('list')} >
        <i class="far fa-check-square"></i>
      </div>
      <div className={className(style.icon, style.imgIcon)}>
        <InputFile onChangeFile={onChangeFile}>
          <i class="far fa-image" />
        </InputFile>
      </div>
    </React.Fragment>
  )
}

export default DefaultPanel;