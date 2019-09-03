import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import style from './list-note-panel.module.scss'
import ListItems from './list-items/list-items'
import Form from './form/form'





class ListNotePanel extends Component {
  itemId = 1;

  state = {
    lists: [],
    type: 'list'
  }

  createTodoItem = (value = "") => {
    return {
      id: this.itemId++, 
      value: value, 
      checkbox: false,
    }
  }

  onClickAddBtn = () => {
    this.props.onClick(this.state)
  }

  addTodoItem = (value) => {
    this.setState((state) => {
      return { lists: [
        ...state.lists,
        this.createTodoItem(value)
      ] }
    })
  }
  
  onChangeTextField = (inputId, value) => {
    this.setState((state) => {
      const [...lists] = state.lists;
      const idx = lists.findIndex((item) => item.id === inputId);
      
      return {
        lists: [
          ...lists.slice(0, idx),
          {
            ...lists[idx],
            value
          },
          ...lists.slice(idx + 1)
        ]
      };
    });
  }
  
  render() {
    const {value, onChange} = this.props;

    return (
      <div>
        <div>Заголовок222</div>
        <ListItems items={this.state.lists}
                   onChangeTextField={this.onChangeTextField}
                  //  onDeleteTodoListItem={ (inputId) => {onDeleteTodoListItem(inputId)} }
                  //  onClickCompletedCheckbox={ (inputId, inputValue) => {onClickCompletedCheckbox(inputId, inputValue)} } 
                   /> 
  
        <Form onChangeForm={this.addTodoItem} />
        <button onClick={this.onClickAddBtn}>Добавить</button>
        {/* <BottomPanel /> */}
      </div>
    )
  }
}





export default ListNotePanel;