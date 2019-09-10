import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';



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


const withData = (View) => {
  return class extends Component {

    state = {
      modalIsOpen: false,
    }

    closeModal = () => {
      // this.props.updateNote(this.props.note.id, {
      //   ...this.props.note,
      //   addInputText: this.state.text,
      //   time: this.state.time
      // })
  
      return this.setState({
        modalIsOpen: false
      });
    }
  
    openModal = () => this.setState({
      modalIsOpen: true,
    });



    render() {
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        modelContent(content)
      </Modal>

      return <View {...this.props} openModal={this.openModal} modelContent={this.modelContent} />;
    }
  };
};

export default withData;
