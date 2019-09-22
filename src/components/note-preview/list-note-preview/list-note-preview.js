import React, {Component} from 'react'
import ModalBox from './../../modal-box'
import List from '../../common/list/list'
import ListItems from '../../common/list/list-items/list-items'
import classNames from 'classnames'
import style from './list-note-preview.module.scss'
import Spinner from '../../common/spinner/spinner'
  


class ListNotePreview extends Component {
  state = {
    modalIsOpen: false,
    loader: true,

    note: {
      text: this.props.note.text,
      bgColor: this.props.note.bgColor,
      time: +(new Date()),
      lists: this.props.note.lists,
      height: 273 * (this.props.note.imgHeight / this.props.note.imgWidth),
    }
  }

  returningItems = lists => {
    this.setState({
      note: {
        ...this.state.note,
        time: +(new Date()),
        lists
      }
    })
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
    console.log(this.props)

    return (
      <div className={classNames('foo', 'bar')}>
        <div onClick={this.openModal}>
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
          <div className={style.title}>{this.props.note.title}</div>
          <ListItems items={this.props.note.lists} viewMode="only-view" className="note-preview__list-items list-items_no-bottom"/> 
        </div>
        <ModalBox isOpen={this.state.modalIsOpen} >
          <div>
            <div>{this.props.note.title}</div>
            <List returningItems={this.returningItems} lists={this.state.note.lists} />
            <button onClick={this.closeModal}>close</button>
          </div>
        </ModalBox>
      </div>
    )
  }
}

export default ListNotePreview;