import React, { Component } from 'react';
import Modal from 'react-modal';
import style from './modal-box.module.scss'


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    zIndex                : '100'
  }
};

export default class ModalBox extends Component {
  render() {
    
    return (
      <Modal isOpen={this.props.isOpen} 
              style={customStyles}
              overlayClassName={style.ddd} >
        {this.props.children}
      </Modal>
    )
  }
}
