import './App.css';
import React from "react";
import Data from "./Data";

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

export default Form;
