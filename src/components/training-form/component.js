import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles.css'

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    defaultValues: PropTypes.shape({})
  }

  static defaultProps = {
    fetching: false,
    defaultValues: {}
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
    this.props.onSubmit({ ...this.props.defaultValues, ...this.state })
  }

  randomNumber = (limit = 200) => {
    const randomNumber = parseFloat(Math.random() * (limit + 1))
    const diff = parseFloat(Math.random() * (limit + 1))
    return (randomNumber - diff).toFixed(1)
  }

  onRandomize = e => {
    e.preventDefault()
    this.setState({
      temp: this.randomNumber(),
      pressure: this.randomNumber(),
      humidity: this.randomNumber(),
      visibility: this.randomNumber(),
      temp_min: this.randomNumber(),
      temp_max: this.randomNumber(),
      wind_speed: this.randomNumber(),
      cloudiness: this.randomNumber()
    })
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
    const { fetching, defaultValues } = this.props
    const values = {
      ...defaultValues,
      temp,
      pressure,
      humidity,
      visibility,
      temp_max,
      temp_min,
      wind_speed,
      cloudiness
    }
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Temp ({values.temp})</label>
            <input
              type="range"
              name="temp"
              value={values.temp}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Pressure ({values.pressure})</label>
            <input
              type="range"
              name="pressure"
              value={values.pressure}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Humidity ({values.humidity})</label>
            <input
              type="range"
              name="humidity"
              value={values.humidity}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Visibility ({values.visibility})</label>
            <input
              type="range"
              name="visibility"
              value={values.visibility}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Temp Min ({values.temp_min})</label>
            <input
              type="range"
              name="temp_min"
              value={values.temp_min}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Temp Max ({values.temp_max})</label>
            <input
              type="range"
              name="temp_max"
              value={values.temp_max}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Wind Speed ({values.wind_speed})</label>
            <input
              type="range"
              name="wind_speed"
              value={values.wind_speed}
              onChange={this.onInputChange}
              min={-200}
              max={200}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Cloudiness ({values.cloudiness})</label>
            <input
              type="range"
              name="cloudiness"
              value={values.cloudiness}
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
            <button disabled={fetching} onClick={this.onRandomize}>
              Random
            </button>
          </fieldset>
        </div>
      </form>
    )
  }
}
