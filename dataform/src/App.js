import React from 'react';
//import React, { Component } from 'react';
import {render} from "react-dom";
import FormContainer from "./FormContainer";


class App extends React.Component {
    

    render() {

        return(
            <div className="container">
                <h3>React Form</h3>
                <FormContainer />
            </div>
        );



    }
}

render (<App />, document.getElementById("root"));
export default App;