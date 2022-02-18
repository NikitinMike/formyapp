import './App.css';
import React from "react";

class Data extends React.Component {
    render(props) {
        const col=this.props.col
        const data=this.props.data
        return (
            <label htmlFor={col}>{col}&nbsp;
                <input name={col} id={col} value={data} onChange={this.handleChange} />
                {/*onChange={(e)=>editRow(e,col)}/>*/}
                <br/>
            </label>
        )
    }

    handleChange(event) {
        // this.setState({value: event.target.value});
        console.log(event.target.name,':',event.target.value)
        this.setState({[event.target.name]: event.target.value});
        fetch('http://localhost:3000/contacts/'+1,{method: 'PUT'})
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
    }
}

class Form extends React.Component {
    render(props) {
        console.log(this.props.row);
        const row = this.props.row
        return (
            <form onSubmit={this.handleSubmit}>
                {/*<label>Имя:</label>*/}
                {/*<input name={"name"} />*/}
                <Data col={'id'} data={row.id}/>
                <Data col={'firstName'} data={row['firstName']}/>
                <Data col={'lastName'} data={row.lastName}/>
                <Data col={'email'} data={row.email}/>
                <Data col={'phone'} data={row.phone}/>
                <Data col={'city'} data={row.city}/>
                <Data col={'country'} data={row.country}/>
                <br/>
                <input type="submit" value="Отправить"/>
                {/*<center><button>Submit</button></center>*/}
            </form>
        )
    }

    handleSubmit() {
        // function handleSubmit() {
            console.log("SUBMIT", this.state.value)
        // }
    }

}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null, isLoaded: false, rows: []
        };
    }

    render() {
        const row = this.state.rows[0]
        console.log(this.state.rows)
        if(this.state.isLoaded)
            return (<div className="Contacts"><Form row={row}/></div>)
        else return  (<div className="Contacts"> </div>)
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
