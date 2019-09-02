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
    modalIsOpen: false
  }

  closeModal = () => this.setState({modalIsOpen: false});
  openModal = () => this.setState({modalIsOpen: true});

  render() {
    return (
      <>
        <div className="note-preview" onClick={this.openModal}>
          {this.props.note.text}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>{this.props.note.text}</div>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </>
    )
  }
}

export default NotesPreview