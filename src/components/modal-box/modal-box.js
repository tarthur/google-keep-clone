import React, { Component } from 'react';
import Modal from 'react-modal';
import style from './modal-box.module.scss'


const customStyles = {
  content : {
    maxWidth              : '600px',
    width                 : '100%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    zIndex                : '100',
    padding               : '0',
    overflow              : 'visible',
    borderRadius          : '8px',
    border                : 'none'
  }
};

export default class ModalBox extends Component {
  render() {
    
    return (
      <Modal isOpen={this.props.isOpen} 
              style={customStyles}
              overlayClassName={style.overlay}
              onRequestClose={this.props.onRequestClose} >
        {this.props.children}
      </Modal>
    )
  }
}
