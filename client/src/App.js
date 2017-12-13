import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state ={
      refugeeData: null,
      refugeeDataReceived: false,
    };
  }

  componentDidMount(){
    fetch('/')
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
