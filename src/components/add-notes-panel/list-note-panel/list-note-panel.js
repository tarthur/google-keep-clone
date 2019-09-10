import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import style from './list-note-panel.module.scss'
import ListItems from './list-items/list-items'
import Form from './form/form'


import List from '../../common/list/list'




class ListNotePanel extends Component {
  state = {
    lists: [],
    type: 'list'
  }

  onClickAddBtn = () => {
    this.props.onClick(this.state)
  }
  
  returningItems = lists => {
    this.setState({lists})
  }

  render() {
    const {value, onChange} = this.props;

    return (
      <div>
        <div>Заголовок222</div>
        <List returningItems={this.returningItems} />
        <button onClick={this.onClickAddBtn}>Добавить</button>
        {/* <BottomPanel /> */}
      </div>
    )
  }
}





export default ListNotePanel;