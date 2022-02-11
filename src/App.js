import './App.css';
import React from "react";

function handleChange(event) {
    this.setState({value: event.target.value});
}

const Data = ({col, data}) =>
    <div className="field">
        <label htmlFor={col}>{col}</label>
        <input value={data} id={col}  onChange={handleChange}/>
               {/*onChange={(e)=>editRow(e,col)}/>*/}
    </div>

function editRow(e, col) {
    console.log(col)
    // React.Children
    const td = e.target.lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    // if(td && td.localName==='input') td.hidden=false
    console.log(td)
    // td = <input/>
    // td.focused=true
}

function change({row}) {
    console.log(row)
}

function handleSubmit() {
    console.log("SUBMIT", this.state.value)
}

const Form = ({row}) =>
    <form onSubmit={handleSubmit}>
        <Data col={'id'} data={row.id}/>
        <Data col={'firstName'} data={row.firstName}/>
        <Data col={'lastName'} data={row.lastName}/>
        <Data col={'email'} data={row.email}/>
        <Data col={'phone'} data={row.phone}/>
        <Data col={'city'} data={row.city}/>
        <Data col={'country'} data={row.country}/>
        <br/>
        <center><button>Submit</button></center>
    </form>

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null, isLoaded: false, rows: []
        };
    }

    render() {
        const row = this.state.rows[0]
        // console.log(row)
        return (this.state.isLoaded ? <div className="Contacts">
            <Form row={row}/>
        </div> : null)
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
