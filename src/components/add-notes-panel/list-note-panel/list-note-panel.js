import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import style from './list-note-panel.module.scss'
import ListItems from '../../common/list/list-items/list-items'
import Form from '../../common/list/form/form'


import List from '../../common/list'


class ListNotePanel extends Component {
  state = {
    lists: [],
  }
  
  returningItems = lists => {
    this.setState(state => {
      
      this.props.getList({ lists });
      
      return { lists }
      
    });
  }

  render() {
    return (
      <div>
        <List returningItems={this.returningItems} />
      </div>
    )
  }
}





export default ListNotePanel;