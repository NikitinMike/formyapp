import './App.css';
import React from "react";

class Data extends React.Component {

    col = null
    dataChange = null

    async handleChange(event) {
        // console.log(event.target.name, ':', event.target.value)
        // this.state.row[this.state.col] = event.target.value
        // await this.setState({val: event.target.value,row: this.state.row})
        await this.setState({val: event.target.value})
        // console.log(this.state)
        this.dataChange(event)
    }

    constructor(props) {
        super(props);
        this.col = this.props.col
        this.state = { val: this.props.val};
        this.handleChange = this.handleChange.bind(this);
        this.dataChange = this.props.dataChange
        // console.log(this.dataChange);
        // console.log(this.props);
    }

    render(props) {
        // const col = this.state.col
        const col = this.col
        return (
            <label htmlFor={col}>{col}&nbsp;&nbsp;
                <input name={col} id={col} value={this.props.val} onChange={this.handleChange}/>
                <br/>
            </label>
        )
    }

}

export default Data;
