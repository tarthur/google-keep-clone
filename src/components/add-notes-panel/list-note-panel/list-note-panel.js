import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import style from './list-note-panel.module.scss'



class Form extends React.Component {
  state = {
    value: ""
  }

  onChangeInputText = (e) => {
    console.log(this.state.value)
    this.setState({ value: "" });
    this.props.onChangeForm(e.target.value);
  }

  render() {
    return (
      <div className={style.form}>
        <input type="text" className={style.formInput} placeholder="What needs to be done?..." 
               value={ this.state.value}
               onChange={ this.onChangeInputText }/>
      </div>
    );   
  }                        
}

class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidMount() {
    if (this.props.focus) {
      this.input.current.focus();
    }
  }

  render() {
    const { value, checkbox, 
            onDeleteTodoListItem, onChangeTextField, onClickCompletedCheckbox} = this.props;
    let liClasses = style.listItem;
  
    if ( this.props.checkbox ) liClasses += ' ' + style.active;

    return (
      <li className={ liClasses }>
        <div className={ style.checkbox }
             onClick={  onClickCompletedCheckbox } >
        </div>
        <input className={style.input}
               type="text"
               value={ value }
               onChange={ (e) => onChangeTextField(e.target.value) }
               ref={ this.input } 
            />
        <i className={style.closeBtn} 
           onClick={ onDeleteTodoListItem } ></i>
      </li>
    );
  }                           
}

const ListItems = props => {
  const { items, 
    // onDeleteTodoListItem, onClickCompletedCheckbox, onChangeTextField 
  } = props;

  const todoListItems = () => {
    return items.map((item, index, array) => {
      const focus = (index === (array.length - 1)) ? true : false;
      
      return <TodoListItem  id={item.id} 
                            value={item.value} 
                            checkbox={item.checkbox}
                            // onDeleteTodoListItem={ () => { onDeleteTodoListItem(item.id) } }
                            // onClickCompletedCheckbox={ () => onClickCompletedCheckbox(item.id) }
                            // onChangeTextField={ (value) => onChangeTextField(item.id, value)  }
                            // focus={focus} 
                            />
    });
  }

  return <ul> { todoListItems() } </ul>
}






class ListNotePanel extends Component {
  itemId = 1;

  state = {
    lists: [],
    type: 'list'
  }

  addTodoItem = (id, value) => {
    this.setState((state) => {
      return { lists: [
        ...state.lists,
        this.createTodoItem(value)
      ] }
    })
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

  
  render() {
    const {value, onChange} = this.props;

    return (
      <div>
        {/* onBlur={this.onBlur} */}
        <div>Заголовок222</div>
  
        <ListItems items={this.state.lists}
                  //  onChangeTextField={ (inputId, inputValue) => {onChangeTextField(inputId, inputValue)} }
                  //  onDeleteTodoListItem={ (inputId) => {onDeleteTodoListItem(inputId)} }
                  //  onClickCompletedCheckbox={ (inputId, inputValue) => {onClickCompletedCheckbox(inputId, inputValue)} } 
                   /> 
  
        <Form onChangeForm={this.addTodoItem} />
  
  
        <input className={style.input} type="text" value={value} onChange={onChange} />
        <button onClick={this.onClickAddBtn}>Добавить</button>
        {/* <BottomPanel /> */}
      </div>
    )
  }
}





export default ListNotePanel;