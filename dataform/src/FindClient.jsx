import React, { Component } from 'react'
import Button from './components/Button';
import Input from './components/Input';

const url = "http://localhost:3001/getPatientById/"

class FindClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            identifierInput: '',
            dataToDisplay: '',
            //For now will have to make sure the data structure stored here is identical to the one stored on the database, and in FormContainer
            patient: {
                _id: '',
                identifier: '',
                location: '',
                hospital: '',
                symptoms: '',
                date: '',
                time: '',
                gender: ''

            }
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
                    patient: data
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
        //const element = this.state.dataToDisplay;
        const data = this.state.patient;

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
               
                <h1>ID: {data.identifier}</h1>
                <h1>Location: {data.location}</h1>
                <h1>Hospital: {data.hospital}</h1>
                <h1>Symptoms: {data.symptoms}</h1>
                <h1>Date: {data.date}</h1>
                <h1>Time: {data.time}</h1>
                <h1>Gender: {data.gender}</h1>

            </form>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default FindClient;