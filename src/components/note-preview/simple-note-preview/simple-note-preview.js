import React, {Component} from 'react'
import ModalBox from './../../modal-box'
import Spinner from '../../common/spinner/spinner'
import style from './simple-note-preview.module.scss'


class SimpleNotePreview extends Component {
  state = {
    modalIsOpen: false,
    loader: true,

    note: {
      text: this.props.note.text,
      bgColor: this.props.note.bgColor,
      time: +(new Date()),
      height: 273 * (this.props.note.imgHeight / this.props.note.imgWidth),
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

  onLoad = e => {
    // const height = e.target.width * (this.props.note.imgHeight / this.props.note.imgWidth);

    this.setState({
      loader: false,
    })
  }

  render() {
    const date = new Date(this.props.note.time);

    return (
      <div>
        <div className={style.note} onClick={this.openModal}>
      {this.props.note.imgHeight && (
        <div style={{height: this.state.note.height, overflow: 'hidden'}}>
          {this.state.loader && <Spinner classes={['small']} />}
          <img className="img-fluid" 
                src={this.props.note.url}
                onLoad={this.onLoad} 
                onError={this.onError}
                className={style.img} />
        </div>
      )}

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