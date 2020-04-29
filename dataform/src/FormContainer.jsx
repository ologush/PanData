import React, { Component } from 'react'


import CheckBox from './components/CheckBox';  
import Input from './components/Input';  
import TextArea from './components/TextArea';  
import Select from './components/Select';
import Button from './components/Button';

const url = "http://localhost:3001/senddata"



class FormContainer extends Component {
    
    constructor(props) {
        super(props);

        

        this.state = {
            
                                
            identifier: '',
            location: '',
            hospital: '',
            symptoms: '',
            date: '',
            time: '',
            gender: '',
            latitude: '',
            longitude: ''

        }
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = JSON.stringify(position.coords.latitude);
            const longitude = JSON.stringify(position.coords.longitude);

            this.setState({
                latitude: latitude,
                longitude: longitude
            });

        }, error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);  
        this.handleInput = this.handleInput.bind(this);
        this.sendData = this.sendData.bind(this);
        
    }

    

    handleFormSubmit(e) {
        var today = new Date();
        const currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const newState = "current date/time";

        e.preventDefault();
        //console.log("About to print latitude");
        console.log(this.state.latitude);

        this.setState({
            time: currentTime,
            date: currentDate
        }, this.sendData);

        // const dataToSubmit = this.state;
        
        

        // let userData = JSON.stringify(dataToSubmit);
        // console.log("form submitted");

        // const param = {
        //     headers: {
        //         "content-type":"application/json"
        //     },
        //     body:userData,
        //     method:"POST"
        // }

        // fetch(url,param)
        // .then(res=>{console.log(res)})
        // .catch(error=>{console.log(error)})
     }

     sendData() {

        const dataToSubmit = this.state;

        let userData = JSON.stringify(dataToSubmit);
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


     }

        
    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            
            identifier: '',
            location: '',
            hospital: '',
            symptoms: '',
            date: '',
            time: '',
            gender: '',
            latitude: '',
            longitude: ''      
        })
    }

    
    handleInput(e){
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
        return { 
           
            ...prevState, [name]: value
            
            }
        }, () => console.log(this.state.newUser)
        )
    }

    

    render() {

        const genderOptions = ["Male", "Female"];

        return(
            <form className="container" onSubmit={this.handleFormSubmit}>
                
                <Input type={'text'}
                        title={'patient identifier'}
                        name={'identifier'}
                        value={this.state.identifier} 
                        placeholder={'Enter an identifier'}
                        handleChange={this.handleInput}
                /> {/*patient identifier*/}

                <Input type={'text'}
                    title={'geographic location'}
                    name={'location'}
                    value={this.state.location}
                    placeholder={'enter the location'}
                    handleChange={this.handleInput}
                /> {/*geographic location*/}
                <Input type={'text'}
                    title={'Hospital'}
                    name={'hospital'}
                    value={this.state.hospital}
                    placeholder={'Enter a hospital'}
                    handleChange={this.handleInput}
                
                /> {/*Hospital*/}
                <Input type={'text'}
                    title={'Symptoms'}
                    name={'symptoms'}
                    value={this.state.symptoms}
                    placeholder={'Enter symptoms'}
                    handleChange={this.handleInput}
                /> {/*Symptoms*/}
                <Input type={'text'}
                    title={'Date'}
                    name={'date'}
                    value={this.state.date}
                    placeholder={'Enter a date'}
                    handleChange={this.handleInput}
                /> {/*date*/}
                <Input 
                    title={'Time'}
                    name={'time'}
                    value={this.state.time}
                    placeholder={'Enter a time'}
                    handleChange={this.handleInput}
                /> {/*time*/}

                <Select title={'gender'}
                        name={'gender'}
                        options={genderOptions}
                        value={this.state.gender}
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