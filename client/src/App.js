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
    fetch('/refugees/', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then((jsonRes) => {
      this.setState({
        apiData: jsonRes,
        apiDataLoaded: true,
      });
    });
  }

  showRefugeesOnPage() {
  return this.state.apiData.map((refugee) => {
    return (
      <div className="refugee" key={refugee.id}>
        <p>{refugee.refugees} Refugees from {refugee.country_of_origin} fled to {refugee.country_of_asylum} in 2016.</p>
      </div>
    );
  });
}

  render() {
    return (
      <div className="App">
        <div>
              {(this.state.apiDataLoaded) ? this.showRefugeesOnPage() : <p>Loading...</p>}
        </div>
      </div>
    );
  }
}

export default App;
