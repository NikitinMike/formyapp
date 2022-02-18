import './App.css';
import React from "react";

class Data extends React.Component {

  handleChange(event) {
    // console.log(event.target.name, ':', event.target.value)
    this.setState({val: event.target.value})
    // console.log(this.state)
  }

  constructor(props) {
    super(props);
    this.state = {col: this.props.col, val: this.props.val};
    this.handleChange = this.handleChange.bind(this);
    // console.log(this.state);
  }

  render(props) {
    const col = this.state.col
    // console.log(this.state);
    return (
      <label htmlFor={col}>{col}&nbsp;
        <input name={col} id={col}
               value={this.state.val}
               onChange={this.handleChange}
        />
        {/*onChange={(e)=>editRow(e,col)}/>*/}
        <br/>
      </label>
    )
  }

}

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.row;
    console.log(this.state);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dataInput(col) {
    const row = this.props.row
    return (<Data col={col} val={row[col]}/>)
  }

  render(props) {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.dataInput('id')}
        {this.dataInput('firstName')}
        {this.dataInput('lastName')}
        {this.dataInput('email')}
        {this.dataInput('phone')}
        {this.dataInput('city')}
        {this.dataInput('country')}
        <br/>
        <center><input type="submit" value="Отправить"/></center>
      </form>
    )
  }

  handleSubmit() {
    // function handleSubmit() {
    console.log("SUBMIT", this.state)
    // }
  }

}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {error: null, isLoaded: false, rows: []};
  }

  render() {
    // console.log(this.state.rows)
    const row = this.state.rows[0]
    const loaded = this.state.isLoaded ? <Form row={row}/> : null
    return (<div className="Contacts">{loaded}</div>)
  }

  componentDidMount() {
    this.getData();
    // console.log(this.state.rows)
  }

  getData() {
    fetch('http://localhost:3000/contacts')
      .then(response => response.json())
      .then(data => this.setState({rows: data, isLoaded: true}))
      .catch(e => console.log(e))
  }

}

export default App;
