import React, {Component} from 'react'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';
import PanelTitle from '../../common/panel-title/panel-title'
import FixMark from '../../common/fix-mark/fix-mark'
import style from './note-panel-view.module.scss'


class NotePanelView extends Component {
  state = {
    title: '',
    time: +(new Date()),
  }

  // getColor = bgColor => {
  //   this.setState({bgColor})
  // }
  
  onClickFixMark = () => {
    alert('onClickFixMark')
  }

  onClickAddBtn = () => {
    this.props.onClick(this.state)
  }

  getTitle = title => {
    this.setState({
      title
    })
  }

  render() {
    const NoteBottomPanelParams = [
      {
        panelName: 'color',
        getColor: this.props.getColor,
      },
      {
        panelName: 'more',
        moreItems: [
          {text: 'Создать Копию', onClick: () => {}},
          {text: 'Добавить ярлык', onClick: () => {}}
        ]
      }
    ]
    
    return (
      <>
        <PanelTitle getTitle={this.getTitle} />
        <FixMark onClick={this.onClickFixMark} />

        {this.props.children}

        <div className={style.bottomPanel}>
          <NoteBottomPanel params={NoteBottomPanelParams} />

          <div class="btn btn_gray" role="button" onClick={this.onClickAddBtn}>Добавить</div>
        </div>
      </>
    )
  }
}

export default NotePanelView;