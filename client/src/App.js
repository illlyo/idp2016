import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
// import { geomap } from 'd3-geomap';
// import { select, call } from 'd3-selection';
import Footer from './components/Footer';


// var map = geomap()
//   .geofile('/d3-geomap/topojson/world/countries.json');
//
//   select('#map')
//   .call(map.draw, map);

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
        refugeeData: jsonRes,
        refugeeDataReceived: true,
      });
    });
  }


  render() {
    return (
      <div className="App">
        <div id="map" ></div>
        <section id="intro">Refugee Data of 2016</section>
        {(this.state.refugeeDataReceived) ? <Map refugeeData={this.state.refugeeData}
                                                 width={1000}
                                                 height={500} /> :
                                            <p>Loading...</p>}
        <div id="legend"></div>
        <Footer />
      </div>
    );
  }
}

export default App;
