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
        <section id="intro">Refugee Data of 2016</section>
        <div id="map"></div>
        <div id="legend"></div>
        <div>
              {(this.state.apiDataLoaded) ? this.showRefugeesOnPage() : <p>Loading...</p>}
        </div>
        <footer>Created by ileana with &hearts;</footer>
      </div>
    );
  }
}

export default App;
