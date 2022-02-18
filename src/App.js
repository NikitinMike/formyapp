import './App.css';
import React from "react";

class Data extends React.Component {

  constructor(props) {
    super(props);
    this.state = {col: this.props.col, val: this.props.val};
    // console.log(this.state);
  }

  render(props) {
    const col = this.state.col
    const val = this.state.val
    // console.log(col, ':', data)
    console.log(this.state);
    return (
      <label htmlFor={col}>{col}&nbsp;
        <input name={col} id={col}
               value={val}
               onChange={this.handleChange}
        />
        {/*onChange={(e)=>editRow(e,col)}/>*/}
        <br/>
      </label>
    )
  }

  handleChange(event) {
    // const data = this.state.data
    // this.setState({value: event.target.value});
    console.log(event.target.name, ':', event.target.value)
    // const value = event.target.value
    // console.log(this.state)
    this.setState({val: event.target.value})
    // this.setState({[event.target.name]: event.target.value});
    // fetch('http://localhost:3000/contacts/' + 1, {method: 'PUT'})
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(e => console.log(e))
  }
}

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.row;
    console.log(this.state);
  }

  dataInput(col) {
    const row = this.props.row
    return (<Data col={col} val={row[col]}/>)
  }

  render(props) {
    return (
      <form onSubmit={this.handleSubmit}>
        {/*<label>Имя:</label>*/}
        {/*<input name={"name"} />*/}
        {this.dataInput('id')}
        {this.dataInput('firstName')}
        {this.dataInput('lastName')}
        {this.dataInput('email')}
        {this.dataInput('phone')}
        {this.dataInput('city')}
        {this.dataInput('country')}
        <br/>
        <input type="submit" value="Отправить"/>
        {/*<center><button>Submit</button></center>*/}
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
