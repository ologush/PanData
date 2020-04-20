import React, { Component } from 'react'
import Button from './components/Button';
import Input from './components/Input';

const url = "http://localhost:3001/getPatientById/"

class FindClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            identifierInput: '',
            dataToDisplay: ''
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePageClear = this.handlePageClear.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let id = this.state.identifierInput;

        const param = {
            headers: {
                "content-type":"application/json"
            },
            method:'POST'
        }

        let connectionUrl = url + id;

        fetch(connectionUrl, param)
        .then(res => {
            res.json()
            .then(data => {
                
                const dataReturned = JSON.stringify(data);
                console.log(dataReturned);
                this.setState({
                    dataToDisplay: dataReturned
                });

            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    handlePageClear(e) {
        this.setState({
            dataToDisplay: '',
            identifierInput: ''
        });
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;

        

        this.setState(prevState => {
            return {
                ...prevState, [name]: value
            }
        });
    }

    render() {
        const element = this.state.dataToDisplay;

        return(
            <form className="container" onSubmit={this.handleFormSubmit}>

                <Input type={'text'}
                        title={'Patient Identifier'}
                        name={'identifierInput'}
                        value={this.state.identifierInput}
                        placeHolder={'Enter a Patient Identifier'}
                        handleChange={this.handleInput}
                />

                <Button title={'Submit'}
                        action={this.handleFormSubmit}
                />

                <Button title={'Clear'}
                        action={this.handlePageClear}
                />
                <h1>{element}</h1>
            </form>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default FindClient;