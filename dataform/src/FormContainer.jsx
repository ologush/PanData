import React, { Component } from 'react'


import Checkbox from './components/Checkbox';  
import Input from './components/Input';  
import TextArea from './components/TextArea';  
import Select from './components/Select';
import Button from './components/Button';
import SymptomCheckboxes from './CheckboxContainer'

// const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://test_user:wordpass@cluster0-hskxu.azure.mongodb.net/test?retryWrites=true&w=majority"
// const client = new MongoClient(url);
// const assert = require('assert');

// const httpRequest = new XMLHttpRequest();

const url = "http://localhost:3001/senddata"



class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                                
                identifier: '',
                location: '',
                hospital: '',
                symptoms: '',
                date: '',
                time: '',
                gender: ''
            },
            checkedItems: {
                test1: "",
                test2: ""
            },

            genderOptions: ['Male', 'Female']
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);  
        this.handleInput = this.handleInput.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = JSON.stringify(this.state.newUser);
        console.log("form submitted");

        const param = {
            headers: {
                "content-type":"application/json"
            },
            body:userData,
            method:"POST"
        }

        fetch(url,param)
        .then(res=>{console.log(res)})
        .catch(error=>{console.log(error)})

        // const options = {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(userData)

        // };

        // fetch('/post-feedback', options)
        

        // MongoClient.connect(url, function(err, client) {
        //     assert.equal(null, err);
        //     const db = client.db('test');
        //     db.collection('testcollection').insertOne(userData);
        //     client.close();
        //   });



        //This is for making AJAX requests to the server
        //db.collection('testcollection').insertOne(userData);
            
        
        // fetch('http://placeholder.com', {
        //     method: "POST",
        //     body: JSON.stringify(userData),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // }).then(response => {
        //     response.json().then(data =>{
        //         console.log("Successful" + data);
        //     })
        // })
        this.handleClearForm(e)     
    }

        

    

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newUser: {
                identifier: '',
                location: '',
                hospital: '',
                symptoms: '',
                date: '',
                time: '',
                gender: ''
            },
            checkedItems: {
                test1: "",
                test2: ""
            }

        })

    }

    

    handleInput(e){
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
        return { 
           newUser : {
                    ...prevState.newUser, [name]: value
                   }
            }
        }, () => console.log(this.state.newUser)
        )
    }

    render() {
        return(
            <form className="container" onSubmit={this.handleFormSubmit}>
                
                <Input type={'text'}
                        title={'patient identifier'}
                        name={'identifier'}
                        value={this.state.newUser.identifier} 
                        placeholder={'Enter an identifier'}
                        handleChange={this.handleInput}
                /> {/*patient identifier*/}

                <Input type={'text'}
                    title={'geographic location'}
                    name={'location'}
                    value={this.state.newUser.location}
                    placeholder={'enter the location'}
                    handleChange={this.handleInput}
                /> {/*geographic location*/}
                <Input type={'text'}
                    title={'Hospital'}
                    name={'hospital'}
                    value={this.state.newUser.hospital}
                    placeholder={'Enter a hospital'}
                    handleChange={this.handleInput}
                
                /> {/*Hospital*/}

                <SymptomCheckboxes />

                <Input type={'text'}
                    title={'Symptoms'}
                    name={'symptoms'}
                    value={this.state.newUser.symptoms}
                    placeholder={'Enter symptoms'}
                    handleChange={this.handleInput}
                /> {/*Symptoms*/}
                <Input type={'text'}
                    title={'Date'}
                    name={'date'}
                    value={this.state.newUser.date}
                    placeholder={'Enter a date'}
                    handleChange={this.handleInput}
                /> {/*date*/}
                <Input 
                    title={'Time'}
                    name={'time'}
                    value={this.state.newUser.time}
                    placeholder={'Enter a time'}
                    handleChange={this.handleInput}
                /> {/*time*/}

                <Select title={'gender'}
                        name={'gender'}
                        options={this.state.genderOptions}
                        value={this.state.newUser.gender}
                        placeholder={'Select Gender'}
                        handleChange={this.handleInput}

                /> {/*gender selector*/}
                <Button title={'Submit'}
                        action={this.handleFormSubmit}
                /> {/*submit*/}
                <Button title={'Clear'}
                        action={this.handleClearForm}
                /> {/*clear*/}

            </form>
        );
    }
}
const buttonStyle = {
    margin: "10px 10px 10px 10px"
  };

  export default FormContainer;