import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
// import style from './list-items.module.scss'

import TodoListItem from './../todo-list-item/todo-list-item'


const ListItems = props => {
  // const { items, 
  //   onDeleteTodoListItem, onClickCompletedCheckbox, onChangeTextField 
  // } = props;
  const { items,  onChangeTextField } = props;

  const todoListItems = () => {
    return items.map((item, index, array) => {
      const focus = (index === (array.length - 1)) ? true : false;
      
      return <TodoListItem  id={item.id} 
                            value={item.value} 
                            checkbox={item.checkbox}
                            // onDeleteTodoListItem={ () => { onDeleteTodoListItem(item.id) } }
                            // onClickCompletedCheckbox={ () => onClickCompletedCheckbox(item.id) }
                            onChangeTextField={ (value) => onChangeTextField(item.id, value)  }
                            focus={focus} 
                            />
    });
  }

  return <ul> { todoListItems() } </ul>
}

export default ListItems;