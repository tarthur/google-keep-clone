import React, {Component} from 'react'
import ModalBox from './../../modal-box'
import style from './simple-note-preview.module.scss'


class SimpleNotePreview extends Component {
  state = {
    modalIsOpen: false,

    note: {
      text: this.props.note.text,
      bgColor: this.props.note.bgColor,
      time: +(new Date()),
    }
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

    return (
      <div>
        <div className={style.note} onClick={this.openModal}>
          <div>{this.props.note.title}</div>
          <div>{this.props.note.text}</div>
        </div>
        <ModalBox isOpen={this.state.modalIsOpen} >
          <div>
            <div>
              <div>{this.props.note.title}</div>
              <div><input value={this.state.note.text} onChange={this.onChange} /></div>
              <br />
              <div>update data: {`${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`}</div>
            </div>
            <button onClick={this.closeModal}>close</button>
          </div>
        </ModalBox>
      </div>
    )
  }
}


export default SimpleNotePreview;