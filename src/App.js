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
    this.state = {row:this.props.row};
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
    // const data = JSON.stringify(this.state.row)
    const row = this.state.row
    console.log("DATA:", row)
    // console.log("SUBMIT", this.state)

    // const formData = new FormData();
    // formData.append('firstname', data.firstName);
    // formData.append('lastname', data.lastName);
    // formData.append('email', data.email);

    fetch('http://localhost:3000/contacts/'+32, {method: 'PUT',
      body: row})
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
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
