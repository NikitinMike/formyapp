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
        // console.log(this.props);
        const col = this.state.col
        return (
            <label htmlFor={col}>{col}&nbsp;&nbsp;
                <input name={col} id={col} value={this.props.val} onChange={this.handleChange}/>
                <br/>
            </label>
        )
    }

}

class Form extends React.Component {

    row = null

    constructor(props) {
        super(props);
        // console.log('FORM DATA props:', this.props.row);
        this.state = {row: this.props.row, index: this.props.index};
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log('FORM DATA state:', this.state);
    }

    inputColumn(col) {
        // const row = this.state.row // s[this.state.index]
        const data = this.row[col]? this.row[col]:''
        // console.log('DATA:',col,data);
        // if(row)
        return (<Data col={col} val={data} row={this.row}/>)
    }

    render() {
        // console.log('DATA state:', this.state.row);
        // console.log('DATA props:', this.props.row);
        this.row = this.props.row // s[this.state.index]
        // console.log('DATA row:', this.row);
        return (
            <form onSubmit={this.handleSubmit}>
                {this.inputColumn('id')}
                {/*<div align='right'><label> {this.row.id} </label><br/></div>*/}
                {this.inputColumn('firstName')}
                {/*<div align='right'><label> {(this.row)['firstName']} </label><br/></div>*/}
                {this.inputColumn('lastName')}
                {this.inputColumn('email')}
                {this.inputColumn('phone')}
                {this.inputColumn('city',)}
                {this.inputColumn('country')}
                <br/>
                <center>
                    <input type="submit" value="Отправить"/>
                </center>
            </form>
        )
    }

    handleSubmit() {
        const row = this.state.row // s[this.state.index]
        const id = row.id
        console.log("SUBMIT DATA:", row)
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

class Page extends React.Component {
    index = 0;
    row = null;
    rows = null;

    constructor(props) {
        super(props);
        this.rows = this.props.rows
        this.row = this.rows[this.index]
        this.state = {index: this.index, row: this.row};
        this.moveNext = this.moveNext.bind(this);
        this.moveBack = this.moveBack.bind(this);
        console.log('PAGE:', this.state)
    }

    render() {
        // console.log(this.state.row)
        return (
            <div>
                <div align='right'>
                    <Index index={this.state.index} row={this.state.row}/>
                </div>
                <Form row={this.state.row} index={this.state.index}/>
                <br/>
                <center>
                    <button onClick={this.moveBack}>back</button>
                    <Index index={this.state.index} row={this.state.row}/>
                    <button onClick={this.moveNext}>forward</button>
                </center>
            </div>
        );
    }

    moveNext() {
        if (this.rows[this.index + 1]) {
            this.index = this.state.index + 1
            this.row = this.rows[this.index]
            this.setState({index: this.index, row: this.row})
            // console.log(this.state)
        }
    }

    moveBack() {
        if (this.rows[this.index - 1]) {
            this.index = this.state.index - 1
            this.row = this.rows[this.index]
            this.setState({index: this.index, row: this.row})
            // console.log(this.state)
        }
    }

}

class Index extends React.Component {
    render() {
        // console.log(this.props.row)
        return (<label> - {this.props.index} - </label>)
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {error: null, isLoaded: false, rows: []};
    }

    render() {
        // console.log(this.state.rows)
        const body = this.state.isLoaded ? <Page rows={this.state.rows}/> : null
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
