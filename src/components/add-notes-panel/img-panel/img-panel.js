import React, {Component} from 'react'
import {storage} from '../../../config/fbConfig';
import style from './img-panel.module.scss'
import className from 'classnames'



class notePanel extends Component {
  state = {
    value: '',
    type: 'img',

    image: null,
    url: null,
    imgName: null,
    progress: 0,

    imgWidth: null, 
    imgHeight: null,
  }

  readURL(input) {
    
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      let $this = this;

      reader.onload = function (e) {
        $this.setState({
          url: e.target.result
        })
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }

  componentDidMount() {

    // const input = this.props.input
    // const image = this.props.input.files[0]
    // this.readURL(input)
    // this.setState({url: image.name})

    this.readURL(this.props.input)
    
    this.setState({url: this.props.image.name})
    
    this.handleChange(this.props.image)
  }
  
  handleChange = propsImage => {
    const $this = this;

    if (propsImage) {
      let _URL = window.URL || window.webkitURL;
      let image222 = new Image();
      

      image222.onload = function() {

        $this.setState(state => {
          const imgWidth = this.width;
          const imgHeight = this.height;
          const image = propsImage;

          
          $this.props.setData({
            image,
            type: $this.state.type,
            imgWidth: imgWidth,
            imgHeight: imgHeight,
          });

          return {imgWidth, imgHeight, image}
        })
      };

      image222.src = _URL.createObjectURL(propsImage);
      // this.handleUpload(image)
    }
  }


  onClick = () => {
    this.props.onClick(this.state);
  }
  
  onChange = e => {
    const value = e.target.value;

    this.setState(state => {
      this.props.setData({
        text: value,
        type: state.type,
        image: state.image
      });
      
      return { value }
    });
  }

  deactivateEditMode() {
    this.setState( {
      editMode: false
    } );
    // this.props.updateStatus(this.state.status);
  }

  activateEditMode = () => {
    this.setState( {
      editMode: true
    } );
  }

  render() {
    return (
      <div className={style.imgBox}>
        <div>
          <img className={className('img-fluid', style.img)} src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
        </div>
        <div className={style.notePanel}>
          <input className={style.input} 
                  type="text" value={this.value} 
                  placeholder="Заметка" 
                  onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

export default notePanel;