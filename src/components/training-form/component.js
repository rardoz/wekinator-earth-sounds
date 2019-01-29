import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles.css'

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool
  }

  state = {
    temp: 0,
    pressure: 0,
    humidity: 0,
    temp_min: 0,
    temp_max: 0,
    visibility: 0,
    wind_speed: 0,
    cloudiness: 0
  }

  onInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const {
      temp,
      pressure,
      humidity,
      visibility,
      temp_min,
      temp_max,
      wind_speed,
      cloudiness
    } = this.state
    const { fetching } = this.props

    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Temp ({temp})</label>
            <input
              type="range"
              name="temp"
              value={temp}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Pressure ({pressure})</label>
            <input
              type="range"
              name="pressure"
              value={pressure}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Humidity ({humidity})</label>
            <input
              type="range"
              name="humidity"
              value={humidity}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Visibility ({visibility})</label>
            <input
              type="range"
              name="visibility"
              value={visibility}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Temp Min ({temp_min})</label>
            <input
              type="range"
              name="temp_min"
              value={temp_min}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Temp Max ({temp_max})</label>
            <input
              type="range"
              name="temp_max"
              value={temp_max}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Wind Speed ({wind_speed})</label>
            <input
              type="range"
              name="wind_speed"
              value={wind_speed}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Cloudiness ({cloudiness})</label>
            <input
              type="range"
              name="cloudiness"
              value={cloudiness}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <button disabled={fetching} type="submit">
              Apply
            </button>
          </fieldset>
          <fieldset>
            <button disabled={fetching} onClick={() => {}}>
              Random
            </button>
          </fieldset>
        </div>
      </form>
    )
  }
}
