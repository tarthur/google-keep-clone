import React, { Component } from 'react';

// import ErrorIndicator from '../error-indicator/error-indicator';

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

export default class ModalBox extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} style={customStyles} >
        {this.props.children}
      </Modal>
    )
  }
}
