import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"


class Map extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.refugeeData.filter((d,i) => d.country_of_origin == "Syria"))
    this.state = {
      worlddata: [],
      origin: this.props.refugeeData,
      asylum: this.props.refugeeData,
      selectedOriginCountry: null,
      dropDownArray: [],
      sum: null,
      data: [5, 2, 7, 1, 1, 3, 4, 9],
      piewidth: 70,
      pieheight: 70,
    }
    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.decideWhichToRender = this.decideWhichToRender.bind(this)
    this.sumToRender = this.sumToRender.bind(this)
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

  handleInputChange(e){
  e.preventDefault();
  const name = e.target.name;
  const value = e.target.value;
  console.log(e.target.value);
  this.setState({
    [name]: value,
  })
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

  sumToRender(){

    return ((this.props.refugeeData.filter((d,i) => d.country_of_origin == this.state.selectedOriginCountry)).map((d, i) => d.refugees)).reduce((accumulator, currentValue) => accumulator + currentValue).toString()
  }

  decideWhichToRender(e){
    e.preventDefault();

    console.log(Object.keys((this.state.origin.map((d, i) => d.country_of_origin)).reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {})).map((d, i) => d));
      return
    }

  render() {
    return (
    <div>
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
                className="asylum-marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
        <g className="markers">
          {
            this.state.origin.map((origin_data, i) => (
              <circle
                key={ `marker-${i}` }
                cx={ this.projection()([origin_data.origin_coordinates_y, origin_data.origin_coordinates_x])[0] }
                cy={ this.projection()([origin_data.origin_coordinates_y, origin_data.origin_coordinates_x])[1] }
                r={ origin_data.refugees / 30000 }
                fill="rgba(5, 26, 200, .5)"
                stroke="#FFFFFF"
                className="origin-marker"
                onClick={ () => this.handleMarkerClick(i) }
              />
            ))
          }
        </g>
        <g className="selected-markers">
          {(this.props.refugeeData.filter((d,i) => d.country_of_origin == this.state.selectedOriginCountry)).map((d, i) => (
          <line
            key={ `marker-${i}` }
            x1={ this.projection()([d.origin_coordinates_y, d.origin_coordinates_x])[0]}
            y1={ this.projection()([d.origin_coordinates_y, d.origin_coordinates_x])[1]}
            x2={ this.projection()([d.asylum_coordinates_y, d.asylum_coordinates_x])[0]}
            y2={ this.projection()([d.asylum_coordinates_y, d.asylum_coordinates_x])[1]}
            stroke="rgba(200, 70, 70, .7)"
            strokeWidth="1.5"
            className="line"
          />
        ))
      }
        </g>
      </svg>
      <form id='searchForm' onSubmit={this.decideWhichToRender} >
        <select type="text" name="selectedOriginCountry" onChange={this.handleInputChange} >
          <option value={null}> Select Country of Origin </option>
          {Object.keys((this.state.origin.map((d, i) => d.country_of_origin)).reduce((acc, val) => {
            acc[val] = true;
            return acc;
          }, {})).map((d, i) => (
            <option key={ `marker-${i}` } value={ d }> {d} </option>
          ))}
        </select>
        <input type="submit" className="submit_button" value="submit" />
      </form>
      { this.state.selectedOriginCountry &&
      (<div className="info-box">
        <h1><span className="country-bold">{this.state.selectedOriginCountry}</span> had a total of <span className="refugee-total">{this.sumToRender()}</span> refugees</h1>
        <ul>
          { (this.props.refugeeData.filter((d,i) => d.country_of_origin == this.state.selectedOriginCountry)).map((d, i) =>
            <li><span className="refugee-count">{d.refugees}</span>  Refugees found asylum in {d.country_of_asylum}</li>
          )}
        </ul>
      </div>) }
    </div>

    )
  }
}

export default Map;
