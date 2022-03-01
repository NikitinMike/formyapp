import './App.css';
import React from "react";
import Form from "./Form";

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
        // console.log('PAGE:', this.state)
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
                    <button onClick={this.moveBack}> - - -</button>
                    <Index index={this.state.index} row={this.state.row}/>
                    <button onClick={this.moveNext}> + + +</button>
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

export default Page;
