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
        // console.log('FORM DATA props:', this.props.row);
        this.state = {row: this.props.row, index: this.props.index};
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log('FORM DATA state:', this.state);
    }

    inputColumn(col) {
        const row = this.state.row // s[this.state.index]
        // console.log('DATA:',col,row[col]);
        return (<Data col={col} val={row[col]} row={row}/>)
    }

    render() {
        // console.log('DATA state:', this.state.row);
        // console.log('DATA props:', this.props.row);
        const row = this.props.row // s[this.state.index]
        console.log('DATA row:', row);
        return (
            <form onSubmit={this.handleSubmit}>
                {this.inputColumn('id')}
                <div align='right'><label> {row.id} </label><br/></div>
                {this.inputColumn('firstName')}
                <div align='right'><label> {row['firstName']} </label><br/></div>
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

    constructor(props) {
        super(props);
        this.moveNext = this.moveNext.bind(this);
        this.moveBack = this.moveBack.bind(this);
        this.rows = this.props.rows
        this.state = {index: this.index, row: this.rows[this.index]};
        // console.log('PAGE:', this.state)
    }

    render() {
        // console.log(this.state.row)
        return (
            <div>
                <Index index={this.state.index} row={this.state.row}/>
                <Form row={this.state.row} index={this.state.index}/>
                <br/>
                <center>
                    <input type="button" value="back" onClick={this.moveBack}/>
                    <Index index={this.state.index}/>
                    <input type="button" value="forward" onClick={this.moveNext}/>
                </center>
            </div>
        );
    }
}

class Index extends React.Component {
    render(props) {
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
