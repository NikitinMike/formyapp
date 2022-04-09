import './App.css';
import React from "react";
import Page from "./Page";
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {error: null, isLoaded: false, rows: []};
    this.loadData = this.loadData.bind(this);
  }

  render() {
    const body = this.state.isLoaded ? <Page rows={this.state.rows} refresh={this.loadData}/> : null
    return (<div className="Contacts">{body}</div>)
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    fetch('http://localhost:3000/contacts')
      .then(response => response.json())
      .then(data => this.setState({rows: data, isLoaded: true}))
      .catch(e => console.log(e))
  }
}

export default App;
