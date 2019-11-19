import React, {Component} from 'react';
import ListItems from './list-items';
import Form from './form';
import style from './list.module.scss';

export default class List extends Component {
  state = {
    itemId: 1,
    lists: [],
  }

  componentDidMount() {
    const lists = this.props.lists;

    if (lists) {
      const itemId = lists[lists.length - 1].id + 1;

      this.setState({lists, itemId})
    }
  }

  createTodoItem = (value = "") => {
    return {
      id: this.state.itemId++, 
      value: value, 
      checkbox: false,
    }
  }
  
  onChangeTextField = (inputId, value) => {
    this.setState((state) => {
      const [...listsCopy] = state.lists;
      const idx =  listsCopy.findIndex((item) => item.id === inputId);
      const lists = [
        ...listsCopy.slice(0, idx),
        {
          ...listsCopy[idx],
          value
        },
        ...listsCopy.slice(idx + 1)
      ];

      this.props.returningItems(lists);

      return { lists };
    });
  }

  onClickCompletedCheckbox = (id) => {
    this.setState((state) => {
      const [...listsCopy] = state.lists;
      const idx = listsCopy.findIndex((item) => item.id === id);
      const lists = [
        ...listsCopy.slice(0, idx),
        {
          ...listsCopy[idx],
          checkbox: !listsCopy[idx].checkbox
        },
        ...listsCopy.slice(idx + 1)
      ];

      this.props.returningItems(lists);
      
      return { lists };
    });
  }

  onDeleteTodoListItem = id => {
    this.setState((state) => {
      const idx = state.lists.findIndex((item) => item.id === id);
      const lists = [
        ...state.lists.slice(0, idx),
        ...state.lists.slice(idx + 1)
      ]
      
      this.props.returningItems(lists);

      return { lists };
    });
  }

  addTodoItem = (value) => {
    this.setState((state) => {
      const lists = [
        ...state.lists,
        this.createTodoItem(value)
      ];

      this.props.returningItems(lists)

      return { lists }
    })
  }

  render() {
    return (
      <div className={style.todoList}>
        <ListItems items={this.state.lists}
                   onChangeTextField={this.onChangeTextField}
                    onClickCompletedCheckbox={ this.onClickCompletedCheckbox } 
                   onDeleteTodoListItem={ this.onDeleteTodoListItem } /> 
        <Form onChangeForm={this.addTodoItem} />
      </div>
    )
  }
}
