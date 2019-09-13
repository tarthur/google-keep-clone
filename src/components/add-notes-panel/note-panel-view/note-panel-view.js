import React, {Component} from 'react'
import BottomPanel from '../../bottom-panel';
import PanelTitle from '../../common/panel-title/panel-title'
import FixMark from '../../common/fix-mark/fix-mark'
import style from './note-panel-view.module.scss'


class NotePanelView extends Component {
  state = {
    title: '',
    bgColor: '',
    time: +(new Date()),
  }

  getColor = bgColor => {
    this.setState({bgColor})
  }
  
  onClickFixMark = () => {
    alert('onClickFixMark')
  }

  onClickAddBtn = () => {
    this.props.onClick(this.state)
  }

  render() {
    
    return (
      <div>
        <PanelTitle />
        <FixMark onClick={this.onClickFixMark} />

        {this.props.children}

        <div className={style.bottomPanel}>
          <BottomPanel getColor={this.getColor} getPanel={this.props.getPanel} />
          <div class="btn btn_gray" role="button" onClick={this.onClickAddBtn}>Добавить</div>
        </div>
      </div>
    )
  }
}

export default NotePanelView;