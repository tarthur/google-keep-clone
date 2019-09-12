import React, {Component} from 'react'
import NoteBottomPanel from '../../common/note-bottom-panel/note-bottom-panel';
import ModalBox from './../../modal-box'
import List from '../../common/list/list'
import ListItems from '../../add-notes-panel/list-note-panel/list-items/list-items'
import classNames from 'classnames'

  


class ListNotePreview extends Component {
  state = {
    modalIsOpen: false,

    note: {
      text: this.props.note.text,
      bgColor: this.props.note.bgColor,
      time: +(new Date()),
      lists: this.props.note.lists
    }
  }

  returningItems = lists => {
    this.setState({
      note: {
        ...this.state.note,
        time: +(new Date()),
        lists
      }
    })
  }

  onChange = e => {
    this.setState({
      note: {
        ...this.state.note,
        text: e.target.value,
        time: +(new Date())
      }
    })
  }
  
  closeModal = () => {
    this.props.updateNote(this.props.note.id, this.state.note)

    return this.setState({
      modalIsOpen: false
    });
  }

  openModal = () => this.setState({
    modalIsOpen: true,
  });


  render() {
    const date = new Date(this.props.note.time);
    console.log(this.props)

    return (
      <div className={classNames('foo', 'bar')}>
        <div onClick={this.openModal}>
          <ListItems items={this.props.note.lists} viewMode="only-view" className="note-preview__list-items list-items_no-bottom"/> 
        </div>
        <ModalBox isOpen={this.state.modalIsOpen} >
          <div>
            <List returningItems={this.returningItems} lists={this.state.note.lists} />
            <button onClick={this.closeModal}>close</button>
          </div>
        </ModalBox>
      </div>
    )
  }
}

export default ListNotePreview;