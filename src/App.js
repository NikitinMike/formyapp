import './App.css';
import React from "react";

class Data extends React.Component {

  async handleChange(event) {
    // console.log(event.target.name, ':', event.target.value)
    await this.setState({val: event.target.value})
    this.state.row[this.state.col] = event.target.value
    // console.log(this.state)
  }

  constructor(props) {
    super(props);
    this.state = {col: this.props.col, val: this.props.val, row: this.props.row};
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
    this.state = {row: this.props.row};
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log('FORM DATA:',this.state.row);
  }

  inputColumn(col) {
    return (<Data col={col} val={this.state.row[col]} row={this.state.row}/>)
  }

  render(props) {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.inputColumn('id')}
        {this.inputColumn('firstName')}
        {this.inputColumn('lastName')}
        {this.inputColumn('email')}
        {this.inputColumn('phone')}
        {this.inputColumn('city')}
        {this.inputColumn('country')}
        <br/><center><input type="submit" value="Отправить"/></center>
      </form>
    )
  }

  async handleSubmit() {
    const row = this.state.row
    const id = row.id
    console.log("SUBMIT DATA:", row)
    await fetch('http://localhost:3000/contacts/' + id, {
      body: JSON.stringify(row),
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
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
    const body = this.state.isLoaded ? <Form row={row}/> : null
    return (<div className="Contacts">{body}</div>)
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
