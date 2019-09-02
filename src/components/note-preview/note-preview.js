import React, {Component} from 'react'
import './note-preview.scss'
import Modal from 'react-modal';


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

class NotesPreview extends Component {
  state = {
    modalIsOpen: false,
    text: ''
  }

  closeModal = () => {
    this.props.updateNote(this.state.text)

    return this.setState({
      modalIsOpen: false
    });

  }

  openModal = () => this.setState({
    modalIsOpen: true,
    text: this.props.note.text
  });

  onChange = e => {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <>
        <div>
          <div className="note-preview" onClick={this.openModal}>
            {this.props.note.text}
          </div>
          <div>
            <button onClick={this.props.onClickDeleteBtn}>-</button>
          </div>
        </div>


        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <input type="text" value={this.state.text} onChange={this.onChange} />
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </>
    )
  }
}


export default NotesPreview;