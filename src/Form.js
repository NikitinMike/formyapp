import './App.css';
import React from "react";
import Data from "./Data";
import Fields from './Fields';

class Form extends React.Component {

  row = null

  constructor(props) {
    super(props);
    this.row = this.props.row
    this.state = {row: this.row, index: this.props.index};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dataChange = this.dataChange.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  dataChange(event) {
    this.row = this.props.row
    this.row[event.target.name] = event.target.value
    this.setState({row: this.row})
  }

  inputColumn(col) {
    this.row = this.props.row
    return (<Data col={col} val={this.row[col] ? this.row[col] : ''} dataChange={this.dataChange}/>)
  }

  clearData() {
    Fields.forEach(field => this.row[field] = '')
    this.setState({row: this.row})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.inputColumn('id')}
        {Fields.map(field => this.inputColumn(field))}
        <br/>
        <center>
          <button onClick={this.clearData}> Очистить</button>
          <span> </span>
          <input type="submit" value="Отправить"/>
        </center>
      </form>
    )
  }

  handleSubmit() {
    const row = this.state.row // s[this.state.index]
    const id = row.id
    fetch('http://localhost:3000/contacts/' + id, {
      body: JSON.stringify(row),
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      // .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

}

export default Form;
