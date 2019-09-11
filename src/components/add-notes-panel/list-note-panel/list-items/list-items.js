import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import './list-items.scss'

import TodoListItem from './../todo-list-item/todo-list-item'


const ListItems = props => {
  // const { items, 
  //   onDeleteTodoListItem, onClickCompletedCheckbox, onChangeTextField 
  // } = props;
  const { items,  onChangeTextField, onClickCompletedCheckbox, onDeleteTodoListItem } = props;

  const todoListItems = () => {
    if (props.viewMode && props.viewMode === "only-view") {
      return items.map((item, index, array) => {
        
        return <TodoListItem  id={item.id} 
                              value={item.value} 
                              checkbox={item.checkbox}
                              onDeleteTodoListItem={ () => {} }
                              onChangeTextField={ () => {} }
                              onClickCompletedCheckbox={ () => {} }  
                              focus={false} 
                              className="list-items__list-item" 
                              />
      });

    } else {
      return items.map((item, index, array) => {
        const focus = (index === (array.length - 1)) ? true : false;
        
        return <TodoListItem  id={item.id} 
                              value={item.value} 
                              checkbox={item.checkbox}
                              onDeleteTodoListItem={ () => { onDeleteTodoListItem(item.id) } }
                              onChangeTextField={ (value) => onChangeTextField(item.id, value)  }
                              onClickCompletedCheckbox={ () => onClickCompletedCheckbox(item.id)  }
                              focus={focus} 
                              className="list-items__list-item"
                              />
      });
    }

  }

  return <ul className={`list-items ${props.className}`} > { todoListItems() } </ul>
}

export default ListItems;