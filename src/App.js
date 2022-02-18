import './App.css';
import React from "react";

class Data extends React.Component {
  render(props) {
    const col = this.props.col
    // const data=this.props.data
    const row = this.props.row
    // console.log(col,':',row)
    const val = row[col]
    return (
      <label htmlFor={col}>{col}&nbsp;
        <input name={col} id={col} value={val} onChange={this.handleChange}/>
        {/*onChange={(e)=>editRow(e,col)}/>*/}
        <br/>
      </label>
    )
  }

  handleChange(event) {
    // this.setState({value: event.target.value});
    console.log(event.target.name, ':', event.target.value)
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

  render(props) {
    const row = this.props.row
    return (
      <form onSubmit={this.handleSubmit}>
        {/*<label>Имя:</label>*/}
        {/*<input name={"name"} />*/}
        <Data col={'id'} data={row['id']} row={row}/>
        <Data col={'firstName'} data={row['firstName']} row={row}/>
        <Data col={'lastName'} data={row['lastName']} row={row}/>
        <Data col={'email'} data={row['email']} row={row}/>
        <Data col={'phone'} data={row['phone']} row={row}/>
        <Data col={'city'} data={row['city']} row={row}/>
        <Data col={'country'} data={row['country']} row={row}/>
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
