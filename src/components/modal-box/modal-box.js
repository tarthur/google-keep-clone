import React, { Component } from 'react';
import Modal from 'react-modal';
import style from './modal-box.module.scss';


const ModalBox = ({ isOpen, onRequestClose, children }) => {
      
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

  return (
    <Modal isOpen={isOpen} 
            style={customStyles}
            overlayClassName={style.overlay}
            onRequestClose={onRequestClose} >
      {children}
    </Modal>
  )
}

export default ModalBox;
