import React, {Component} from 'react'
import ModalBox from './../../modal-box'
import Spinner from '../../common/spinner/spinner'
import style from './image-note-preview.module.scss'
import className from 'classnames'


class ImageNotePreview extends Component {
  state = {
    modalIsOpen: false,
    loader: true,

    note: {
      text: this.props.note.text,
      bgColor: this.props.note.bgColor,
      height: 273 * (this.props.note.imgHeight / this.props.note.imgWidth),
      time: +(new Date()),
    }
  }
  
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
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
    // this.props.updateNote(this.props.note.id, this.state.note)

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
  
  onError = e => {
    // this.setState({
    //   img: 'http://via.placeholder.com/400x300'
    // })
  }

  render() {
    
    const date = new Date(this.props.note.time);
    
    return (
      <div>
        <div className={style.imgBox} 
              onClick={this.openModal}
              style={{height: this.state.note.height}}>
          {this.state.loader && <Spinner classes={['small']} />}
          <img className="img-fluid" 
                src={this.props.note.url}
                alt="Uploaded images"
                onLoad={this.onLoad} 
                onError={this.onError}
                className={style.img} />
        </div>
        <ModalBox isOpen={this.state.modalIsOpen} >
          <div style={{maxWidth: '800px', width: '100%'}}>
            <div>
              <img className="img-fluid" 
                    src={this.props.note.url}
                    alt="Uploaded images" />
              <div>update data: {`${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`}</div>
            </div>
            <button onClick={this.closeModal}>close</button>
          </div>
        </ModalBox>
      </div>
    )
  }
}





export default ImageNotePreview;