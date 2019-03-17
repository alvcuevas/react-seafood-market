import React, { Component } from "react";
import PropTypes from 'prop-types';

class StorePicker extends Component {

  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  static propTypes = {
    history: PropTypes.object
  }

  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Enter A Store Name</h2>
        <input
          required
          type="text"
          placeholder="Store Name"
          ref={this.myInput}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }

}

export default StorePicker;
