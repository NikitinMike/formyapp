import './App.css';
import React from "react";
import Form from "./Form";

class Page extends React.Component {
    index = 0;
    rows = null;

    constructor(props) {
        super(props);
        this.rows = this.props.rows
        this.state = {index: this.index};
        this.moveNext = this.moveNext.bind(this);
        this.moveBack = this.moveBack.bind(this);
        this.newData = this.newData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        // console.log('PAGE:', this.state)
    }

    render(props) {
        // console.log(this.state)
        return (
            <div>
                <div align='right'>
                    <Index index={this.state.index}/>
                </div>
                <Form index={this.state.index} row={this.rows[this.state.index]}/>
                <br/>
                <center>
                    {/*<button onClick={this.moveBack}></button>*/}
                    <img src="/img/left.png" alt="back" onClick={this.moveBack}/>
                    {/*<Index index={this.state.index}/>*/}
                    <img src="/img/new.png" alt="new" onClick={this.newData}/>
                    <img src="/img/del.png" alt="new" onClick={this.deleteRow}/>
                    {/*<button onClick={this.new}> NEW </button>*/}
                    {/*<button onClick={this.moveNext}></button>*/}
                    <img src="/img/right.png" alt="next" onClick={this.moveNext}/>
                </center>
            </div>
        );
    }

    moveNext() {
        if (this.rows[this.index + 1]) {
            this.index = this.state.index + 1
            this.setState({index: this.index})
            // console.log(this.state)
        }
    }

    moveBack() {
        if (this.rows[this.index - 1]) {
            this.index = this.state.index - 1
            this.setState({index: this.index})
            // console.log(this.state)
        }
    }

    deleteRow() {
        const row = this.rows[this.index]['id']
        console.log(row)
        fetch('http://localhost:3000/contacts/' + row, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
        window.location.reload();
    }

    newData() {
        console.log("NEW")
        const data = this.rows[this.index]
        fetch('http://localhost:3000/contacts/',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(res => {
                console.log(res)
            })
            .catch(e => console.log(e))
        window.location.reload();
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: this.props.index};
    }

    render(props) {
        // console.log(this.state)
        return (<label> - {this.props.index} - </label>)
    }
}

export default Page;
