import './App.css';
import React from "react";
import Data from "./Data";

class Form extends React.Component {

    row = null

    constructor(props) {
        super(props);
        // console.log('FORM DATA props:', this.props.row);
        this.row=this.props.row
        this.state = {row: this.row, index: this.props.index};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dataChange = this.dataChange.bind(this);
        // console.log('FORM DATA state:', this.state);
    }

    dataChange(event) {
        // console.log(event.target.name, ':', event.target.value)
        this.row = this.props.row
        this.row[event.target.name] = event.target.value
        this.setState({row: this.row})
        // console.log('Form state:',this.state.row)
    }

    inputColumn(col) {
        // const row = this.state.row // s[this.state.index]
        // if(row)
        this.row=this.props.row
        // console.log('DATA:',this.row[col]);
        return (<Data col={col} val={this.row[col]? this.row[col]:''} dataChange={this.dataChange}/>)
    }

    render(props) {
        // console.log('DATA props:', this.props);
        // console.log('DATA state:', this.state.row);
        // this.row = this.state.rows[this.props.index]
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

export default Form;
