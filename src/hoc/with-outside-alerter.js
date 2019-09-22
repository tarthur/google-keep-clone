import React, { Component } from 'react';
import PropTypes from 'prop-types';



const OutsideAlerter = (View) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.setWrapperRef = this.setWrapperRef.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);

      this.state = {
        show: true
      }
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
      this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({show: false})
      } else {
        this.setState({show: true})
      }
    }

    render() {
      const { show } = this.state;
      
      return <View {...this.props} show={show} hhhhh={this.setWrapperRef} />
    }
    
  };
};

export default OutsideAlerter;
