import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      worlddata: [],
      origin: this.props.refugeeData,
      asylum: this.props.refugeeData,
    }
    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }
  handleCountryClick(countryIndex) {
    console.log("Clicked on country: ", this.state.worlddata[countryIndex])
    console.log(this.props.refugeeData)
  }
  handleMarkerClick(i) {
    console.log("Marker: ", this.state.origin[i])
  }
  componentDidMount() {
    fetch("/world-110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          this.setState({
            worlddata: feature(worlddata, worlddata.objects.countries).features,
          })
        })
      })

  }

  render() {
    return (
      <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
        <g className="countries">
          {
            this.state.worlddata.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${ 1 / this.state.worlddata.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
                onClick={ () => this.handleCountryClick(i) }
              />
            ))
          }
        </g>
        <g className="markers">
          {
            this.state.origin.map((origin_data, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()([origin_data.asylum_coordinates_y, origin_data.asylum_coordinates_x])[0] }
                cy={ this.projection()([origin_data.asylum_coordinates_y, origin_data.asylum_coordinates_x])[1] }
                r={ origin_data.refugees / 30000 }
                fill="rgba(200, 90, 181, .5)"
                stroke="#FFFFFF"
                className="marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
      </svg>
    )
  }
}

export default Map;
