import React, {Component} from 'react'
import './bottom-panel.scss'
import ChooseСolor from '../common/choose-color/choose-color'
import MoreButton from '../common/more-button/more-button'

const BottomPanel = ({getColor, getPanel}) => {
  // const getPanel = panel => {
  //   alert(panel)
  // }
  return (
    <div className="bottom-panel">
      <div className="bottom-panel__mark">
        <ChooseСolor getColor={getColor} />
      </div>
      <div className="bottom-panel__mark">
        <i class="far fa-image"></i>
      </div>
      <div className="bottom-panel__mark">
        <MoreButton getPanel={getPanel} 
                    toggle={<i class="fas fa-ellipsis-v"></i>}
                    items={[
                      {text: 'list', onClick: () => getPanel('list')},
                      {text: 'imgggggggggggggggg', onClick: () => getPanel('img')},
                    ]} />
      </div>
    </div>
  )
}



export default BottomPanel;