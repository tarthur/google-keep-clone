import React, {Component} from 'react'
import style from './list-items.module.scss'

import TodoListItem from '../todo-list-item/todo-list-item'


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
                              className={style.listItem} 
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
                              className={style.listItem}
                              />
      });
    }

  }

  return <ul className={`list-items ${props.className}`} > { todoListItems() } </ul>
}

export default ListItems;