import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import './note-panel-view.scss'
import BottomPanel from '../../bottom-panel';
import PanelTitle from '../../common/panel-title/panel-title'
import FixMark from '../../common/fix-mark/fix-mark'

class NotePanelView extends Component {
  state = {
    title: '',
    bgColor: '',
    time: +(new Date()),
  }

  getColor = bgColor => {
    this.setState({bgColor})
  }

  onClick = () => {
    // this.props.onClick(this.state);
  }

  onClickFixMark = () => {
    alert('onClickFixMark')
  }

  onClickAddBtn = () => {
    this.props.onClick(this.state)
  }

  render() {
    return (
      <div className="notes-panel__main">
        <PanelTitle />
        <FixMark onClick={this.onClickFixMark} />

        {this.props.children}

        <div className="note-panel__bottom-panel">
          <BottomPanel getColor={this.getColor} getPanel={this.props.getPanel} />
          <div class="btn btn_gray" role="button" onClick={this.onClickAddBtn}>Добавить</div>
        </div>
      </div>
    )
  }
}

export default NotePanelView;