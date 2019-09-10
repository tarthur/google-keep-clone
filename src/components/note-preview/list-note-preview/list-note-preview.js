import React, {Component} from 'react'
import style from './list-note-preview.module.scss'
import NoteBottomPanel from './../../note-bottom-panel';
import ListItems from './../../add-notes-panel/list-note-panel/list-items/list-items'
import ListNotePanel from '../../add-notes-panel/list-note-panel'

import ModalBox from './../../modal-box'


import List from '../../common/list/list'




// class ListNotePanel extends Component {
//   state = {
//     lists: [],
//     type: 'list'
//   }

//   onClickAddBtn = () => {
//     this.props.onClick(this.state)
//   }
  
//   returningItems = lists => {
//     this.setState({lists})
//   }

//   render() {
//     const {value, onChange} = this.props;

//     return (
//       <div>
//         <div>Заголовок222</div>
//         <List returningItems={this.returningItems} />
//         <button onClick={this.onClickAddBtn}>Добавить</button>
//         {/* <BottomPanel /> */}
//       </div>
//     )
//   }
// }



class ListNotePreview extends Component {
  
  state = {
    modalIsOpen: false,
    lists: this.props.note.lists
  }
  
  closeModal = () => {
    this.props.updateNote({
      lists: this.state.lists
    })

    return this.setState({
      modalIsOpen: false
    });
  }

  returningItems = lists => {
    this.setState({lists})
  }

  getColor = bgColor => {
    this.setState({
      bgColor
    })
    
    this.props.updateNote(this.props.note.id, {
      ...this.props.note,
      bgColor
    })
  }

  openModal = () => this.setState({
    modalIsOpen: true,
  });

  render() {
    console.log('>>>>>.')
    console.log(this.props)
    // const lists = <ListItems items={this.props.note.lists}
    //             //  onDeleteTodoListItem={ (inputId) => {onDeleteTodoListItem(inputId)} }
    //             //  onClickCompletedCheckbox={ (inputId, inputValue) => {onClickCompletedCheckbox(inputId, inputValue)} } 
    //              /> 

    return (
      <div className={style.notePreview} style={{backgroundColor: this.state.bgColor}}>
        <div>
          <div className={style.mark}></div>
          {/*  onClick={onClickMark} */}
          <div onClick={this.openModal}>
          <ListItems items={this.state.lists} viewMode="only-view" /> 
          </div>
          <div className={style.NoteBottomPanel}>
            <NoteBottomPanel onClickDeleteBtn={this.props.onClickDeleteBtn}
                            getColor={this.getColor} />

          </div>
        </div>

        <ModalBox isOpen={this.state.modalIsOpen} >
          <div>
            <List returningItems={this.returningItems} lists={this.state.lists} />
            <button onClick={this.closeModal}>close</button>
          </div>
        </ModalBox>
      </div>
    )
  }
}


export default ListNotePreview;