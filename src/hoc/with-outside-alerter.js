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
        console.log('You clicked outside of me!');
      }
    }

    render() {
      const { show } = this.state;
      
      return <div ref={this.setWrapperRef}>
        <View {...this.props} show={show} />
      </div>;
    }
    
  };
};

export default OutsideAlerter;
