import React, {Component} from 'react'
import List from '../../common/list/list'
import ListItems from '../../common/list/list-items/list-items'
import PanelTitle from '../../common/panel-title'
import style from './list-note-preview.module.scss'
import ModalContainer from '../modal-container/modal-container'
  

class ListNotePreview extends Component {
  state = {
    modalIsOpen: false,

    note: {
      lists: this.props.note.lists,
    }
  }
  
  onChangeTitle = title => {
    this.setState(state => {
      const note = {
        ...state.note,
        title: title
      }

      return { note }
    })
  }

  returningItems = lists => {
    this.setState({
      note: {
        ...this.state.note,
        lists
      }
    })
  }

  setData = (obj) => {   
    const isEmptyFields = (this.state.note.lists.length === 0); 

    this.props.setData({
      ...obj,
      isEmptyFields
    })

    if (!isEmptyFields) {
      this.props.updateNote(this.props.note.id, {
        ...this.state.note,
        time: +(new Date()),
      });
    }
  }

  render() {
    const previewContent = (
      <div>
        {this.props.note.title && (
          <div className={style.title}>{this.props.note.title}</div>
        )}
        {this.props.note.lists && (
          <div className={style.lists}>
            <ListItems items={this.props.note.lists} viewMode="only-view" /> 
          </div>
        )}
      </div>
    )

    return (
      <ModalContainer note={this.props.note} 
                      previewContent={previewContent} 
                      modalIsOpen={this.props.modalIsOpen} 
                      modal={this.props.modal}
                      setData={this.setData}>
        
        <PanelTitle value={this.props.note.title} getTitle={this.onChangeTitle} textareaClass={style.modalTitle} />
        <List returningItems={this.returningItems} 
              lists={this.state.note.lists} />
      
      </ModalContainer>
    )
  }
}

export default ListNotePreview;