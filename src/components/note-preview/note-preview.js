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



class AllNotes extends Component {
  state = {
    modalIsOpen: false
  }

  onClick = () => {
    
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }


  render() {
    return (
      <div className="note-preview" onClick={this.onClick}>
        {this.props.note.text}
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
        </Modal>
      </div>
    )
  }
}

export default AllNotes