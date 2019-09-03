import React, {Component} from 'react'
import style from './list-note-preview.module.scss'
import Modal from 'react-modal';
import NoteBottomPanel from './../../note-bottom-panel';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ListNotePreview extends Component {
  
  state = {
    modalIsOpen: false,
  }
  
  closeModal = () => {
    // this.props.updateNote(this.state.text)

    return this.setState({
      modalIsOpen: false
    });
  }

  openModal = () => this.setState({
    modalIsOpen: true,
  });

  render() {
    const lists = this.props.note.lists.map(item => <div>{item.id}</div>)

    return (
      <>
        <div className={style.notePreview} style={{backgroundColor: this.props.note.bgColor}}>
          <div className={style.mark}></div>
          {/*  onClick={onClickMark} */}
          <div onClick={this.openModal}>
            {lists}
          </div>
          <div className={style.NoteBottomPanel}>
            <NoteBottomPanel onClickDeleteBtn={this.props.onClickDeleteBtn}
                            chooseСolor={this.props.chooseСolor} />
          </div>
        </div>


        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        {lists}
        
        <button onClick={this.closeModal}>close</button>
        </Modal>
      </>
    )
  }
}


export default ListNotePreview;