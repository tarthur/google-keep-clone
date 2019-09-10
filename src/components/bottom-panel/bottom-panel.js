import React, {Component} from 'react'
import style from './bottom-panel.module.scss'
import ChooseСolor from '../common/choose-color/choose-color'
import MoreButton from '../common/more-button/more-button'

const BottomPanel = ({getColor, getPanel}) => {
  // const getPanel = panel => {
  //   alert(panel)
  // }
  return (
    <div className={style.noteBottomPanel}>
      <ChooseСolor getColor={getColor} />
      <div><i class="far fa-image"></i></div>
      <MoreButton getPanel={getPanel} 
                  toggle={<i class="fas fa-ellipsis-v"></i>}
                  items={[
                    {text: 'list', onClick: () => getPanel('list')},
                    {text: 'imgggggggggggggggg', onClick: () => getPanel('img')},
                  ]} />
    </div>
  )
}



export default BottomPanel;