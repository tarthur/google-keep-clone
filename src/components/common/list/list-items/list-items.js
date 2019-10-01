import React, {Component} from 'react'
import TodoListItem from '../todo-list-item'
import style from './list-items.module.scss'


const ListItems = props => {
  // const { items, 
  //   onDeleteTodoListItem, onClickCompletedCheckbox, onChangeTextField 
  // } = props;
  const { items,  onChangeTextField, onClickCompletedCheckbox, onDeleteTodoListItem } = props;

  const todoListItems = () => {
    if (props.viewMode && props.viewMode === "only-view") {
      return items.map((item, index, array) => {
        
        return <TodoListItem  key={item.id}
                              id={item.id} 
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
        
        return <TodoListItem  key={item.id}
                              id={item.id} 
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