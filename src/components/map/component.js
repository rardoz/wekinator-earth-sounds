import React, { Component } from 'react'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps'

class GMap extends Component {
  state = {
    lat: 9.026488544887544,
    long: 39.686992998548476
  }

  onChange = () => {}

  onLocationSwitch = () => {}

  onMapClick = e => {
    let latitude = e.latLng.lat()
    let longtitude = e.latLng.lng()
    this.setState({ lat: latitude, long: longtitude })
  }

  render() {
    const { isMarkerShown } = this.props
    const { lat, long } = this.state
    return (
      <div>
        <GoogleMap
          onClick={this.onMapClick}
          defaultZoom={2}
          defaultCenter={{ lat, lng: long }}
          options={{ streetViewControl: false }}
        >
          {isMarkerShown && <Marker position={{ lat, lng: long }} />}
        </GoogleMap>
      </div>
    )
  }
}

const map = withScriptjs(withGoogleMap(GMap))

map.defaultProps = {
  isMarkerShown: true,
  googleMapURL:
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAzgHIXn9Bd94VyBEVy813L_ATzVi-pdYk&v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />
}

export default map
