import './App.css';
import React from "react";

class Data extends React.Component {

  col = null
  dataChange = null

  // noinspection JSValidateTypes
  handleChange(event) {
    this.setState({val: event.target.value})
    this.dataChange(event)
  }

  constructor(props) {
    super(props);
    this.col = this.props.col
    this.state = {val: this.props.val};
    this.handleChange = this.handleChange.bind(this);
    this.dataChange = this.props.dataChange
  }

  render() {
    const col = this.col
    return (
      <label htmlFor={col}>{col}&nbsp;&nbsp;
        <input name={col} id={col} value={this.props.val} onChange={this.handleChange}/>
        <br/>
      </label>
    )
  }

}

export default Data;
