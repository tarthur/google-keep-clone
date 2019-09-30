import React, {Component} from 'react'
import Spinner from '../../common/spinner/spinner'
import style from './img-box.module.scss'


class ImgBox extends Component {
  state = {
    loader: true,
    height: null,
  }

  componentDidMount() {
    this.calcHeight()
  }

  componentDidUpdate(prevProps) {
    if (this.props.note.imgHeight !== prevProps.note.imgHeight) {
      this.calcHeight()
    }
    
    if (this.props.width !== prevProps.width) {
      this.calcHeight()
    }
  }

  calcHeight = () => {
    const {imgHeight, imgWidth} = this.props.note;
    const height = this.props.width * (imgHeight / imgWidth);

    this.setState({height})
  }

  onLoad = e => {
    this.setState({
      loader: false,
    })
  }

  render() {
    return (
      <div className={style.imgBox} style={{height: this.state.height}}>
        {this.props.note.url && (
          <img className="img-fluid" 
                src={this.props.note.url}
                onLoad={this.onLoad} 
                onError={this.onError}
                className={style.img} />
        )}
        <Spinner classes={['small']} />
        {/* {this.state.loader && <Spinner classes={['small']} />} */}
      </div>
    )
  }
}

export default ImgBox