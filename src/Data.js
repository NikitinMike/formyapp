import './App.css';
import React from "react";

class Data extends React.Component {

    async handleChange(event) {
        // console.log(event.target.name, ':', event.target.value)
        // this.state.row[this.state.col] = event.target.value
        // await this.setState({val: event.target.value,row: this.state.row})
        this.props.dataChange(event)
        await this.setState({val: event.target.value})
        // console.log(this.state)
    }

    constructor(props) {
        super(props);
        this.state = {col: this.props.col, val: this.props.val};
        this.handleChange = this.handleChange.bind(this);
        // console.log(this.state);
    }

    render(props) {
        // console.log(this.props);
        const col = this.state.col
        return (
            <label htmlFor={col}>{col}&nbsp;&nbsp;
                <input name={col} id={col} value={this.state.val} onChange={this.handleChange}/>
                <br/>
            </label>
        )
    }

}

export default Data;
