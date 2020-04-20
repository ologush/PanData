import React from 'react';
//import React, { Component } from 'react';
import {render} from "react-dom";
import FormContainer from "./FormContainer";

import Button from "./components/Button";
import FindClient from "./FindClient";



class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isForm: true
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleFormButton = this.handleFormButton.bind(this);

    }

    handleFormButton(e) {
        if(!this.state.isForm) {
            this.setState({
                isForm: true
            });
        }    
    }

    handleSearchButton(e) {
        if(this.state.isForm){
            this.setState({
                isForm: false
            });
        }   
    }

    
    

    render() {
        let display;

        if(this.state.isForm) {
            display = <FormContainer />;
        } else {
            display = <FindClient />;
        }
        return(
            <div className="container">
                <div id="navigator">
                    <Button title={'Form'}
                            action={this.handleFormButton}
                    />
                    <Button title={'Patient Search'}
                            action={this.handleSearchButton}
                    />
                </div>
                    <h3>React Form</h3>
                    {display}
                </div>
        );
    }
}

render (<App />, document.getElementById("root"));
export default App;