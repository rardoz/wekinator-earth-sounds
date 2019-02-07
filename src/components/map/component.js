import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from 'react-google-maps'

const googleApiKey = process.env.GOOGLE_API_KEY
class GMap extends Component {
  static propTypes = { onChange: PropTypes.func.isRequired }

  state = {
    lat: 9.026488544887544,
    long: 39.686992998548476
  }

  onChange = () => {}

  onLocationSwitch = () => {}

  onMapClick = e => {
    let lat = e.latLng.lat()
    let long = e.latLng.lng()
    this.setState({ lat: lat, long: long }, () => {
      this.props.onChange({ lat, long })
    })
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
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />
}

export default map
