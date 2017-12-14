import React, { Component } from 'react';

class Map extends Component {
  constructor(props){
    super(props);
    console.log(this.props.refugeeData)
    this.showRefugeesOnPage = this.showRefugeesOnPage.bind(this);
  }

  shouldComponentUpdate(){
    return false;
  }

  showRefugeesOnPage() {
  return this.state.refugeeData.map((refugee) => {
    return (
      <div className="refugee" key={refugee.id}>
        <p>{refugee.refugees} Refugees from {refugee.country_of_origin} fled to {refugee.country_of_asylum} in 2016.</p>
      </div>
    );
  });
 }

render(){
  return(
    <svg className="worldBackground" width={this.props.width} height={this.props.height}
      ref={node => this.node = node}>
    </svg>
  )
}
}

export default Map;
